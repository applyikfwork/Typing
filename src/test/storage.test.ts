import { describe, it, expect, beforeEach } from 'vitest';
import { loadResults, saveResult, clearAllHistory, getUserStats } from '../utils/storage';
import { TestResult } from '../types/typing';

describe('LocalStorage Persistence & User Analytics', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with empty stats when no tests have been completed', () => {
    const stats = getUserStats();
    expect(stats.totalTestsTaken).toBe(0);
    expect(stats.personalBestWpm).toBe(0);
    expect(stats.averageWpm).toBe(0);
    expect(stats.recentResults).toEqual([]);
  });

  it('saves completed test results and updates personal best', () => {
    const mockResult: TestResult = {
      id: 'test_1',
      timestamp: Date.now(),
      dateString: '14 Nov 2026',
      language: 'english',
      mode: 'timed',
      durationSeconds: 60,
      elapsedSeconds: 60,
      grossWpm: 45,
      netWpm: 43,
      standardWpm: 43,
      accuracy: 96,
      totalCharsTyped: 225,
      correctChars: 215,
      incorrectChars: 10,
      backspacesUsed: 4,
      passageId: 'eng-1',
      passageTitle: 'Test Passage',
      keyErrors: { e: 2, t: 1 },
    };

    const stats = saveResult(mockResult);
    expect(stats.totalTestsTaken).toBe(1);
    expect(stats.personalBestWpm).toBe(43);
    expect(stats.averageWpm).toBe(43);
    expect(stats.bestAccuracy).toBe(96);
    expect(stats.recentResults.length).toBe(1);
  });

  it('re-calculates average WPM and updates personal best on subsequent tests', () => {
    const test1: TestResult = {
      id: 'test_1',
      timestamp: Date.now() - 1000,
      dateString: '14 Nov 2026',
      language: 'english',
      mode: 'timed',
      durationSeconds: 60,
      elapsedSeconds: 60,
      grossWpm: 40,
      netWpm: 40,
      standardWpm: 40,
      accuracy: 98,
      totalCharsTyped: 200,
      correctChars: 200,
      incorrectChars: 0,
      backspacesUsed: 0,
      passageId: 'eng-1',
      passageTitle: 'Passage 1',
      keyErrors: {},
    };

    const test2: TestResult = {
      id: 'test_2',
      timestamp: Date.now(),
      dateString: '14 Nov 2026',
      language: 'english',
      mode: 'timed',
      durationSeconds: 60,
      elapsedSeconds: 60,
      grossWpm: 60,
      netWpm: 60,
      standardWpm: 60,
      accuracy: 99,
      totalCharsTyped: 300,
      correctChars: 300,
      incorrectChars: 0,
      backspacesUsed: 0,
      passageId: 'eng-2',
      passageTitle: 'Passage 2',
      keyErrors: {},
    };

    saveResult(test1);
    const stats = saveResult(test2);

    expect(stats.totalTestsTaken).toBe(2);
    expect(stats.personalBestWpm).toBe(60);
    // (40 + 60) / 2 = 50 average WPM
    expect(stats.averageWpm).toBe(50);
  });

  it('clears all history completely when requested', () => {
    const test1: TestResult = {
      id: 'test_1',
      timestamp: Date.now(),
      dateString: '14 Nov 2026',
      language: 'english',
      mode: 'timed',
      durationSeconds: 60,
      elapsedSeconds: 60,
      grossWpm: 40,
      netWpm: 40,
      standardWpm: 40,
      accuracy: 98,
      totalCharsTyped: 200,
      correctChars: 200,
      incorrectChars: 0,
      backspacesUsed: 0,
      passageId: 'eng-1',
      passageTitle: 'Passage 1',
      keyErrors: {},
    };

    saveResult(test1);
    expect(loadResults().length).toBe(1);

    clearAllHistory();
    expect(loadResults().length).toBe(0);
    expect(getUserStats().totalTestsTaken).toBe(0);
  });
});
