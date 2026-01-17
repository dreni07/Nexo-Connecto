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

const BOILERPLATE: Record<string, string> = {
    javascript: "// Write your solution here...\n\nfunction solution() {\n\n}",
    typescript: "// Write your solution here...\n\nfunction solution(): void {\n\n}",
    python: "# Write your solution here...\n\ndef solution():\n    pass",
    java: "// Write your solution here...\n\nclass Solution {\n    public void solution() {\n\n    }\n}",
    cpp: "// Write your solution here...\n\nclass Solution {\npublic:\n    void solution() {\n\n    }\n};",
    csharp: "// Write your solution here...\n\npublic class Solution {\n    public void Solution() {\n\n    }\n}",
    php: "<?php\n\n// Write your solution here...\n\nclass Solution {\n    /**\n     * @return void\n     */\n    function solution() {\n\n    }\n}",
    ruby: "# Write your solution here...\n\ndef solution\n\nend",
    go: "// Write your solution here...\n\npackage main\n\nfunc solution() {\n\n}",
    swift: "// Write your solution here...\n\nclass Solution {\n    func solution() {\n\n    }\n}",
};

export const ProblemProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState("javascript");
    const [code, setCode] = useState(BOILERPLATE.javascript);
    const [theme, setTheme] = useState('vs-dark');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setLanguage = (lang: string) => {
        setLanguageState(lang);
        const template = BOILERPLATE[lang.toLowerCase()] || `// Write your solution in ${lang} here...`;
        setCode(template);
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

