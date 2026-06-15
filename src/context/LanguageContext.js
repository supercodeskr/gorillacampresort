'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('jp');

  useEffect(() => {
    // Optionally retrieve from local storage if previously set
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const toggleLanguage = () => {
    let next = 'en';
    if (language === 'en') next = 'jp';
    else if (language === 'jp') next = 'np';
    
    setLanguage(next);
    localStorage.setItem('language', next);
  };

  const t = (en, jp, np) => {
    if (language === 'jp' && jp) return jp;
    if (language === 'np' && np) return np;
    return en; // fallback
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
