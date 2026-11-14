# TypeBharat - Premier Typing Speed Test & Exam Preparation Platform

**TypeBharat** is an open, high-performance web platform engineered specifically for students, competitive government job aspirants (SSC CHSL, SSC CGL DEST, MP CPCT, Railway RRB NTPC, High Court typists), and multilingual typists across India and globally.

Built with React 18, TypeScript, Tailwind CSS, and Vite, TypeBharat delivers genuine utility with zero required registration, 100% client-side data privacy, and a native Hindi Devanagari Unicode typing engine.

---

## 🌟 Key Features

- **Unified Typing Arena**: Interactive, responsive typing test with real-time keystroke evaluation, live standard WPM calculation, accuracy percentage, mistake counters, and auto-scrolling passage view.
- **Genuine Hindi Unicode Engine**: Full support for Devanagari Unicode. Accurately evaluates matras, halants (viram), conjunct characters (संयुक्ताक्षर), and browser IME composition events without counting in-progress compositions as mistakes.
- **Official Exam Simulators**: Pre-configured test modes calibrated to official recruitment standards:
  - **MP CPCT English** (30 WPM qualifying benchmark, 15 minutes, percentile scorecard slabs).
  - **MP CPCT Hindi** (20 WPM qualifying benchmark, 15 minutes, Inscript & Remington Gail layout guidance).
  - **SSC CHSL Skill Test** (35 WPM / 10,500 KDPH, 10 minutes, full and half error deduction tracking).
  - **SSC CGL DEST** (2,000 key depressions, 15 minutes).
  - **Railway RRB NTPC** (30 WPM English / 25 WPM Hindi, 10 minutes).
  - **High Court & District Court Typist** (35 WPM, legal passage formats).
- **Personal Performance Dashboard**: LocalStorage-powered analytics tracking personal best speeds, average WPM, accuracy progression, test completion counts, and practice streaks.
- **Weak-Key Diagnostic**: Identifies troublesome characters with the highest error rates and offers immediate corrective guidance.
- **On-Screen Keyboard Guide**: Visual keyboard display indicating finger zones (pinky, ring, middle, index, thumb) for English QWERTY and Hindi Inscript.
- **Sound Effects Engine**: Web Audio API synthesized mechanical key clicks and error tones (zero external audio file downloads).
- **100% Private & Client-Side**: No user tracking, no backend database required, and instant full history reset option.

---

## 🛠️ Technology Stack

- **Framework**: React 18 (with functional components and hooks)
- **Language**: TypeScript 5 (strict typing, custom domain models)
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3 (custom light theme palette: `#FAFAF7`, `#159E8C`, `#172B36`)
- **Icons**: Lucide React
- **Audio**: Web Audio API (native browser synthesis)
- **Testing**: Vitest & React Testing Library (jsdom environment)
- **Routing**: React Router DOM v6

---

## 🚀 Getting Started

### Prerequisites

- Node.js version 18.0.0 or higher
- npm version 9.0.0 or higher

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/typebharat.git
cd typebharat
npm install
```

### Development Server

Start the local development server:

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Running Automated Tests

Run the Vitest test suite covering scoring logic, Unicode evaluation, and storage persistence:

```bash
npm test
```

### Production Build

Create an optimized, minified production build:

```bash
npm run build
```

The output assets will be generated in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

---

## 📁 Project Architecture

```
temptyping/
├── public/
│   ├── favicon.svg          # Modern teal keyboard icon
│   ├── robots.txt           # Search crawler directives
│   └── sitemap.xml          # Complete XML sitemap for search engines
├── src/
│   ├── types/               # TypeScript interfaces (Passage, TestResult, ExamConfig, SEO)
│   ├── context/             # Global React Contexts (TypingSettings, UserHistory)
│   ├── utils/
│   │   ├── typingEngine.ts  # Pure mathematical formulas for WPM, Net WPM, accuracy, Unicode
│   │   ├── sound.ts         # Synthesized Web Audio API sound generator
│   │   ├── storage.ts       # HTML5 LocalStorage safe serialization & streak logic
│   │   └── exams.ts         # Verified government examination benchmarks
│   ├── data/
│   │   ├── passages/        # Original English & Hindi passage libraries (Beginner, Inter, Adv)
│   │   ├── lessons.ts       # In-depth educational articles on ergonomics & touch typing
│   │   └── faqs.ts          # Frequently Asked Questions data
│   ├── components/
│   │   ├── common/          # Header, Footer, SEOHead, Breadcrumbs, StatCard
│   │   ├── typing/          # TypingEngine, Controls, ResultsModal, VirtualKeyboard, WeakKeyAnalysis
│   │   ├── exam/            # ExamGuideCard, Benchmark pills
│   │   └── progress/        # PerformanceChart (SVG), RecentTestsTable, StreakTracker
│   ├── pages/               # All 18 routed page views
│   ├── test/                # Unit test specifications
│   ├── App.tsx              # Application route definitions
│   ├── main.tsx             # React DOM entrypoint
│   └── index.css            # Tailwind base styling and typography
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🌐 Deployment Instructions

### Vercel / Netlify / Cloudflare Pages

1. Connect your Git repository.
2. Build command: `npm run build`
3. Output directory: `dist`
4. For single-page app routing (SPA), ensure redirects route to `index.html`.

---

## 📜 Legal & Independence Disclaimer

TypeBharat is an independent educational training platform developed solely to assist students and candidates in improving keyboard skills. It is not affiliated with, endorsed by, or sponsored by the Staff Selection Commission (SSC), MAP_IT (Government of Madhya Pradesh), Railway Recruitment Boards (RRB), High Courts, or any central or state government body. All examination names are used strictly for descriptive educational purposes.
