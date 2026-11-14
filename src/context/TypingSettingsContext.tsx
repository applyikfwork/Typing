import React, { createContext, useContext, useState, useEffect } from 'react';
import { TypingSettings } from '../types/typing';
import { loadSettings, saveSettings } from '../utils/storage';

interface TypingSettingsContextType {
  settings: TypingSettings;
  updateSettings: (newSettings: Partial<TypingSettings>) => void;
  toggleSound: () => void;
  toggleKeyboardGuide: () => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
}

const TypingSettingsContext = createContext<TypingSettingsContextType | undefined>(undefined);

export const TypingSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<TypingSettings>(() => loadSettings());

  useEffect(() => {
    // Sync with storage on mount
    setSettings(loadSettings());
  }, []);

  const updateSettings = (newSettings: Partial<TypingSettings>) => {
    const updated = saveSettings(newSettings);
    setSettings(updated);
  };

  const toggleSound = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
  };

  const toggleKeyboardGuide = () => {
    updateSettings({ keyboardGuideVisible: !settings.keyboardGuideVisible });
  };

  const setFontSize = (fontSize: 'small' | 'medium' | 'large') => {
    updateSettings({ fontSize });
  };

  return (
    <TypingSettingsContext.Provider
      value={{
        settings,
        updateSettings,
        toggleSound,
        toggleKeyboardGuide,
        setFontSize,
      }}
    >
      {children}
    </TypingSettingsContext.Provider>
  );
};

export function useTypingSettings(): TypingSettingsContextType {
  const context = useContext(TypingSettingsContext);
  if (!context) {
    throw new Error('useTypingSettings must be used within a TypingSettingsProvider');
  }
  return context;
}
