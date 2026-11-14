import React from 'react';
import { 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Keyboard as KeyboardIcon, 
  SlidersHorizontal, 
  Shuffle, 
  Type 
} from 'lucide-react';
import { Difficulty } from '../../types/typing';
import { useTypingSettings } from '../../context/TypingSettingsContext';

interface TypingControlsProps {
  duration: number; // in seconds
  onDurationChange: (duration: number) => void;
  difficulty?: Difficulty;
  onDifficultyChange?: (diff: Difficulty) => void;
  onRestart: () => void;
  onRandomPassage?: () => void;
  showDurationPicker?: boolean;
  showDifficultyPicker?: boolean;
  disabled?: boolean;
}

export const TypingControls: React.FC<TypingControlsProps> = ({
  duration,
  onDurationChange,
  difficulty = 'intermediate',
  onDifficultyChange,
  onRestart,
  onRandomPassage,
  showDurationPicker = true,
  showDifficultyPicker = true,
  disabled = false,
}) => {
  const { settings, toggleSound, toggleKeyboardGuide, setFontSize } = useTypingSettings();

  const durations = [
    { label: '1m', value: 60 },
    { label: '3m', value: 180 },
    { label: '5m', value: 300 },
    { label: '10m', value: 600 },
    { label: '15m', value: 900 },
  ];

  const difficulties: { label: string; value: Difficulty }[] = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-surface rounded-2xl border border-border-subtle shadow-card text-xs sm:text-sm">
      
      {/* Left Group: Duration & Difficulty */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {showDurationPicker && (
          <div className="flex items-center gap-1 bg-soft-gray p-1 rounded-xl">
            {durations.map((d) => (
              <button
                key={d.value}
                onClick={() => onDurationChange(d.value)}
                disabled={disabled}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  duration === d.value
                    ? 'bg-white text-brand-darkTeal shadow-xs'
                    : 'text-ink-body hover:text-ink-heading'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        )}

        {showDifficultyPicker && onDifficultyChange && (
          <div className="hidden sm:flex items-center gap-1 bg-soft-gray p-1 rounded-xl">
            {difficulties.map((diff) => (
              <button
                key={diff.value}
                onClick={() => onDifficultyChange(diff.value)}
                disabled={disabled}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  difficulty === diff.value
                    ? 'bg-white text-brand-darkTeal font-semibold shadow-xs'
                    : 'text-ink-body hover:text-ink-heading'
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Group: Utilities & Restart */}
      <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
        {onRandomPassage && (
          <button
            onClick={onRandomPassage}
            disabled={disabled}
            title="Load another passage"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-ink-body hover:text-ink-heading hover:bg-soft-gray border border-border-subtle transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5 text-ink-muted" />
            <span className="hidden md:inline font-medium">New Text</span>
          </button>
        )}

        {/* Font Size Toggle */}
        <div className="hidden sm:flex items-center gap-0.5 bg-soft-gray p-0.5 rounded-lg">
          <button
            onClick={() => setFontSize('small')}
            title="Small font size"
            className={`px-1.5 py-1 rounded text-xs font-semibold ${
              settings.fontSize === 'small' ? 'bg-white text-brand-teal shadow-xs' : 'text-ink-muted'
            }`}
          >
            A
          </button>
          <button
            onClick={() => setFontSize('medium')}
            title="Medium font size"
            className={`px-1.5 py-1 rounded text-sm font-semibold ${
              settings.fontSize === 'medium' ? 'bg-white text-brand-teal shadow-xs' : 'text-ink-muted'
            }`}
          >
            A
          </button>
          <button
            onClick={() => setFontSize('large')}
            title="Large font size"
            className={`px-1.5 py-1 rounded text-base font-semibold ${
              settings.fontSize === 'large' ? 'bg-white text-brand-teal shadow-xs' : 'text-ink-muted'
            }`}
          >
            A
          </button>
        </div>

        {/* Virtual Keyboard Toggle */}
        <button
          onClick={toggleKeyboardGuide}
          title={settings.keyboardGuideVisible ? 'Hide keyboard guide' : 'Show keyboard guide'}
          className={`p-1.5 rounded-lg border transition-colors ${
            settings.keyboardGuideVisible
              ? 'bg-brand-lightTeal border-brand-teal/40 text-brand-darkTeal'
              : 'border-border-subtle text-ink-body hover:bg-soft-gray'
          }`}
        >
          <KeyboardIcon className="w-4 h-4" />
        </button>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          title={settings.soundEnabled ? 'Mute keyboard audio' : 'Enable keyboard audio'}
          className={`p-1.5 rounded-lg border transition-colors ${
            settings.soundEnabled
              ? 'bg-brand-lightTeal border-brand-teal/40 text-brand-darkTeal'
              : 'border-border-subtle text-ink-body hover:bg-soft-gray'
          }`}
        >
          {settings.soundEnabled ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4 text-ink-muted" />
          )}
        </button>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          title="Restart test (Tab + Enter)"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ink-heading text-white hover:bg-brand-darkTeal transition-all shadow-xs active:scale-95 font-semibold text-xs sm:text-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart</span>
        </button>
      </div>

    </div>
  );
};
