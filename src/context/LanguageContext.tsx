'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TranslationDictionary, translations } from '@/lib/translations';

interface LanguageContextType {
  lang: Language;
  language: Language;
  setLang: (lang: Language) => void;
  t: TranslationDictionary;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'weddinglive_lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default language is 'en' for the US market
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 1. Check URL param '?lang=en' or '?lang=vi'
      const searchParams = new URLSearchParams(window.location.search);
      const urlLang = searchParams.get('lang');
      if (urlLang === 'en' || urlLang === 'vi') {
        setLangState(urlLang);
        try {
          localStorage.setItem(STORAGE_KEY, urlLang);
        } catch {
          // ignore
        }
        document.documentElement.lang = urlLang;
        return;
      }

      // 2. Check localStorage
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'en' || saved === 'vi') {
          setLangState(saved);
          document.documentElement.lang = saved;
          return;
        }
      } catch {
        // ignore
      }

      // 3. Fallback: default to 'en' (US market)
      setLangState('en');
      document.documentElement.lang = 'en';
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, newLang);
      } catch {
        // ignore
      }
      document.documentElement.lang = newLang;
    }
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'vi' : 'en');
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, language: lang, setLang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Provide safe fallback with default English if used outside provider
    return {
      lang: 'en' as Language,
      language: 'en' as Language,
      setLang: () => {},
      t: translations.en,
      toggleLang: () => {},
    };
  }
  return context;
}
