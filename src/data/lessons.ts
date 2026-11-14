export interface LessonItem {
  id: string;
  slug: string;
  title: string;
  category: 'Foundation' | 'Technique' | 'Ergonomics' | 'Exam Strategy';
  readTime: string;
  summary: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string[];
      tips?: string[];
    }[];
    actionSteps: string[];
  };
}

export const TYPING_LESSONS: LessonItem[] = [
  {
    id: 'lesson-1',
    slug: 'correct-finger-placement',
    title: 'The Home Row Foundation: Correct Finger Placement',
    category: 'Foundation',
    readTime: '4 min read',
    summary: 'Master the universal touch-typing resting position on the keyboard to type without looking down.',
    content: {
      intro: 'Touch typing relies on tactile memory rather than visual hunting. Every keyboard in the world features small raised physical bumps on the "F" and "J" keys. These markers allow your index fingers to find home position instantly without ever looking down.',
      sections: [
        {
          heading: 'Resting on the Home Row (ASDF - JKL;)',
          body: [
            'Left Hand: Place your pinky finger on A, ring finger on S, middle finger on D, and index finger on F.',
            'Right Hand: Place your index finger on J, middle finger on K, ring finger on L, and pinky finger on the semicolon (;).',
            'Both Thumbs: Rest lightly over the Spacebar. Use the thumb of your dominant hand to tap Space smoothly.',
          ],
          tips: [
            'Keep your wrists hovering slightly above the desk, not resting flat on the table edge.',
            'Curve your fingers like holding a small tennis ball; never type with flat fingers.',
          ],
        },
        {
          heading: 'The "Home Anchor" Rule',
          body: [
            'Whenever an index, middle, ring, or pinky finger leaves its home key to press an upper or lower row character, it must immediately return to its home key.',
            'This constant return ensures your fingers always maintain a spatial map of all 104 keys.',
          ],
        },
      ],
      actionSteps: [
        'Place your index fingers on the F and J bumps without looking at the keyboard.',
        'Complete the 2-minute "Home Row Foundation" practice drill on TypeBharat.',
        'Commit to never looking down at the keyboard during practice.',
      ],
    },
  },

  {
    id: 'lesson-2',
    slug: 'proper-typing-posture',
    title: 'Ergonomics & Posture: Typing for Hours Without Fatigue',
    category: 'Ergonomics',
    readTime: '3 min read',
    summary: 'Prevent carpal tunnel, wrist strain, and neck fatigue with ergonomically proven workstation setup.',
    content: {
      intro: 'Physical fatigue and musculoskeletal strain directly slow down your keystrokes and introduce typos. Practicing typing with poor posture trains muscle fatigue instead of speed.',
      sections: [
        {
          heading: 'The 90-Degree Ergonomic Rule',
          body: [
            'Elbow Angle: Keep your elbows bent between 90 and 100 degrees, positioned close to your torso.',
            'Wrists: Maintain a neutral, straight wrist line. Do not bend your wrists upward or rest them hard against the desk while actively keystroking.',
            'Back: Sit back against your chair with lumbar support. Avoid slouching forward toward the screen.',
            'Feet: Keep both feet planted flat on the floor to stabilize your lower back and hip alignment.',
          ],
          tips: [
            'The top third of your computer monitor should align directly with your eye level to prevent neck stiffness.',
          ],
        },
      ],
      actionSteps: [
        'Adjust your chair height until your forearms are parallel to the keyboard surface.',
        'Position your display 18 to 24 inches away from your eyes.',
        'Take a 30-second eye and shoulder roll break every 20 minutes of typing.',
      ],
    },
  },

  {
    id: 'lesson-3',
    slug: 'increase-typing-speed',
    title: 'How to Increase Typing Speed: The 5-Phase Acceleration Blueprint',
    category: 'Technique',
    readTime: '5 min read',
    summary: 'Discover how elite typists systematically climb from 30 WPM to 60+ WPM without sacrificing accuracy.',
    content: {
      intro: 'Typing fast is not about moving your hands rapidly; it is about eliminating hesitation between keystrokes. Fluency is rhythm, not frantic rushing.',
      sections: [
        {
          heading: 'Phase 1: Look-Ahead Reading (Buffer Processing)',
          body: [
            'Amateur typists read one character at a time. Intermediate typists read one word at a time. Elite typists read 2 to 3 words ahead of their fingers.',
            'While your fingers are typing "The quick brown", your eyes should already be parsing "fox jumps over". This look-ahead buffer prevents micro-pauses at word boundaries.',
          ],
          tips: [
            'Never look at the cursor blinking. Keep your eyes anchored 2 to 3 words ahead in the text passage.',
          ],
        },
        {
          heading: 'Phase 2: Rhythmic Keystroking (Metronome Principle)',
          body: [
            'Inconsistent bursts followed by long pauses result in lower net WPM and higher mental fatigue. Aim for a smooth, steady metronomic cadence where each character takes an identical fraction of a second.',
          ],
        },
      ],
      actionSteps: [
        'Begin each session with a 1-minute slow accuracy test at 98%+ accuracy.',
        'Gradually increase your rhythm while keeping mistakes under 3 per passage.',
        'Use TypeBharat timed 3-minute tests to build mental stamina.',
      ],
    },
  },

  {
    id: 'lesson-4',
    slug: 'improve-typing-accuracy',
    title: 'Accuracy First: Why Speed is a By-Product of Precision',
    category: 'Technique',
    readTime: '4 min read',
    summary: 'Understand the mathematical penalty of typos and learn how slowing down 10% increases your final WPM by 25%.',
    content: {
      intro: 'A single typo costs at least 4 to 5 keystrokes: the wrong key, recognizing the error, backspacing the error, typing the correct key, and recovering your typing rhythm.',
      sections: [
        {
          heading: 'The High Cost of Backspacing',
          body: [
            'In competitive government exams like SSC and CPCT, uncorrected errors directly deduct marks, while excessive backspacing consumes valuable seconds.',
            'If you type at 50 WPM with 88% accuracy, your Net WPM drops below 35 WPM. If you slow down to 42 WPM with 99% accuracy, your Net WPM remains a rock-solid 41 WPM.',
          ],
          tips: [
            'Never rush through punctuation and capital letters. Slow down slightly before difficult clusters.',
          ],
        },
      ],
      actionSteps: [
        'Adopt the 95% Accuracy Rule: If your test accuracy drops below 95%, force yourself to reduce speed until accuracy returns above 97%.',
        'Review your Weak Keys in My Progress on TypeBharat after every test.',
      ],
    },
  },

  {
    id: 'lesson-5',
    slug: 'understanding-wpm-formulas',
    title: 'Understanding WPM: Gross WPM vs Net WPM vs Standard KDPH',
    category: 'Exam Strategy',
    readTime: '4 min read',
    summary: 'A transparent guide to how words per minute and key depressions per hour are mathematically calculated.',
    content: {
      intro: 'Different testing platforms and examination bodies calculate typing speed using varying standards. Here is the exact mathematics behind every metric.',
      sections: [
        {
          heading: 'The 5-Character Standard Word Convention',
          body: [
            'In international typing standards, a "word" is standardized as exactly 5 characters, including letters, spaces, and punctuation. This standardizes evaluation across long and short words.',
            'Standard WPM = (Total Correct Characters / 5) / (Time in Minutes).',
          ],
        },
        {
          heading: 'Gross WPM vs Net WPM',
          body: [
            'Gross WPM measures raw typing speed without penalizing errors: Gross WPM = (Total Characters Typed / 5) / (Time in Minutes).',
            'Net WPM subtracts error penalties: Net WPM = Gross WPM - (Uncorrected Errors / Time in Minutes).',
            'KDPH (Key Depressions Per Hour): KDPH = (Total Keystrokes in Test / Test Minutes) * 60. For example, 10,500 KDPH in a 15-minute test corresponds to 2,625 depressions (approx 35 WPM).',
          ],
        },
      ],
      actionSteps: [
        'Check the specific calculation method required by your recruitment notice.',
        'Use TypeBharat Exam Simulator to see both Gross WPM and Net WPM reported simultaneously.',
      ],
    },
  },

  {
    id: 'lesson-6',
    slug: 'hindi-typing-inscript-guide',
    title: 'Hindi Typing Guide: Inscript & Remington Gail Fundamentals',
    category: 'Foundation',
    readTime: '5 min read',
    summary: 'Complete guide for Indian candidates preparing for Hindi Unicode typing examinations.',
    content: {
      intro: 'Typing in Hindi on modern operating systems is fully standardized through Unicode Devanagari. Understanding the difference between Inscript layout and Remington Gail layout is essential for state and central government tests.',
      sections: [
        {
          heading: 'Inscript Keyboard Layout (Standard Govt Layout)',
          body: [
            'Inscript is the official keyboard layout standardized by the Government of India (Department of Electronics).',
            'Logical design: All vowels are arranged on the left-hand keys, while all consonants are grouped on the right-hand keys.',
            'Matras are generated automatically by pressing the vowel key after a consonant.',
            'Half characters (संयुक्ताक्षर) are created using the Viram / Halant key (D key in Inscript). For example, क + ् + ष = क्ष.',
          ],
        },
        {
          heading: 'Remington Gail Layout (Legacy Typewriter Layout)',
          body: [
            'Remington layout mimics traditional mechanical Hindi typewriters. Many candidates who trained in commercial typing institutes prefer Remington Gail.',
            'CPCT Madhya Pradesh allows candidates to choose either Inscript or Remington Gail at the examination workstation.',
          ],
          tips: [
            'Ensure Windows Indic Input or your OS Hindi Unicode IME is installed. In Windows: Settings -> Time & Language -> Language & Region -> Add Hindi -> Add Inscript Keyboard.',
          ],
        },
      ],
      actionSteps: [
        'Verify your preferred Hindi input layout in Windows or mobile settings.',
        'Start with TypeBharat "Hindi Vowels and Consonants" practice drill.',
        'Practice halant and matras systematically before taking full 15-minute mock tests.',
      ],
    },
  },
];
