import React from 'react';
import { Language } from '../../types/typing';

interface VirtualKeyboardProps {
  currentKey: string;
  language: Language;
}

interface KeyDef {
  key: string;
  hindiKey?: string;
  finger: 'lp' | 'lr' | 'lm' | 'li' | 'ri' | 'rm' | 'rr' | 'rp' | 'th';
  width?: string;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ currentKey, language }) => {
  const normalizedTarget = currentKey === ' ' ? 'Space' : currentKey.toLowerCase();

  // Finger color mapping (subtle soft tones)
  const getFingerClass = (finger: string, isTarget: boolean) => {
    if (isTarget) {
      return 'bg-brand-teal text-white ring-2 ring-brand-teal ring-offset-2 scale-105 font-bold shadow-md z-10';
    }

    switch (finger) {
      case 'lp':
      case 'rp':
        return 'bg-pink-50/70 text-ink-heading border-pink-100 hover:bg-pink-100/70';
      case 'lr':
      case 'rr':
        return 'bg-amber-50/70 text-ink-heading border-amber-100 hover:bg-amber-100/70';
      case 'lm':
      case 'rm':
        return 'bg-blue-50/70 text-ink-heading border-blue-100 hover:bg-blue-100/70';
      case 'li':
      case 'ri':
        return 'bg-emerald-50/70 text-ink-heading border-emerald-100 hover:bg-emerald-100/70';
      case 'th':
        return 'bg-purple-50/70 text-ink-heading border-purple-100 hover:bg-purple-100/70';
      default:
        return 'bg-surface text-ink-heading border-border-subtle';
    }
  };

  const rows: KeyDef[][] = [
    [
      { key: '`', hindiKey: 'ृ', finger: 'lp' },
      { key: '1', hindiKey: '१', finger: 'lp' },
      { key: '2', hindiKey: '२', finger: 'lr' },
      { key: '3', hindiKey: '३', finger: 'lm' },
      { key: '4', hindiKey: '४', finger: 'li' },
      { key: '5', hindiKey: '५', finger: 'li' },
      { key: '6', hindiKey: '६', finger: 'ri' },
      { key: '7', hindiKey: '७', finger: 'ri' },
      { key: '8', hindiKey: '८', finger: 'rm' },
      { key: '9', hindiKey: '९', finger: 'rr' },
      { key: '0', hindiKey: '०', finger: 'rp' },
      { key: '-', hindiKey: '-', finger: 'rp' },
      { key: '=', hindiKey: 'ृ', finger: 'rp' },
      { key: 'Backspace', width: 'w-16 sm:w-20', finger: 'rp' },
    ],
    [
      { key: 'Tab', width: 'w-14 sm:w-16', finger: 'lp' },
      { key: 'q', hindiKey: 'ौ', finger: 'lp' },
      { key: 'w', hindiKey: 'ै', finger: 'lr' },
      { key: 'e', hindiKey: 'ा', finger: 'lm' },
      { key: 'r', hindiKey: 'ी', finger: 'li' },
      { key: 't', hindiKey: 'ू', finger: 'li' },
      { key: 'y', hindiKey: 'ब', finger: 'ri' },
      { key: 'u', hindiKey: 'ह', finger: 'ri' },
      { key: 'i', hindiKey: 'ग', finger: 'rm' },
      { key: 'o', hindiKey: 'द', finger: 'rr' },
      { key: 'p', hindiKey: 'ज', finger: 'rp' },
      { key: '[', hindiKey: 'ड', finger: 'rp' },
      { key: ']', hindiKey: '़', finger: 'rp' },
    ],
    [
      { key: 'Caps', width: 'w-16 sm:w-18', finger: 'lp' },
      { key: 'a', hindiKey: 'ो', finger: 'lp' },
      { key: 's', hindiKey: 'े', finger: 'lr' },
      { key: 'd', hindiKey: '्', finger: 'lm' },
      { key: 'f', hindiKey: 'ि', finger: 'li' },
      { key: 'g', hindiKey: 'ु', finger: 'li' },
      { key: 'h', hindiKey: 'प', finger: 'ri' },
      { key: 'j', hindiKey: 'र', finger: 'ri' },
      { key: 'k', hindiKey: 'क', finger: 'rm' },
      { key: 'l', hindiKey: 'त', finger: 'rr' },
      { key: ';', hindiKey: 'च', finger: 'rp' },
      { key: "'", hindiKey: 'ट', finger: 'rp' },
      { key: 'Enter', width: 'w-16 sm:w-20', finger: 'rp' },
    ],
    [
      { key: 'Shift', width: 'w-20 sm:w-24', finger: 'lp' },
      { key: 'z', hindiKey: 'ॆ', finger: 'lp' },
      { key: 'x', hindiKey: 'ं', finger: 'lr' },
      { key: 'c', hindiKey: 'म', finger: 'lm' },
      { key: 'v', hindiKey: 'न', finger: 'li' },
      { key: 'b', hindiKey: 'व', finger: 'li' },
      { key: 'n', hindiKey: 'ल', finger: 'ri' },
      { key: 'm', hindiKey: 'स', finger: 'ri' },
      { key: ',', hindiKey: ',', finger: 'rm' },
      { key: '.', hindiKey: '।', finger: 'rr' },
      { key: '/', hindiKey: 'य', finger: 'rp' },
      { key: 'Shift', width: 'w-20 sm:w-24', finger: 'rp' },
    ],
    [
      { key: 'Space', width: 'w-64 sm:w-80', finger: 'th' },
    ],
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-surface rounded-2xl border border-border-subtle shadow-card select-none">
      <div className="flex items-center justify-between mb-3 text-xs text-ink-muted">
        <span className="font-semibold uppercase tracking-wider text-ink-heading">
          {language === 'hindi' ? 'Hindi Inscript Keyboard Guide' : 'Touch-Typing Keyboard Guide'}
        </span>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-teal inline-block" /> Active Key
          </span>
          <span className="hidden sm:inline">&bull; Home keys: F and J bumps</span>
        </div>
      </div>

      <div className="space-y-1.5 overflow-x-auto pb-1 text-center">
        {rows.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1 min-w-[620px]">
            {row.map((k, kIdx) => {
              const isTarget =
                (k.key === 'Space' && normalizedTarget === 'space') ||
                k.key.toLowerCase() === normalizedTarget ||
                (language === 'hindi' && k.hindiKey === currentKey);

              return (
                <div
                  key={kIdx}
                  className={`h-9 sm:h-11 rounded-lg border text-xs sm:text-sm font-medium flex flex-col items-center justify-center transition-all ${
                    k.width || 'w-8 sm:w-11'
                  } ${getFingerClass(k.finger, isTarget)}`}
                >
                  <span className="leading-none">{k.key}</span>
                  {language === 'hindi' && k.hindiKey && (
                    <span className="text-[10px] text-brand-darkTeal font-bold leading-none mt-0.5 font-hindi">
                      {k.hindiKey}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
