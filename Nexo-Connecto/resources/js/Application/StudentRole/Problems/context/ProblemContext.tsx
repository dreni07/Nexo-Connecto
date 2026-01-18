import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProblemContextType {
    code: string;
    setCode: (code: string) => void;
    language: string;
    setLanguage: (lang: string) => void;
    theme: string;
    setTheme: (theme: string) => void;
    isSubmitting: boolean;
    setIsSubmitting: (submitting: boolean) => void;
}

const ProblemContext = createContext<ProblemContextType | undefined>(undefined);

interface Language {
    id: number;
    language_name: string;
    processed_template?: string;
}

interface ProblemProviderProps {
    children: ReactNode;
    availableLanguages: Language[];
}

export const ProblemProvider = ({ children, availableLanguages }: ProblemProviderProps) => {
    // Helper to find template for a language
    const getTemplateForLanguage = (langName: string) => {
        const lang = availableLanguages.find(
            l => l.language_name.toLowerCase() === langName.toLowerCase()
        );
        return lang?.processed_template || `// Write your solution in ${langName} here...`;
    };

    const initialLanguage = availableLanguages[0]?.language_name.toLowerCase() || "javascript";
    
    const [language, setLanguageState] = useState(initialLanguage);
    const [code, setCode] = useState(getTemplateForLanguage(initialLanguage));
    const [theme, setTheme] = useState('vs-dark');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setLanguage = (lang: string) => {
        setLanguageState(lang);
        setCode(getTemplateForLanguage(lang));
    };

    return (
        <ProblemContext.Provider value={{ code, setCode, language, setLanguage, theme, setTheme, isSubmitting, setIsSubmitting }}>
            {children}
        </ProblemContext.Provider>
    );
};

export const useProblem = () => {
    const context = useContext(ProblemContext);
    if (!context) throw new Error('useProblem must be used within a ProblemProvider');
    return context;
};

