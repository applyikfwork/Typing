import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_URL = 'https://typebharat.com';

if (!fs.existsSync(DIST_DIR)) {
  console.error('Error: dist directory does not exist. Run "vite build" first.');
  process.exit(1);
}

const templatePath = path.join(DIST_DIR, 'index.html');
const templateHtml = fs.readFileSync(templatePath, 'utf-8');

/**
 * Route metadata and pre-baked semantic content registry
 */
const ROUTES = [
  {
    path: '/',
    title: 'TypeBharat - Master Typing Speed, Accuracy & Govt Exam Prep',
    description: 'India\'s leading typing platform for students and government job aspirants. Free English & Hindi Unicode typing tests, SSC CHSL, CPCT, and railway skill practice.',
    canonical: `${BASE_URL}/`,
    keywords: 'typing test online, typing speed test, hindi typing test, cpct typing test, ssc typing practice, free typing test, wpm test',
    lang: 'en',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        'name': 'TypeBharat',
        'url': `${BASE_URL}/`,
        'description': 'Premier online typing practice, speed test, and government exam preparation platform for English and Hindi Unicode.',
        'potentialAction': {
          '@type': 'SearchAction',
          'target': `${BASE_URL}/faq/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        'name': 'TypeBharat',
        'url': `${BASE_URL}/`,
        'logo': `${BASE_URL}/favicon.svg`,
        'description': 'India’s premier open typing speed test, practice platform, and government competitive exam simulator.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'TypeBharat Typing Speed Test',
        'applicationCategory': 'EducationalApplication',
        'operatingSystem': 'Windows, macOS, Linux, Android, iOS',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'INR' },
      }
    ],
    bodySnippet: `
      <header class="p-6 text-center">
        <h1 class="text-4xl font-extrabold text-[#172B36]">Master Keyboard Typing for Speed & Govt Exams</h1>
        <p class="text-base text-[#586772] mt-2 max-w-2xl mx-auto">Free English and Hindi Unicode typing tests with real-time WPM calculation, accuracy telemetry, and competitive exam simulators for SSC CHSL, MP CPCT, and Railway recruitment.</p>
      </header>
    `
  },

  {
    path: '/english-typing-test/',
    title: 'English Typing Test - 1, 3, 5 & 10 Minute WPM Test Online | TypeBharat',
    description: 'Take a free English typing test online. Measure accurate WPM, gross speed, and accuracy percentage with real-time feedback on beginner, intermediate and advanced passages.',
    canonical: `${BASE_URL}/english-typing-test/`,
    keywords: 'English typing test, typing speed test 1 minute, 5 minute typing test english, online english typing practice, wpm typing speed test',
    lang: 'en',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'TypeBharat English Typing Test',
        'applicationCategory': 'EducationalApplication',
        'operatingSystem': 'Windows, macOS, Linux, Android, iOS',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'INR' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${BASE_URL}/` },
          { '@type': 'ListItem', 'position': 2, 'name': 'English Typing Test', 'item': `${BASE_URL}/english-typing-test/` }
        ]
      }
    ],
    bodySnippet: `
      <main class="max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-extrabold text-[#172B36]">English Typing Speed Test (WPM)</h1>
        <p class="text-sm text-[#586772] mt-1">Timed passage-based typing speed evaluation with live WPM, accuracy, and error diagnostics across 1, 3, 5, and 10 minute durations.</p>
      </main>
    `
  },

  {
    path: '/hindi-typing-test/',
    title: 'Hindi Typing Test Online - यूनिकोड हिंदी टाइपिंग टेस्ट (Inscript & Remington) | TypeBharat',
    description: 'मुफ्त हिंदी यूनिकोड टाइपिंग टेस्ट। CPCT, SSC और सरकारी परीक्षाओं के लिए 1, 3, 5 और 10 मिनट की हिंदी टाइपिंग गति और सटीकता मापें।',
    canonical: `${BASE_URL}/hindi-typing-test/`,
    keywords: 'Hindi typing test, online hindi typing test, hindi unicode typing, cpct hindi typing test, hindi typing practice inscript',
    lang: 'hi',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'TypeBharat Hindi Typing Test (हिंदी टाइपिंग टेस्ट)',
        'applicationCategory': 'EducationalApplication',
        'operatingSystem': 'Windows, macOS, Linux, Android, iOS',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'INR' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${BASE_URL}/` },
          { '@type': 'ListItem', 'position': 2, 'name': 'Hindi Typing Test', 'item': `${BASE_URL}/hindi-typing-test/` }
        ]
      }
    ],
    bodySnippet: `
      <main class="max-w-4xl mx-auto p-6 font-hindi">
        <h1 class="text-3xl font-extrabold text-[#172B36]">ऑनलाइन हिंदी टाइपिंग टेस्ट (Hindi Unicode Test)</h1>
        <p class="text-sm text-[#586772] mt-1">देवनागरी यूनिकोड Inscript और Remington Gail लेआउट पर मुफ्त टाइपिंग परीक्षा अभ्यास।</p>
      </main>
    `
  },

  {
    path: '/typing-speed-test/',
    title: 'Typing Speed Test - Calculate Real WPM & Accuracy Online | TypeBharat',
    description: 'Calculate your exact typing speed in Words Per Minute (WPM) and accuracy. Instant results with comprehensive error analysis and custom improvement recommendations.',
    canonical: `${BASE_URL}/typing-speed-test/`,
    keywords: 'typing speed test, typing speed calculator, wpm speed test, how fast do i type, online typing speed checker',
    lang: 'en',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'TypeBharat Typing Speed Calculator',
        'applicationCategory': 'EducationalApplication',
        'operatingSystem': 'Windows, macOS, Linux, Android, iOS',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'INR' },
      }
    ],
    bodySnippet: `
      <main class="max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-extrabold text-[#172B36]">Typing Speed Calculator (WPM)</h1>
        <p class="text-sm text-[#586772] mt-1">Calculate your gross typing speed, net speed after penalty deductions, and overall accuracy percentile.</p>
      </main>
    `
  },

  {
    path: '/free-typing-test/',
    title: 'Free Typing Test Online - Check Your Typing Speed & Accuracy | TypeBharat',
    description: 'Take a 100% free online typing test without registration. Test WPM, view real-time accuracy, analyze errors, and learn how to improve typing speed quickly.',
    canonical: `${BASE_URL}/free-typing-test/`,
    keywords: 'free typing test, free typing test online, check typing speed free, no sign up typing test, online typing speed test free',
    lang: 'en',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'TypeBharat Free Typing Test',
        'applicationCategory': 'EducationalApplication',
        'operatingSystem': 'Windows, macOS, Linux, Android, iOS',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'INR' },
      }
    ],
    bodySnippet: `
      <main class="max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-extrabold text-[#172B36]">Free Online Typing Test</h1>
        <p class="text-sm text-[#586772] mt-1">Instant browser-based typing evaluation with zero signup, zero paywalls, and 100% client-side data privacy.</p>
      </main>
    `
  },

  {
    path: '/typing-practice/',
    title: 'Online Typing Practice - Step-by-Step Drills for Beginners to Pro | TypeBharat',
    description: 'Structured online typing practice exercises. Master home row, top row, numbers, common clerical vocabulary, and tricky words with real-time feedback.',
    canonical: `${BASE_URL}/typing-practice/`,
    keywords: 'typing practice, online typing practice, typing practice for beginners, home row typing practice, touch typing practice drills',
    lang: 'en',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'TypeBharat Typing Practice Arena',
        'applicationCategory': 'EducationalApplication',
        'operatingSystem': 'Windows, macOS, Linux, Android, iOS',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'INR' },
      }
    ],
    bodySnippet: `
      <main class="max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-extrabold text-[#172B36]">Structured Typing Practice Arena</h1>
        <p class="text-sm text-[#586772] mt-1">Systematic muscle-memory exercises for Home Row, Top Row, Bottom Row, and frequently misspelled clerical words.</p>
      </main>
    `
  },

  {
    path: '/hindi-typing-practice/',
    title: 'Hindi Typing Practice Online - हिंदी टाइपिंग अभ्यास (Inscript & Remington) | TypeBharat',
    description: 'चरणबद्ध हिंदी टाइपिंग अभ्यास। वर्णमाला, मात्राएं, संयुक्ताक्षर, हलंत और प्रशासनिक परीक्षा शब्दावली का सटीक ऑनलाइन अभ्यास करें।',
    canonical: `${BASE_URL}/hindi-typing-practice/`,
    keywords: 'hindi typing practice, hindi typing practice online, inscript typing practice, hindi matra practice, hindi varnamala typing',
    lang: 'hi',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'TypeBharat Hindi Typing Practice (हिंदी टाइपिंग अभ्यास)',
        'applicationCategory': 'EducationalApplication',
        'operatingSystem': 'Windows, macOS, Linux, Android, iOS',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'INR' },
      }
    ],
    bodySnippet: `
      <main class="max-w-4xl mx-auto p-6 font-hindi">
        <h1 class="text-3xl font-extrabold text-[#172B36]">हिंदी टाइपिंग अभ्यास केंद्र (Hindi Typing Practice)</h1>
        <p class="text-sm text-[#586772] mt-1">वर्णमाला, मात्राओं, संयुक्ताक्षरों और प्रशासनिक परीक्षा शब्दावली का क्रमबद्ध देवनागरी अभ्यास।</p>
      </main>
    `
  },

  {
    path: '/government-typing-test/',
    title: 'Government Typing Exam Preparation - SSC, CPCT, Railway & Court Practice | TypeBharat',
    description: 'Comprehensive preparation directory for Indian government typing examinations. Authentic simulations for SSC CHSL, CGL DEST, MP CPCT, Railway RRB NTPC, and High Court typist tests.',
    canonical: `${BASE_URL}/government-typing-test/`,
    keywords: 'government typing test, ssc typing test, cpct typing test, railway typing test, court typist exam practice, govt typing exam pattern',
    lang: 'en',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'TypeBharat Government Typing Exam Simulator Directory',
        'applicationCategory': 'EducationalApplication',
        'operatingSystem': 'Windows, macOS, Linux, Android, iOS',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'INR' },
      }
    ],
    bodySnippet: `
      <main class="max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-extrabold text-[#172B36]">Government Typing Exam Simulations</h1>
        <p class="text-sm text-[#586772] mt-1">Realistic recruitment skill test simulations calibrated to official MP CPCT, SSC CHSL, CGL DEST, and Railway benchmarks.</p>
      </main>
    `
  },

  {
    path: '/cpct-typing-test/',
    title: 'MP CPCT Typing Test Online - English & Hindi Inscript Practice | TypeBharat',
    description: 'Comprehensive preparation portal for Madhya Pradesh CPCT exam. Practice 15-minute English (30 WPM) and Hindi (20 WPM) typing tests with official percentile score calculation.',
    canonical: `${BASE_URL}/cpct-typing-test/`,
    keywords: 'cpct typing test, cpct hindi typing test, cpct english typing test, mp cpct typing speed test, cpct remington gail typing, cpct inscript practice',
    lang: 'en',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'TypeBharat MP CPCT Typing Test Simulator',
        'applicationCategory': 'EducationalApplication',
        'operatingSystem': 'Windows, macOS, Linux, Android, iOS',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'INR' },
      }
    ],
    bodySnippet: `
      <main class="max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-extrabold text-[#172B36]">MP CPCT Typing Test Preparation</h1>
        <p class="text-sm text-[#586772] mt-1">15-minute English (30 WPM) and Hindi (20 WPM) typing practice for Madhya Pradesh MAP_IT certification.</p>
      </main>
    `
  },

  {
    path: '/ssc-typing-test/',
    title: 'SSC Typing Test Practice - CHSL Tier II & CGL DEST Skill Test Online | TypeBharat',
    description: 'Practice official SSC CHSL (35 WPM / 10500 KDPH) and SSC CGL DEST (2000 key depressions) typing tests. Realistic 10-minute and 15-minute simulation with full/half mistake evaluation.',
    canonical: `${BASE_URL}/ssc-typing-test/`,
    keywords: 'ssc typing test, ssc chsl typing test, ssc cgl dest typing test, 10500 kdph typing test, ssc typing test online practice',
    lang: 'en',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'TypeBharat SSC Typing Test Simulator',
        'applicationCategory': 'EducationalApplication',
        'operatingSystem': 'Windows, macOS, Linux, Android, iOS',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'INR' },
      }
    ],
    bodySnippet: `
      <main class="max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-extrabold text-[#172B36]">SSC Typing Test Preparation (CHSL & CGL)</h1>
        <p class="text-sm text-[#586772] mt-1">Practice for SSC Tier II LDC, JSA, and DEO positions with exact 10,500 KDPH key depression passage standards.</p>
      </main>
    `
  },

  {
    path: '/typing-lessons/',
    title: 'Touch Typing Lessons & Tutorials - Improve Speed, Accuracy & Posture | TypeBharat',
    description: 'Comprehensive touch-typing guides. Master the home row, ergonomic posture, look-ahead buffer reading, gross vs net WPM, and Hindi Inscript layout.',
    canonical: `${BASE_URL}/typing-lessons/`,
    keywords: 'typing lessons, learn touch typing, how to increase typing speed, typing posture ergonomic, touch typing guide for beginners',
    lang: 'en',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        'name': 'How to Master Touch Typing on Keyboard',
        'description': 'Step-by-step touch typing guide for finger placement, home row anchor, and speed acceleration.',
      }
    ],
    bodySnippet: `
      <main class="max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-extrabold text-[#172B36]">Typing Lessons & Technique Guides</h1>
        <p class="text-sm text-[#586772] mt-1">Master the biomechanics of touch typing, ergonomic workstation setup, and glance reduction strategies.</p>
      </main>
    `
  },

  {
    path: '/my-progress/',
    title: 'My Typing Progress - Speed Analytics, Personal Best & Weak Keys | TypeBharat',
    description: 'View your personal typing speed dashboard. Track historical WPM progression, test completion rate, accuracy trends, and weak-key analysis recorded locally.',
    canonical: `${BASE_URL}/my-progress/`,
    keywords: 'typing progress tracker, my typing speed dashboard, typing analytics, weak keys diagnostic, typing test history',
    lang: 'en',
    schemas: [],
    bodySnippet: `
      <main class="max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-extrabold text-[#172B36]">Typing Speed Analytics Dashboard</h1>
        <p class="text-sm text-[#586772] mt-1">Personal performance analytics, WPM progression curves, error diagnostic, and practice streaks stored privately on your browser.</p>
      </main>
    `
  },

  {
    path: '/about/',
    title: 'About TypeBharat - Mission, Speed Philosophy & Independent Educational Tool',
    description: 'Learn about TypeBharat, an independent open-access typing platform built for Indian students and competitive examination aspirants.',
    canonical: `${BASE_URL}/about/`,
    keywords: 'about typebharat, typing platform india, open source typing test',
    lang: 'en',
    schemas: [],
    bodySnippet: `
      <main class="max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-extrabold text-[#172B36]">About TypeBharat</h1>
        <p class="text-sm text-[#586772] mt-1">Independent educational typing platform built for Indian students, competitive job seekers, and multilingual typists.</p>
      </main>
    `
  },

  {
    path: '/contact/',
    title: 'Contact & Feedback - TypeBharat Platform Support',
    description: 'Share feedback, suggest typing passages, or report software bugs to the TypeBharat platform maintainers.',
    canonical: `${BASE_URL}/contact/`,
    keywords: 'contact typebharat, typing feedback, submit passage',
    lang: 'en',
    schemas: [],
    bodySnippet: `
      <main class="max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-extrabold text-[#172B36]">Contact & Suggestions</h1>
        <p class="text-sm text-[#586772] mt-1">Submit feedback, report layout issues, or suggest new competitive typing examination passages.</p>
      </main>
    `
  },

  {
    path: '/privacy-policy/',
    title: 'Privacy Policy - Client-Side Data Security & LocalStorage Transparency | TypeBharat',
    description: 'Learn how TypeBharat protects your privacy. We store typing results strictly in your local browser storage with zero personal data collection.',
    canonical: `${BASE_URL}/privacy-policy/`,
    keywords: 'privacy policy typebharat, client side privacy typing',
    lang: 'en',
    schemas: [],
    bodySnippet: `
      <main class="max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-extrabold text-[#172B36]">Privacy Policy</h1>
        <p class="text-sm text-[#586772] mt-1">Transparent explanation of HTML5 LocalStorage with zero server tracking and complete data deletion controls.</p>
      </main>
    `
  },

  {
    path: '/terms/',
    title: 'Terms of Service - TypeBharat Educational Platform Usage',
    description: 'Terms and conditions for utilizing TypeBharat typing tests, speed metrics, and examination simulators.',
    canonical: `${BASE_URL}/terms/`,
    keywords: 'terms of service typebharat, educational disclaimer typing',
    lang: 'en',
    schemas: [],
    bodySnippet: `
      <main class="max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-extrabold text-[#172B36]">Terms of Service</h1>
        <p class="text-sm text-[#586772] mt-1">Educational terms of service and unofficial government examination preparation disclaimers.</p>
      </main>
    `
  },

  {
    path: '/faq/',
    title: 'Frequently Asked Questions (FAQ) - Typing Speed, Exams & Hindi Unicode | TypeBharat',
    description: 'Comprehensive answers about WPM calculation, Gross vs Net typing speed, SSC CHSL & MP CPCT requirements, and Hindi Inscript typing.',
    canonical: `${BASE_URL}/faq/`,
    keywords: 'typing faq, how is wpm calculated, cpct typing marks, ssc chsl typing rules, hindi typing questions',
    lang: 'en',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'How is Words Per Minute (WPM) calculated on TypeBharat?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Standard WPM is calculated as (Correct Characters / 5) / Time in Minutes based on the 5-character international standard word convention.'
            }
          }
        ]
      }
    ],
    bodySnippet: `
      <main class="max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-extrabold text-[#172B36]">Frequently Asked Questions</h1>
        <p class="text-sm text-[#586772] mt-1">Detailed answers regarding typing measurement mathematics, examination qualifying criteria, and Hindi keyboard configurations.</p>
      </main>
    `
  }
];

console.log(`Starting static prerendering for ${ROUTES.length} public routes...`);

ROUTES.forEach((route) => {
  let html = templateHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

  // Replace Meta Description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${route.description}" />`
  );

  // Replace Meta Keywords
  html = html.replace(
    /<meta name="title" content=".*?" \/>/i,
    `<meta name="title" content="${route.title}" />\n    <meta name="keywords" content="${route.keywords}" />\n    <meta name="author" content="TypeBharat Team" />\n    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n    <link rel="canonical" href="${route.canonical}" />\n    <link rel="alternate" hreflang="en" href="${BASE_URL}/english-typing-test/" />\n    <link rel="alternate" hreflang="hi" href="${BASE_URL}/hindi-typing-test/" />\n    <link rel="alternate" hreflang="x-default" href="${BASE_URL}/" />`
  );

  // Replace Open Graph Tags
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/i,
    `<meta property="og:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/i,
    `<meta property="og:description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/i,
    `<meta property="og:url" content="${route.canonical}" />\n    <meta property="og:image" content="${BASE_URL}/og-banner.svg" />\n    <meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />\n    <meta property="og:image:alt" content="${route.title}" />\n    <meta property="og:site_name" content="TypeBharat" />\n    <meta property="og:locale" content="${route.lang === 'hi' ? 'hi_IN' : 'en_IN'}" />`
  );

  // Replace Twitter Card Tags
  html = html.replace(
    /<meta property="twitter:title" content=".*?" \/>/i,
    `<meta property="twitter:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta property="twitter:description" content=".*?" \/>/i,
    `<meta property="twitter:description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta property="twitter:url" content=".*?" \/>/i,
    `<meta property="twitter:url" content="${route.canonical}" />\n    <meta property="twitter:image" content="${BASE_URL}/og-banner.svg" />`
  );

  // Inject Schemas before </head>
  if (route.schemas && route.schemas.length > 0) {
    const schemaTag = `\n    <!-- Pre-rendered JSON-LD Schemas -->\n    <script type="application/ld+json">\n${JSON.stringify(route.schemas, null, 2)}\n    </script>\n  `;
    html = html.replace('</head>', `${schemaTag}</head>`);
  }

  // Inject pre-rendered body semantic HTML inside <div id="root">
  if (route.bodySnippet) {
    html = html.replace('<div id="root"></div>', `<div id="root">${route.bodySnippet}</div>`);
  }

  // Determine output target path
  let targetFile;
  if (route.path === '/') {
    targetFile = path.join(DIST_DIR, 'index.html');
  } else {
    const cleanSubDir = route.path.replace(/^\/|\/$/g, '');
    const outDir = path.join(DIST_DIR, cleanSubDir);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    targetFile = path.join(outDir, 'index.html');
  }

  fs.writeFileSync(targetFile, html, 'utf-8');
  console.log(`✓ Pre-rendered static HTML for route: ${route.path} -> ${path.relative(DIST_DIR, targetFile)}`);
});

console.log('✅ Static SEO prerendering completed successfully!');
