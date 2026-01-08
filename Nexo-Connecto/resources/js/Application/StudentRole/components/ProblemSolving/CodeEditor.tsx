import React from 'react';
import { Language } from './types';

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
    language: Language;
}

const CodeEditor = ({ value, onChange, language }: CodeEditorProps) => {
    return (
        <div className="relative">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-96 p-4 font-mono text-sm bg-gray-900 text-green-400 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CD5656] resize-none custom-scrollbar"
                style={{
                    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, "source-code-pro", monospace',
                    tabSize: 4,
                }}
                spellCheck={false}
                placeholder="Write your code here..."
            />
            <div className="absolute top-2 right-2 px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded font-outfit">
                {language}
            </div>
        </div>
    );
};

export default CodeEditor;

