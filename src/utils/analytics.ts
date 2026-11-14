import { TestResult } from '../types/typing';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * Push an event to Google Tag Manager dataLayer
 */
export function trackGtmEvent(eventName: string, eventData: Record<string, any> = {}) {
  try {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        timestamp: new Date().toISOString(),
        ...eventData,
      });
    }
  } catch {
    // Fail silently
  }
}

/**
 * Event when a typing test starts
 */
export function trackTestStarted(language: string, mode: string, durationSeconds: number) {
  trackGtmEvent('typing_test_started', {
    test_language: language,
    test_mode: mode,
    duration_seconds: durationSeconds,
  });
}

/**
 * Event when a typing test finishes
 */
export function trackTestCompleted(result: TestResult) {
  trackGtmEvent('typing_test_completed', {
    test_language: result.language,
    test_mode: result.mode,
    standard_wpm: result.standardWpm,
    net_wpm: result.netWpm,
    gross_wpm: result.grossWpm,
    accuracy: result.accuracy,
    elapsed_seconds: result.elapsedSeconds,
    errors_count: result.incorrectChars,
    exam_type: result.examType || 'none',
  });
}
