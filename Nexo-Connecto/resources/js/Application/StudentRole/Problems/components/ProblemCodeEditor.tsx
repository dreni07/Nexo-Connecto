import React from 'react';
import Editor, { OnMount, BeforeMount } from '@monaco-editor/react';
import { useProblem } from '../context/ProblemContext';
import { Globe, Palette, ChevronDown } from 'lucide-react';
import EditorLoadingOverlay from './EditorLoadingOverlay';
import { AnimatePresence } from 'framer-motion';

interface Language {
    id: number;
    language_name: string;
}

interface ProblemCodeEditorProps {
    available_languages: Language[];
}

const THEMES = [
    { id: 'vs-dark', name: 'Dark Default' },
    { id: 'light', name: 'Light Default' },
    { id: 'hc-black', name: 'High Contrast' },
    { id: 'oceanic-next', name: 'Oceanic Next' },
    { id: 'monokai', name: 'Monokai' },
    { id: 'night-owl', name: 'Night Owl' },
];

const ProblemCodeEditor = ({ available_languages }: ProblemCodeEditorProps) => {
    const { code, setCode, language, setLanguage, theme, setTheme, isSubmitting } = useProblem();

    const handleEditorWillMount: BeforeMount = (monaco) => {
        // Define Oceanic Next
        monaco.editor.defineTheme('oceanic-next', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#1b2b34',
            }
        });

        // Define Monokai
        monaco.editor.defineTheme('monokai', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '75715e' },
                { token: 'keyword', foreground: 'f92672' },
            ],
            colors: {
                'editor.background': '#272822',
            }
        });

        // Define Night Owl
        monaco.editor.defineTheme('night-owl', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#011627',
            }
        });
    };

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        // You can add more editor actions here if needed
    };

    const isDarkTheme = theme !== 'light';

    return (
        <div className="w-full h-full bg-[#1e1e1e] relative flex flex-col font-outfit">
            {/* Editor Header/Controls */}
            <div className={`h-14 flex items-center px-4 justify-between shrink-0 border-b ${
                isDarkTheme ? 'bg-[#252526] border-white/5' : 'bg-gray-50 border-gray-200'
            }`}>
                <div className="flex items-center gap-3">
                    {/* Language Selector */}
                    <div className="relative group">
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                            isDarkTheme 
                            ? 'bg-[#1e1e1e] border-white/10 hover:border-[#CD5656]/50' 
                            : 'bg-white border-gray-200 hover:border-[#CD5656]/50'
                        }`}>
                            <Globe className={`w-4 h-4 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={`text-[11px] font-black uppercase tracking-widest min-w-[80px] ${
                                isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                                {language}
                            </span>
                            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                        
                        <select 
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full"
                        >
                            {available_languages?.map((lang) => (
                                <option key={lang.id} value={lang.language_name.toLowerCase()}>
                                    {lang.language_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Theme Selector */}
                    <div className="relative group">
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                            isDarkTheme 
                            ? 'bg-[#1e1e1e] border-white/10 hover:border-[#CD5656]/50' 
                            : 'bg-white border-gray-200 hover:border-[#CD5656]/50'
                        }`}>
                            <Palette className={`w-4 h-4 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={`text-[11px] font-black uppercase tracking-widest min-w-[100px] ${
                                isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                                {THEMES.find(t => t.id === theme)?.name || 'Theme'}
                            </span>
                            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                        
                        <select 
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full"
                        >
                            {THEMES.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Monaco Editor Container */}
            <div className="flex-1 min-h-0 relative">
                <AnimatePresence>
                    {isSubmitting && <EditorLoadingOverlay />}
                </AnimatePresence>
                
                <Editor
                    height="100%"
                    theme={theme}
                    language={language.toLowerCase()}
                    value={code}
                    onChange={(val: string | undefined) => setCode(val || "")}
                    onMount={handleEditorDidMount}
                    beforeMount={handleEditorWillMount}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        padding: { top: 20 },
                        fontFamily: 'Fira Code, monospace',
                        fontLigatures: true,
                        scrollBeyondLastLine: false,
                        smoothScrolling: true,
                        cursorBlinking: "smooth",
                        cursorSmoothCaretAnimation: "on",
                        formatOnPaste: true,
                        formatOnType: true,
                        suggestOnTriggerCharacters: true,
                        quickSuggestions: true,
                        links: true,
                        renderLineHighlight: 'all',
                        lineNumbers: 'on',
                        scrollbar: {
                            vertical: 'visible',
                            horizontal: 'visible',
                            useShadows: false,
                            verticalScrollbarSize: 10,
                            horizontalScrollbarSize: 10,
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default ProblemCodeEditor;
