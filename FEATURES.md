# TypeBharat Feature Specification & Architecture

This document catalogs the implemented features, computational methodologies, and current operational specifications of the TypeBharat platform.

---

## 🚀 Implemented Capabilities

### 1. Interactive Typing Engine
- **Live Text Evaluation**: Compares each input character against normalized Unicode strings with instantaneous feedback:
  - Green background for correct characters.
  - Red background with underline for incorrect characters.
  - Active cursor with high-contrast teal indicator.
  - Dimmed text for pending characters.
- **Auto-Scrolling Passage View**: Keeps the active typing line automatically centered so users can read 2–3 words ahead without manual scrolling.
- **Strict & Normal Modes**: Configurable strict mode prevents typing forward until a typo is backspaced and corrected.
- **Audio Feedback**: Web Audio API generates pleasant mechanical key clicks and a gentle low-frequency error tone.

### 2. Multi-Language Support
- **English**: Full QWERTY support across Beginner, Intermediate, and Advanced passages.
- **Hindi Unicode (Devanagari)**:
  - True Unicode normalization (`normalize('NFC')`).
  - Full support for Inscript keyboard layout and Remington Gail layout.
  - Native handling of IME composition events (`compositionstart`, `compositionend`) to support phonetic input tools without counting partial compositions as errors.
  - Specialized drills for vowels, matras, halants (viram), and conjuncts (संयुक्ताक्षर: क्ष, त्र, ज्ञ, श्र).

### 3. Examination Simulators
- **MP CPCT English & Hindi**: 15-minute standard mock test with official percentile score calculation (50% to 90% slabs).
- **SSC CHSL Tier II**: 10-minute simulation with 10,500 KDPH passage equivalent and full/half mistake breakdown.
- **SSC CGL DEST**: 15-minute simulation for 2,000 key depressions.
- **Railway RRB NTPC**: 10-minute skill test simulation with 5% error allowance threshold.
- **High Court & District Court Typist**: 10-minute test featuring legal judgments and administrative text.

### 4. Progress Analytics & Weak-Key Diagnostics
- **LocalStorage Data Storage**: Saves up to 100 historical test sessions on the client device.
- **Aggregated Metrics**: Personal Best WPM, Average WPM, Best Accuracy %, Total completed tests, Total practice time in minutes.
- **Weak-Key Diagnostic**: Analyzes error frequencies on individual letters, numbers, and symbols to highlight specific keyboard weaknesses.
- **Streak Tracker**: Tracks consecutive daily practice days and awards milestone achievement badges.
- **Data Deletion**: Single-click full data deletion with confirmation dialog.

### 5. On-Screen Virtual Keyboard
- Displays standard QWERTY layout with color-coded finger zones:
  - Left pinky, left ring, left middle, left index.
  - Thumbs on spacebar.
  - Right index, right middle, right ring, right pinky.
- Dual-label Hindi Inscript mode showing both English key and mapped Devanagari character.

---

## 🧮 Mathematical Scoring Methodology

TypeBharat follows documented international standards:

1. **Standard Word Definition**:
   $$\text{Standard Word} = 5 \text{ Keystrokes (including letters, spaces, and punctuation)}$$

2. **Standard WPM (Words Per Minute)**:
   $$\text{Standard WPM} = \frac{\text{Correct Characters} / 5}{\text{Elapsed Time in Minutes}}$$

3. **Gross WPM**:
   $$\text{Gross WPM} = \frac{\text{Total Characters Typed} / 5}{\text{Elapsed Time in Minutes}}$$

4. **Net WPM**:
   $$\text{Net WPM} = \max\left(0, \text{Gross WPM} - \frac{\text{Errors}}{\text{Elapsed Time in Minutes}}\right)$$

5. **Accuracy Percentage**:
   $$\text{Accuracy \%} = \left(\frac{\text{Correct Characters}}{\text{Total Characters Typed}}\right) \times 100$$

6. **Key Depressions Per Hour (KDPH)**:
   $$\text{KDPH} = \left(\frac{\text{Total Keystrokes}}{\text{Test Minutes}}\right) \times 60$$

---

## ⚠️ Known Limitations & Future Roadmap

1. **Hardware Keyboard Variations**: Physical keyboards at actual government exam centers can have stiffer spring mechanisms or shorter key travel than modern laptop keyboards. We advise candidates to practice using standard external USB desktop keyboards.
2. **Additional Regional Languages**: The architecture is designed to support Marathi, Gujarati, Bengali, Punjabi, Tamil, Telugu, Kannada, and Malayalam. These languages will be enabled as dedicated passages and IME evaluation mappings are validated.
3. **Multi-Device Synchronization**: Currently, all results are stored strictly in client-side LocalStorage. A future optional cloud sync module can be introduced with user consent without compromising the core zero-login experience.
