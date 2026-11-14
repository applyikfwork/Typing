import React, { createContext, useContext, useState, useEffect } from 'react';
import { TestResult, UserStats } from '../types/typing';
import { getUserStats, saveResult, clearAllHistory } from '../utils/storage';

interface UserHistoryContextType {
  stats: UserStats;
  addResult: (result: TestResult) => void;
  resetAllHistory: () => void;
  refreshStats: () => void;
}

const UserHistoryContext = createContext<UserHistoryContextType | undefined>(undefined);

export const UserHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<UserStats>(() => getUserStats());

  useEffect(() => {
    setStats(getUserStats());
  }, []);

  const addResult = (result: TestResult) => {
    const updatedStats = saveResult(result);
    setStats(updatedStats);
  };

  const resetAllHistory = () => {
    clearAllHistory();
    setStats(getUserStats());
  };

  const refreshStats = () => {
    setStats(getUserStats());
  };

  return (
    <UserHistoryContext.Provider
      value={{
        stats,
        addResult,
        resetAllHistory,
        refreshStats,
      }}
    >
      {children}
    </UserHistoryContext.Provider>
  );
};

export function useUserHistory(): UserHistoryContextType {
  const context = useContext(UserHistoryContext);
  if (!context) {
    throw new Error('useUserHistory must be used within a UserHistoryProvider');
  }
  return context;
}
