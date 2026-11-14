import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/common/Layout';
import { TypingSettingsProvider } from './context/TypingSettingsContext';
import { UserHistoryProvider } from './context/UserHistoryContext';

// Pages
import { HomePage } from './pages/HomePage';
import { EnglishTypingTestPage } from './pages/EnglishTypingTestPage';
import { HindiTypingTestPage } from './pages/HindiTypingTestPage';
import { TypingSpeedTestPage } from './pages/TypingSpeedTestPage';
import { FreeTypingTestPage } from './pages/FreeTypingTestPage';
import { TypingPracticePage } from './pages/TypingPracticePage';
import { HindiPracticePage } from './pages/HindiPracticePage';
import { GovernmentExamsPage } from './pages/GovernmentExamsPage';
import { CPCTExamPage } from './pages/CPCTExamPage';
import { SSCExamPage } from './pages/SSCExamPage';
import { TypingLessonsPage } from './pages/TypingLessonsPage';
import { MyProgressPage } from './pages/MyProgressPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { FAQPage } from './pages/FAQPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <TypingSettingsProvider>
      <UserHistoryProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="english-typing-test" element={<EnglishTypingTestPage />} />
            <Route path="english-typing-test/" element={<EnglishTypingTestPage />} />
            <Route path="hindi-typing-test" element={<HindiTypingTestPage />} />
            <Route path="hindi-typing-test/" element={<HindiTypingTestPage />} />
            <Route path="typing-speed-test" element={<TypingSpeedTestPage />} />
            <Route path="typing-speed-test/" element={<TypingSpeedTestPage />} />
            <Route path="free-typing-test" element={<FreeTypingTestPage />} />
            <Route path="free-typing-test/" element={<FreeTypingTestPage />} />
            <Route path="typing-practice" element={<TypingPracticePage />} />
            <Route path="typing-practice/" element={<TypingPracticePage />} />
            <Route path="hindi-typing-practice" element={<HindiPracticePage />} />
            <Route path="hindi-typing-practice/" element={<HindiPracticePage />} />
            <Route path="government-typing-test" element={<GovernmentExamsPage />} />
            <Route path="government-typing-test/" element={<GovernmentExamsPage />} />
            <Route path="cpct-typing-test" element={<CPCTExamPage />} />
            <Route path="cpct-typing-test/" element={<CPCTExamPage />} />
            <Route path="ssc-typing-test" element={<SSCExamPage />} />
            <Route path="ssc-typing-test/" element={<SSCExamPage />} />
            <Route path="typing-lessons" element={<TypingLessonsPage />} />
            <Route path="typing-lessons/" element={<TypingLessonsPage />} />
            <Route path="my-progress" element={<MyProgressPage />} />
            <Route path="my-progress/" element={<MyProgressPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="about/" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="contact/" element={<ContactPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="privacy-policy/" element={<PrivacyPolicyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="terms/" element={<TermsPage />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="faq/" element={<FAQPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </UserHistoryProvider>
    </TypingSettingsProvider>
  );
};

export default App;
