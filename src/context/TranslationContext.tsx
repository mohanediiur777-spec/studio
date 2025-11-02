'use client';
import { createContext, useContext } from 'react';
import { useApp } from '@/hooks/useApp';
import { translations, Translation } from './translations';

type TranslationContextType = {
    lang: 'en' | 'ar';
    setLang: (lang: 'en' | 'ar') => void;
    t: Translation;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
    const { lang, setLang } = useApp();
    const t = translations[lang];

    return (
        <TranslationContext.Provider value={{ lang, setLang, t }}>
            {children}
        </TranslationContext.Provider>
    );
}

export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
}
