import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Clock, 
  Zap, 
  Target, 
  AlertCircle, 
  RotateCcw, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Eye, 
  Pause, 
  Play 
} from 'lucide-react';
import { Passage, Language, TestResult, TestMode, ExamConfig, ExamType } from '../../types/typing';
import { 
  evaluateInput, 
  calculateMetrics, 
  identifyWeakKeys, 
  normalizeUnicode 
} from '../../utils/typingEngine';
import { soundManager } from '../../utils/sound';
import { useTypingSettings } from '../../context/TypingSettingsContext';
import { useUserHistory } from '../../context/UserHistoryContext';
import { TypingControls } from './TypingControls';
import { VirtualKeyboard } from './VirtualKeyboard';
import { ResultsModal } from './ResultsModal';
import { trackTestStarted, trackTestCompleted } from '../../utils/analytics';

interface TypingEngineProps {
  passage: Passage;
  defaultDuration?: number; // seconds
  mode?: TestMode;
  examConfig?: ExamConfig;
  onNextPassage?: () => void;
  onPassageChange?: (passage: Passage) => void;
  showControls?: boolean;
}

export const TypingEngine: React.FC<TypingEngineProps> = ({
  passage,
  defaultDuration = 60,
  mode = 'timed',
  examConfig,
  onNextPassage,
  onPassageChange,
  showControls = true,
}) => {
  const { settings } = useTypingSettings();
  const { addResult } = useUserHistory();

  // Test configuration
  const [duration, setDuration] = useState<number>(defaultDuration);
  const [timeLeft, setTimeLeft] = useState<number>(defaultDuration);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Input state
  const [userInput, setUserInput] = useState<string>('');
  const [backspaceCount, setBackspaceCount] = useState<number>(0);
  const [isComposing, setIsComposing] = useState<boolean>(false);

  // Time & Metrics tracking
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [finalResult, setFinalResult] = useState<TestResult | null>(null);

  // DOM Refs
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const passageContainerRef = useRef<HTMLDivElement | null>(null);
  const activeCharRef = useRef<HTMLSpanElement | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  // Prepare normalized target passage characters
  const normalizedPassage = normalizeUnicode(passage.text);
  const passageChars = Array.from(normalizedPassage);

  // Input evaluation
  const evaluation = evaluateInput(normalizedPassage, userInput);
  const activeChar = passageChars[evaluation.currentIndex] || '';

  // Live Metrics
  const effectiveElapsed = elapsedSeconds > 0 ? elapsedSeconds : 1;
  const liveMetrics = calculateMetrics({
    correctChars: evaluation.correctCount,
    totalCharsTyped: userInput.length,
    elapsedSeconds: effectiveElapsed,
    incorrectChars: evaluation.incorrectCount,
  });

  // Finish the test and record results
  const completeTest = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    const totalElapsed = elapsedSeconds > 0 ? elapsedSeconds : 1;
    const finalMetrics = calculateMetrics({
      correctChars: evaluation.correctCount,
      totalCharsTyped: userInput.length,
      elapsedSeconds: totalElapsed,
      incorrectChars: evaluation.incorrectCount,
    });

    const weakKeys = identifyWeakKeys(normalizedPassage, userInput);

    const result: TestResult = {
      id: `test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      dateString: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      language: passage.language,
      mode,
      durationSeconds: duration,
      elapsedSeconds: totalElapsed,
      grossWpm: finalMetrics.grossWpm,
      netWpm: finalMetrics.netWpm,
      standardWpm: finalMetrics.standardWpm,
      accuracy: finalMetrics.accuracy,
      totalCharsTyped: userInput.length,
      correctChars: evaluation.correctCount,
      incorrectChars: evaluation.incorrectCount,
      backspacesUsed: backspaceCount,
      passageId: passage.id,
      passageTitle: passage.title,
      examType: examConfig ? examConfig.id : undefined,
      keyErrors: weakKeys,
    };

    setFinalResult(result);
    setIsFinished(true);
    setHasStarted(false);

    if (settings.soundEnabled) {
      soundManager.playSuccessSound();
    }

    addResult(result);
    trackTestCompleted(result);
  }, [
    elapsedSeconds,
    evaluation.correctCount,
    evaluation.incorrectCount,
    userInput,
    normalizedPassage,
    passage,
    mode,
    duration,
    backspaceCount,
    examConfig,
    settings.soundEnabled,
    addResult,
  ]);

  // Handle timer countdown
  useEffect(() => {
    if (hasStarted && !isPaused && !isFinished) {
      timerIntervalRef.current = window.setInterval(() => {
        setElapsedSeconds((prev) => {
          const next = prev + 1;
          return next;
        });

        setTimeLeft((prev) => {
          if (prev <= 1) {
            completeTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [hasStarted, isPaused, isFinished, completeTest]);

  // Check passage completion
  useEffect(() => {
    if (hasStarted && evaluation.isComplete && !isComposing) {
      completeTest();
    }
  }, [hasStarted, evaluation.isComplete, isComposing, completeTest]);

  // Auto-scroll passage to keep active char in view
  useEffect(() => {
    if (activeCharRef.current && passageContainerRef.current) {
      const container = passageContainerRef.current;
      const element = activeCharRef.current;
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      if (elementRect.bottom > containerRect.bottom - 40 || elementRect.top < containerRect.top + 40) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [evaluation.currentIndex]);

  // Reset test state
  const resetTest = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setHasStarted(false);
    setIsFinished(false);
    setIsPaused(false);
    setUserInput('');
    setBackspaceCount(0);
    setElapsedSeconds(0);
    setTimeLeft(duration);
    setFinalResult(null);

    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }, [duration]);

  // Update duration change
  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
    setTimeLeft(newDuration);
    resetTest();
  };

  // Keyboard and Input Handling
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isFinished) return;

    const val = e.target.value;

    // Start timer on first keystroke
    if (!hasStarted && val.length > 0) {
      setHasStarted(true);
      setStartTime(Date.now());
      trackTestStarted(passage.language, mode, duration);
    }

    // Strict mode check: prevent typing past an uncorrected error if strictMode is on
    if (settings.strictMode && val.length > userInput.length) {
      const lastIndex = val.length - 1;
      if (passageChars[lastIndex] !== val[lastIndex]) {
        if (settings.soundEnabled) {
          soundManager.playErrorSound();
        }
        return; // Don't advance
      }
    }

    // Play subtle key audio
    if (settings.soundEnabled && !isComposing) {
      const isCharCorrect =
        passageChars[val.length - 1] === val[val.length - 1];
      if (isCharCorrect) {
        soundManager.playKeyClick();
      } else {
        soundManager.playErrorSound();
      }
    }

    setUserInput(val);
  };

  // Handle key down for Backspace tracking, Tab+Enter restart, IME
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Backspace') {
      // In exams where backspace is disabled:
      if (examConfig && !examConfig.backspaceAllowed) {
        e.preventDefault();
        return;
      }
      setBackspaceCount((prev) => prev + 1);
    }

    // Quick restart shortcut: Tab + Enter or Escape
    if (e.key === 'Escape') {
      resetTest();
    }
  };

  // Composition events for Hindi Unicode IME (Google Input Tools / Windows Indic)
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLTextAreaElement>) => {
    setIsComposing(false);
    if (!hasStarted) {
      setHasStarted(true);
      setStartTime(Date.now());
    }
  };

  // Keep focus on hidden input when user clicks anywhere in the typing box
  const handleArenaClick = () => {
    if (inputRef.current && !isFinished) {
      inputRef.current.focus();
    }
  };

  // Format MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Font size mapping
  const getFontSizeClass = () => {
    switch (settings.fontSize) {
      case 'small':
        return 'text-base sm:text-lg leading-relaxed';
      case 'large':
        return 'text-xl sm:text-2xl leading-loose';
      default:
        return 'text-lg sm:text-xl leading-relaxed';
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Top Controls Toolbar */}
      {showControls && (
        <TypingControls
          duration={duration}
          onDurationChange={handleDurationChange}
          difficulty={passage.difficulty}
          onRestart={resetTest}
          onRandomPassage={onNextPassage}
          disabled={hasStarted && !isFinished}
        />
      )}

      {/* Live Performance HUD */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        
        {/* Timer */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-surface border border-border-subtle shadow-card flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink-muted block">
              Time Left
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-ink-heading font-mono">
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className={`p-2 rounded-xl ${timeLeft <= 10 && hasStarted ? 'bg-red-100 text-status-error animate-pulse' : 'bg-soft-blue text-blue-600'}`}>
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Live WPM */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-surface border border-border-subtle shadow-card flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink-muted block">
              Live WPM
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-brand-darkTeal font-mono">
              {liveMetrics.standardWpm}
            </span>
          </div>
          <div className="p-2 rounded-xl bg-brand-lightTeal text-brand-darkTeal">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        {/* Live Accuracy */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-surface border border-border-subtle shadow-card flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink-muted block">
              Accuracy
            </span>
            <span className={`text-2xl sm:text-3xl font-extrabold font-mono ${
              liveMetrics.accuracy >= 95 ? 'text-status-success' : 'text-ink-heading'
            }`}>
              {liveMetrics.accuracy}%
            </span>
          </div>
          <div className="p-2 rounded-xl bg-emerald-50 text-status-success">
            <Target className="w-5 h-5" />
          </div>
        </div>

        {/* Live Errors */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-surface border border-border-subtle shadow-card flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink-muted block">
              Errors
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-status-error font-mono">
              {evaluation.incorrectCount}
            </span>
          </div>
          <div className="p-2 rounded-xl bg-red-50 text-status-error">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Main Interactive Typing Arena */}
      <div
        onClick={handleArenaClick}
        className="relative bg-surface rounded-3xl border-2 border-border-subtle hover:border-brand-teal/40 focus-within:border-brand-teal focus-within:shadow-glow p-5 sm:p-8 transition-all cursor-text min-h-[220px] max-h-[360px] overflow-hidden flex flex-col justify-between shadow-card"
      >
        {/* Hidden textarea to capture desktop and mobile keystrokes */}
        <textarea
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          disabled={isFinished}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
          aria-label="Typing test input arena"
          className="absolute inset-0 opacity-0 cursor-text resize-none w-full h-full z-10"
        />

        {/* Passage Display with live character highlights */}
        <div
          ref={passageContainerRef}
          className={`overflow-y-auto select-none pr-2 font-mono tracking-wide ${getFontSizeClass()} ${
            passage.language === 'hindi' ? 'font-hindi' : ''
          }`}
          style={{ maxHeight: '240px' }}
        >
          {passageChars.map((char, index) => {
            const status = evaluation.charStatuses[index] || 'pending';
            const isCurrent = status === 'current';

            let className = '';
            if (status === 'correct') {
              className = 'text-brand-darkTeal font-semibold bg-emerald-50/60 rounded-xs';
            } else if (status === 'incorrect') {
              className = 'text-status-error bg-red-100/90 underline decoration-status-error decoration-2 rounded-xs font-semibold';
            } else if (status === 'current') {
              className = 'bg-brand-teal text-white font-bold rounded-xs px-0.5 shadow-xs';
            } else {
              className = 'text-ink-muted/80';
            }

            return (
              <span
                key={index}
                ref={isCurrent ? activeCharRef : null}
                className={`${className} transition-colors duration-75`}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Footer info inside arena */}
        <div className="pt-4 mt-2 border-t border-border-subtle flex items-center justify-between text-xs text-ink-muted">
          <div className="flex items-center gap-2">
            {!hasStarted && (
              <span className="flex items-center gap-1.5 font-semibold text-brand-darkTeal animate-pulse">
                <span className="w-2 h-2 rounded-full bg-brand-teal" />
                Click or start typing to begin the timer...
              </span>
            )}
            {hasStarted && !isFinished && (
              <span className="text-ink-body font-medium">
                Passage: <strong className="text-ink-heading">{passage.title}</strong> ({passage.wordCount} words)
              </span>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-soft-gray border border-border-subtle font-mono text-[10px]">Esc</kbd> to restart</span>
          </div>
        </div>

      </div>

      {/* Virtual Keyboard Guide (if toggled) */}
      {settings.keyboardGuideVisible && (
        <VirtualKeyboard currentKey={activeChar} language={passage.language} />
      )}

      {/* Completed Test Results Modal */}
      {isFinished && finalResult && (
        <ResultsModal
          result={finalResult}
          examConfig={examConfig}
          onRetry={resetTest}
          onNextPassage={onNextPassage}
          onClose={() => setIsFinished(false)}
        />
      )}
    </div>
  );
};
