/**
 * Pure functions for typing speed, accuracy, error evaluation,
 * and Unicode text processing.
 */

export interface CalculateMetricsParams {
  correctChars: number;
  totalCharsTyped: number;
  elapsedSeconds: number;
  incorrectChars: number;
}

export interface CalculatedMetrics {
  standardWpm: number;
  grossWpm: number;
  netWpm: number;
  accuracy: number;
}

/**
 * Standard WPM calculation:
 * (Correct Characters / 5) / (Elapsed Time in Minutes)
 */
export function calculateStandardWpm(correctChars: number, elapsedSeconds: number): number {
  if (elapsedSeconds <= 0 || correctChars <= 0) return 0;
  const minutes = elapsedSeconds / 60;
  const wpm = (correctChars / 5) / minutes;
  return Math.max(0, Math.round(wpm));
}

/**
 * Gross WPM:
 * (Total Characters Typed / 5) / (Elapsed Time in Minutes)
 */
export function calculateGrossWpm(totalCharsTyped: number, elapsedSeconds: number): number {
  if (elapsedSeconds <= 0 || totalCharsTyped <= 0) return 0;
  const minutes = elapsedSeconds / 60;
  const wpm = (totalCharsTyped / 5) / minutes;
  return Math.max(0, Math.round(wpm));
}

/**
 * Net WPM:
 * Gross WPM - (Uncorrected Errors / Elapsed Time in Minutes)
 */
export function calculateNetWpm(
  totalCharsTyped: number,
  incorrectChars: number,
  elapsedSeconds: number
): number {
  if (elapsedSeconds <= 0) return 0;
  const minutes = elapsedSeconds / 60;
  const grossWpm = (totalCharsTyped / 5) / minutes;
  const errorPenalty = incorrectChars / minutes;
  const net = grossWpm - errorPenalty;
  return Math.max(0, Math.round(net));
}

/**
 * Accuracy percentage:
 * (Correct Characters / Total Typed Characters) * 100
 */
export function calculateAccuracy(correctChars: number, totalCharsTyped: number): number {
  if (totalCharsTyped <= 0) return 100;
  if (correctChars <= 0) return 0;
  const acc = (correctChars / totalCharsTyped) * 100;
  return Math.min(100, Math.max(0, Math.round(acc * 10) / 10));
}

/**
 * Calculate all typing metrics in a single consistent call
 */
export function calculateMetrics(params: CalculateMetricsParams): CalculatedMetrics {
  const { correctChars, totalCharsTyped, elapsedSeconds, incorrectChars } = params;
  return {
    standardWpm: calculateStandardWpm(correctChars, elapsedSeconds),
    grossWpm: calculateGrossWpm(totalCharsTyped, elapsedSeconds),
    netWpm: calculateNetWpm(totalCharsTyped, incorrectChars, elapsedSeconds),
    accuracy: calculateAccuracy(correctChars, totalCharsTyped),
  };
}

/**
 * Normalizes Unicode text into Canonical Composition (NFC) form.
 * Essential for Hindi Devanagari text so that separate combining marks
 * and precomposed representations match deterministically.
 */
export function normalizeUnicode(text: string): string {
  if (!text) return '';
  return text.normalize('NFC');
}

/**
 * Character status during an active typing test
 */
export type CharStatus = 'correct' | 'incorrect' | 'current' | 'pending';

/**
 * Compares user input against the target passage string up to the typed length.
 * Handles Unicode normalization.
 */
export function evaluateInput(
  passage: string,
  input: string
): {
  charStatuses: CharStatus[];
  correctCount: number;
  incorrectCount: number;
  currentIndex: number;
  isComplete: boolean;
} {
  const normPassage = normalizeUnicode(passage);
  const normInput = normalizeUnicode(input);

  const passageChars = Array.from(normPassage);
  const inputChars = Array.from(normInput);

  let correctCount = 0;
  let incorrectCount = 0;
  const charStatuses: CharStatus[] = [];

  for (let i = 0; i < passageChars.length; i++) {
    if (i < inputChars.length) {
      if (inputChars[i] === passageChars[i]) {
        charStatuses.push('correct');
        correctCount++;
      } else {
        charStatuses.push('incorrect');
        incorrectCount++;
      }
    } else if (i === inputChars.length) {
      charStatuses.push('current');
    } else {
      charStatuses.push('pending');
    }
  }

  const isComplete = inputChars.length >= passageChars.length;

  return {
    charStatuses,
    correctCount,
    incorrectCount,
    currentIndex: inputChars.length,
    isComplete,
  };
}

/**
 * Analyzes errors by key/character to detect weak keys
 */
export function identifyWeakKeys(
  passage: string,
  input: string
): Record<string, number> {
  const normPassage = Array.from(normalizeUnicode(passage));
  const normInput = Array.from(normalizeUnicode(input));
  const errors: Record<string, number> = {};

  const minLen = Math.min(normPassage.length, normInput.length);
  for (let i = 0; i < minLen; i++) {
    const expected = normPassage[i];
    const actual = normInput[i];
    if (expected !== actual) {
      const key = expected.trim() === '' ? 'Space' : expected;
      errors[key] = (errors[key] || 0) + 1;
    }
  }

  return errors;
}

/**
 * Evaluates typing performance against government exam benchmarks
 */
export function evaluateExamQualifying(
  standardWpm: number,
  accuracy: number,
  targetSpeedWpm: number,
  maxErrorRatePercent: number
): {
  passed: boolean;
  speedQualified: boolean;
  accuracyQualified: boolean;
  actualErrorRatePercent: number;
} {
  const actualErrorRatePercent = Math.max(0, Math.round((100 - accuracy) * 10) / 10);
  const speedQualified = standardWpm >= targetSpeedWpm;
  const accuracyQualified = actualErrorRatePercent <= maxErrorRatePercent;
  const passed = speedQualified && accuracyQualified;

  return {
    passed,
    speedQualified,
    accuracyQualified,
    actualErrorRatePercent,
  };
}

/**
 * Returns speed feedback classification
 */
export function getSpeedCategory(wpm: number): {
  title: string;
  badgeColor: string;
  description: string;
} {
  if (wpm >= 70) {
    return {
      title: 'Pro Master Typist',
      badgeColor: 'text-purple-700 bg-purple-100 border-purple-200',
      description: 'Exceptional typing speed! You exceed top-tier professional and competitive benchmarks.',
    };
  }
  if (wpm >= 50) {
    return {
      title: 'Advanced Typist',
      badgeColor: 'text-brand-darkTeal bg-brand-lightTeal border-brand-teal/30',
      description: 'Fast and confident! You comfortably clear almost all official government typing standards.',
    };
  }
  if (wpm >= 35) {
    return {
      title: 'Intermediate Typist',
      badgeColor: 'text-blue-700 bg-soft-blue border-blue-200',
      description: 'Solid performance! This qualifies for many administrative and clerical positions (e.g., SSC CHSL English ~35 WPM).',
    };
  }
  if (wpm >= 25) {
    return {
      title: 'Developing Typist',
      badgeColor: 'text-amber-700 bg-soft-yellow border-amber-200',
      description: 'Good foundation! With regular 15-minute daily practice, reaching 35+ WPM is easily achievable.',
    };
  }
  return {
    title: 'Beginner Typist',
    badgeColor: 'text-gray-700 bg-soft-gray border-gray-200',
    description: 'Keep practicing! Focus on typing accuracy and proper finger placement first before speed.',
  };
}
