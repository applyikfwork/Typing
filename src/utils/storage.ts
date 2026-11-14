import { TestResult, UserStats, TypingSettings } from '../types/typing';

const STORAGE_KEYS = {
  HISTORY: 'typebharat_results_v1',
  SETTINGS: 'typebharat_settings_v1',
  STREAK: 'typebharat_streak_v1',
};

const DEFAULT_SETTINGS: TypingSettings = {
  soundEnabled: true,
  keyboardGuideVisible: false,
  fontSize: 'medium',
  strictMode: false,
  smoothCaret: true,
};

export function loadResults(): TestResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveResult(result: TestResult): UserStats {
  const existing = loadResults();
  const updated = [result, ...existing];
  try {
    // Keep max 100 recent tests to avoid bloating localStorage
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated.slice(0, 100)));
  } catch {
    // LocalStorage quota might be exceeded
  }

  updateStreak();
  return getUserStats();
}

export function clearAllHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    localStorage.removeItem(STORAGE_KEYS.STREAK);
  } catch {
    // Ignore
  }
}

function updateStreak(): { streak: number; lastDate: string } {
  try {
    const today = new Date().toISOString().split('T')[0];
    const raw = localStorage.getItem(STORAGE_KEYS.STREAK);
    let streak = 1;
    let lastDate = today;

    if (raw) {
      const parsed = JSON.parse(raw);
      const prevDate = parsed.lastDate;
      const prevStreak = parsed.streak || 1;

      if (prevDate === today) {
        streak = prevStreak;
      } else {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (prevDate === yesterday) {
          streak = prevStreak + 1;
        } else {
          streak = 1;
        }
      }
    }

    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify({ streak, lastDate: today }));
    return { streak, lastDate: today };
  } catch {
    return { streak: 1, lastDate: new Date().toISOString().split('T')[0] };
  }
}

export function getUserStats(): UserStats {
  const results = loadResults();
  
  if (results.length === 0) {
    return {
      totalTestsTaken: 0,
      totalTimeTypedMinutes: 0,
      personalBestWpm: 0,
      averageWpm: 0,
      bestAccuracy: 0,
      averageAccuracy: 0,
      recentResults: [],
      weakKeys: {},
      practiceDaysStreak: 0,
      lastPracticeDate: '',
    };
  }

  let totalWpm = 0;
  let totalAccuracy = 0;
  let maxWpm = 0;
  let maxAccuracy = 0;
  let totalTimeSeconds = 0;
  const weakKeysAgg: Record<string, number> = {};

  results.forEach((res) => {
    totalWpm += res.standardWpm;
    totalAccuracy += res.accuracy;
    if (res.standardWpm > maxWpm) maxWpm = res.standardWpm;
    if (res.accuracy > maxAccuracy) maxAccuracy = res.accuracy;
    totalTimeSeconds += res.elapsedSeconds;

    if (res.keyErrors) {
      Object.entries(res.keyErrors).forEach(([key, count]) => {
        weakKeysAgg[key] = (weakKeysAgg[key] || 0) + count;
      });
    }
  });

  const streakData = (() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.STREAK);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return { streak: 0, lastDate: '' };
  })();

  return {
    totalTestsTaken: results.length,
    totalTimeTypedMinutes: Math.round((totalTimeSeconds / 60) * 10) / 10,
    personalBestWpm: maxWpm,
    averageWpm: Math.round(totalWpm / results.length),
    bestAccuracy: Math.round(maxAccuracy * 10) / 10,
    averageAccuracy: Math.round((totalAccuracy / results.length) * 10) / 10,
    recentResults: results.slice(0, 15),
    weakKeys: weakKeysAgg,
    practiceDaysStreak: streakData.streak || 0,
    lastPracticeDate: streakData.lastDate || '',
  };
}

export function loadSettings(): TypingSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: Partial<TypingSettings>): TypingSettings {
  const current = loadSettings();
  const updated = { ...current, ...settings };
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
  } catch {
    // Ignore
  }
  return updated;
}
