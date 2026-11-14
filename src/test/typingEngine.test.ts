import { describe, it, expect } from 'vitest';
import {
  calculateStandardWpm,
  calculateGrossWpm,
  calculateNetWpm,
  calculateAccuracy,
  calculateMetrics,
  normalizeUnicode,
  evaluateInput,
  identifyWeakKeys,
  evaluateExamQualifying,
  getSpeedCategory,
} from '../utils/typingEngine';

describe('Typing Engine Scoring & Metrics', () => {
  describe('Standard WPM Calculation', () => {
    it('calculates standard WPM correctly for a 1-minute test', () => {
      // 250 correct characters / 5 = 50 words / 1 min = 50 WPM
      expect(calculateStandardWpm(250, 60)).toBe(50);
    });

    it('calculates standard WPM correctly for a 3-minute test', () => {
      // 750 correct characters / 5 = 150 words / 3 min = 50 WPM
      expect(calculateStandardWpm(750, 180)).toBe(50);
    });

    it('returns 0 when elapsed time is 0 or negative', () => {
      expect(calculateStandardWpm(200, 0)).toBe(0);
      expect(calculateStandardWpm(200, -5)).toBe(0);
    });

    it('returns 0 when correct characters count is 0', () => {
      expect(calculateStandardWpm(0, 60)).toBe(0);
    });

    it('handles very short elapsed time gracefully', () => {
      // 10 chars in 3 seconds: (10/5) / (3/60) = 2 / 0.05 = 40 WPM
      expect(calculateStandardWpm(10, 3)).toBe(40);
    });
  });

  describe('Gross WPM Calculation', () => {
    it('calculates gross WPM based on total keystrokes typed', () => {
      // 300 total characters in 60s = 60 gross WPM
      expect(calculateGrossWpm(300, 60)).toBe(60);
    });

    it('returns 0 for empty keystrokes', () => {
      expect(calculateGrossWpm(0, 60)).toBe(0);
    });
  });

  describe('Net WPM Calculation', () => {
    it('applies error penalty correctly', () => {
      // 300 total chars in 60s = 60 gross WPM. 5 errors penalty = 55 Net WPM
      expect(calculateNetWpm(300, 5, 60)).toBe(55);
    });

    it('floors Net WPM at 0 when errors exceed gross words', () => {
      // 100 total chars in 60s = 20 gross WPM. 30 errors penalty => 0
      expect(calculateNetWpm(100, 30, 60)).toBe(0);
    });
  });

  describe('Accuracy Calculation', () => {
    it('returns 100% when total typed is 0', () => {
      expect(calculateAccuracy(0, 0)).toBe(100);
    });

    it('returns 100% when all keystrokes are correct', () => {
      expect(calculateAccuracy(150, 150)).toBe(100);
    });

    it('calculates percentage rounded to 1 decimal place', () => {
      // 95 correct out of 100 typed = 95.0%
      expect(calculateAccuracy(95, 100)).toBe(95);
      // 98 correct out of 100 = 98%
      expect(calculateAccuracy(98, 100)).toBe(98);
    });

    it('returns 0% when no correct characters are typed', () => {
      expect(calculateAccuracy(0, 50)).toBe(0);
    });
  });

  describe('calculateMetrics combined helper', () => {
    it('returns complete metrics object consistently', () => {
      const res = calculateMetrics({
        correctChars: 250,
        totalCharsTyped: 260,
        elapsedSeconds: 60,
        incorrectChars: 10,
      });

      expect(res.standardWpm).toBe(50);
      expect(res.grossWpm).toBe(52);
      expect(res.netWpm).toBe(42);
      expect(res.accuracy).toBe(96.2);
    });
  });
});

describe('Unicode & Hindi Evaluation', () => {
  it('normalizes Unicode strings using NFC form', () => {
    const raw = 'किताब';
    expect(normalizeUnicode(raw)).toBe(raw.normalize('NFC'));
  });

  it('evaluates English input correctly with correct and incorrect statuses', () => {
    const passage = 'Hello world';
    const input = 'Hello wox';
    const result = evaluateInput(passage, input);

    expect(result.correctCount).toBe(8); // 'Hello wo'
    expect(result.incorrectCount).toBe(1); // 'x' instead of 'r'
    expect(result.currentIndex).toBe(9);
    expect(result.isComplete).toBe(false);
    expect(result.charStatuses[0]).toBe('correct');
    expect(result.charStatuses[8]).toBe('incorrect');
    expect(result.charStatuses[9]).toBe('current');
    expect(result.charStatuses[10]).toBe('pending');
  });

  it('evaluates Hindi Devanagari input accurately', () => {
    const passage = 'भारत देश महान है।';
    const input = 'भारत देश ';
    const result = evaluateInput(passage, input);

    expect(result.correctCount).toBe(9); // 'भारत देश '
    expect(result.incorrectCount).toBe(0);
    expect(result.currentIndex).toBe(9);
    expect(result.isComplete).toBe(false);
  });

  it('detects passage completion when input matches target passage length', () => {
    const passage = 'Touch typing';
    const input = 'Touch typing';
    const result = evaluateInput(passage, input);

    expect(result.isComplete).toBe(true);
    expect(result.correctCount).toBe(12);
    expect(result.incorrectCount).toBe(0);
  });

  it('identifies weak keys accurately', () => {
    const passage = 'quick brown';
    const input = 'quxck btown'; // 'i' -> 'x', 'r' -> 't'
    const weakKeys = identifyWeakKeys(passage, input);

    expect(weakKeys['i']).toBe(1);
    expect(weakKeys['r']).toBe(1);
  });
});

describe('Exam Qualification Benchmarks', () => {
  it('evaluates SSC CHSL passing threshold (35 WPM, max 7% error)', () => {
    // 38 WPM with 98% accuracy (2% error) -> should pass
    const passResult = evaluateExamQualifying(38, 98, 35, 7);
    expect(passResult.passed).toBe(true);
    expect(passResult.speedQualified).toBe(true);
    expect(passResult.accuracyQualified).toBe(true);

    // 40 WPM with 90% accuracy (10% error) -> should fail on accuracy
    const failAccResult = evaluateExamQualifying(40, 90, 35, 7);
    expect(failAccResult.passed).toBe(false);
    expect(failAccResult.speedQualified).toBe(true);
    expect(failAccResult.accuracyQualified).toBe(false);

    // 30 WPM with 99% accuracy -> should fail on speed
    const failSpeedResult = evaluateExamQualifying(30, 99, 35, 7);
    expect(failSpeedResult.passed).toBe(false);
    expect(failSpeedResult.speedQualified).toBe(false);
  });

  it('evaluates CPCT Hindi passing threshold (20 WPM, max 10% error)', () => {
    const result = evaluateExamQualifying(24, 94, 20, 10);
    expect(result.passed).toBe(true);
  });
});

describe('Speed Classification Categories', () => {
  it('classifies speeds into appropriate ranks', () => {
    expect(getSpeedCategory(75).title).toBe('Pro Master Typist');
    expect(getSpeedCategory(55).title).toBe('Advanced Typist');
    expect(getSpeedCategory(38).title).toBe('Intermediate Typist');
    expect(getSpeedCategory(28).title).toBe('Developing Typist');
    expect(getSpeedCategory(18).title).toBe('Beginner Typist');
  });
});
