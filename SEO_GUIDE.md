# TypeBharat SEO Architecture & Indexing Guide

This document outlines the complete search engine optimization architecture implemented across TypeBharat.

---

## 🎯 Keyword-to-Page Mapping Architecture

Every page on TypeBharat is targeted toward a distinct search intent, eliminating keyword cannibalization.

| Route | Primary Keyword | Search Intent | Target Audience |
| :--- | :--- | :--- | :--- |
| `/` | typing speed test, typing test online | Immediate typing speed test + platform exploration | Broad audience, students, beginners |
| `/english-typing-test/` | English typing test, 5 minute typing test | Timed passage-based English evaluation (1m, 3m, 5m, 10m) | English typists, clerical test takers |
| `/hindi-typing-test/` | Hindi typing test, online Hindi typing | Genuine Devanagari Unicode typing with IME | Indian govt aspirants, CPCT candidates |
| `/typing-speed-test/` | typing speed calculator, wpm test | Precision calculation of Gross WPM, Net WPM, accuracy | Users wanting quantitative speed metrics |
| `/free-typing-test/` | free typing test, online typing test free | Free, no-sign-up typing tool | Organic searchers looking for free tools |
| `/typing-practice/` | online typing practice, home row practice | Structured exercises (Home, Top, Bottom, Words) | Beginners, intermediate learners |
| `/hindi-typing-practice/` | hindi typing practice, inscript typing practice | Devanagari vowels, matras, halant, administrative words | Hindi typists preparing for typing exams |
| `/government-typing-test/` | government typing test, govt typing practice | Directory of SSC, CPCT, Court, Railway simulations | Competitive examination candidates |
| `/cpct-typing-test/` | cpct typing test, mp cpct typing test | MAP_IT 15-minute English & Hindi exam simulation | MP CPCT candidates |
| `/ssc-typing-test/` | ssc typing test, ssc chsl typing test | 10-minute CHSL & 15-minute CGL DEST simulation | SSC CHSL & CGL aspirants |
| `/typing-lessons/` | typing lessons, how to increase typing speed | Educational guides on touch typing, posture, rhythm | Students learning touch typing |
| `/my-progress/` | typing progress tracker, my typing speed | Personal historical performance & weak keys | Returning users tracking improvement |
| `/faq/` | how is wpm calculated, gross vs net wpm | Informational answers with FAQPage schema | Users with procedural & technical questions |

---

## 📋 Page-by-Page Metadata Registry

### 1. Homepage (`/`)
- **Title**: `TypeBharat - Master Typing Speed, Accuracy & Govt Exam Prep`
- **Description**: `India's leading typing platform for students and government job aspirants. Free English & Hindi Unicode typing tests, SSC CHSL, CPCT, and railway skill practice.`
- **Canonical**: `https://typebharat.com/`
- **Structured Data**: `WebSite` schema with Sitelinks Searchbox (`SearchAction`).

### 2. English Typing Test (`/english-typing-test/`)
- **Title**: `English Typing Test - 1, 3, 5 & 10 Minute WPM Test Online | TypeBharat`
- **Description**: `Take a free English typing test online. Measure accurate WPM, gross speed, and accuracy percentage with real-time feedback on beginner, intermediate and advanced passages.`
- **Canonical**: `https://typebharat.com/english-typing-test/`
- **Structured Data**: `SoftwareApplication` schema.

### 3. Hindi Typing Test (`/hindi-typing-test/`)
- **Title**: `Hindi Typing Test Online - यूनिकोड हिंदी टाइपिंग टेस्ट (Inscript & Remington) | TypeBharat`
- **Description**: `मुफ्त हिंदी यूनिकोड टाइपिंग टेस्ट। CPCT, SSC और सरकारी परीक्षाओं के लिए 1, 3, 5 और 10 मिनट की हिंदी टाइपिंग गति और सटीकता मापें।`
- **Canonical**: `https://typebharat.com/hindi-typing-test/`
- **Structured Data**: `SoftwareApplication` schema.

### 4. MP CPCT Typing Test (`/cpct-typing-test/`)
- **Title**: `MP CPCT Typing Test Online - English & Hindi Inscript Practice | TypeBharat`
- **Description**: `Comprehensive preparation portal for Madhya Pradesh CPCT exam. Practice 15-minute English (30 WPM) and Hindi (20 WPM) typing tests with official percentile score calculation.`
- **Canonical**: `https://typebharat.com/cpct-typing-test/`

### 5. SSC Typing Test (`/ssc-typing-test/`)
- **Title**: `SSC Typing Test Practice - CHSL Tier II & CGL DEST Skill Test Online | TypeBharat`
- **Description**: `Practice official SSC CHSL (35 WPM / 10500 KDPH) and SSC CGL DEST (2000 key depressions) typing tests. Realistic 10-minute and 15-minute simulation with full/half mistake evaluation.`
- **Canonical**: `https://typebharat.com/ssc-typing-test/`

### 6. FAQ Page (`/faq/`)
- **Title**: `Frequently Asked Questions (FAQ) - Typing Speed, Exams & Hindi Unicode | TypeBharat`
- **Description**: `Comprehensive answers about WPM calculation, Gross vs Net typing speed, SSC CHSL & MP CPCT requirements, and Hindi Inscript typing.`
- **Canonical**: `https://typebharat.com/faq/`
- **Structured Data**: Valid Google-compliant `FAQPage` schema.

---

## 🗺️ Sitemap and Robots Configuration

- **Robots.txt Location**: `/robots.txt`
  - Explicitly permits all web search crawlers (`Allow: /`).
  - References the canonical sitemap (`Sitemap: https://typebharat.com/sitemap.xml`).
- **Sitemap XML Location**: `/sitemap.xml`
  - Contains all 17 public routes with `lastmod`, `changefreq`, and `priority` weighting (1.0 for Home, 0.9 for core test routes, 0.8 for practice and exams).

---

## 🔍 Google Search Console Onboarding Instructions

1. **Domain Property Verification**:
   - Add `typebharat.com` as a Domain property in Google Search Console.
   - Add the TXT DNS verification record provided by Google to your DNS provider (Cloudflare, Namecheap, GoDaddy).
2. **Submit XML Sitemap**:
   - In Search Console, navigate to **Sitemaps** &rarr; enter `sitemap.xml` &rarr; click **Submit**.
3. **Inspect Core URLs**:
   - Use the URL Inspection tool on `https://typebharat.com/`, `https://typebharat.com/english-typing-test/`, and `https://typebharat.com/hindi-typing-test/`.
   - Verify that Googlebot renders the page and discovers canonical tags.
4. **Rich Results Validation**:
   - Test `https://typebharat.com/faq/` using Google's Rich Results Test tool to confirm valid `FAQPage` rich snippet eligibility.
