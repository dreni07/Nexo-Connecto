import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Send, Lock, CheckCircle2 } from 'lucide-react';
import { Problem, Language } from './types';
import { dummyProblems } from './dummyData';
import CodeEditor from './CodeEditor';
import TestCases from './TestCases';
import SolutionExplanation from './SolutionExplanation';

interface ProblemDetailProps {
    problemId: number;
    onBack: () => void;
}

const ProblemDetail = ({ problemId, onBack }: ProblemDetailProps) => {
    const problem = dummyProblems.find((p) => p.id === problemId);
    const [selectedLanguage, setSelectedLanguage] = useState<Language>('JavaScript');
    const [code, setCode] = useState<string>('');
    const [testResults, setTestResults] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSolution, setShowSolution] = useState(false);

    useEffect(() => {
        if (problem) {
            // Set default code template based on language
            setCode(getDefaultCode(selectedLanguage));
        }
    }, [problem, selectedLanguage]);

    useEffect(() => {
        if (problem?.isSolved || (problem && problem.attempts && problem.attempts >= 2)) {
            setShowSolution(true);
        }
    }, [problem]);

    if (!problem) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500 font-outfit">Problem not found.</p>
                <button
                    onClick={onBack}
                    className="mt-4 px-4 py-2 bg-[#CD5656] text-white rounded-lg font-outfit hover:bg-[#AF3E3E] transition-colors"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const getDefaultCode = (lang: Language): string => {
        const templates: Record<Language, string> = {
            JavaScript: `function solution(input) {\n    // Your code here\n    return result;\n}`,
            Python: `def solution(input):\n    # Your code here\n    return result`,
            Java: `public class Solution {\n    public int solution(int input) {\n        // Your code here\n        return result;\n    }\n}`,
        };
        return templates[lang] || '';
    };

    const handleRun = () => {
        setIsSubmitting(true);
        // Simulate running code
        setTimeout(() => {
            const results = problem.testCases
                .filter((tc) => !tc.isHidden)
                .map((tc, index) => ({
                    testCase: tc,
                    passed: Math.random() > 0.3, // Random for demo
                    output: 'Simulated output',
                }));
            setTestResults(results);
            setIsSubmitting(false);
        }, 1000);
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Simulate submission
        setTimeout(() => {
            const allPassed = problem.testCases.every(() => Math.random() > 0.2);
            if (allPassed) {
                alert('Congratulations! All test cases passed! 🎉');
                setShowSolution(true);
            } else {
                alert('Some test cases failed. Keep trying!');
            }
            setIsSubmitting(false);
        }, 1500);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'Hard':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold font-outfit text-gray-900">{problem.title}</h1>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(
                                problem.difficulty
                            )} font-outfit`}
                        >
                            {problem.difficulty}
                        </span>
                        {problem.isSolved && (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {problem.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-outfit"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Problem Description */}
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold font-outfit text-gray-900 mb-4">Description</h2>
                        <p className="text-gray-700 font-outfit whitespace-pre-wrap leading-relaxed">
                            {problem.description}
                        </p>
                    </div>

                    {/* Test Cases */}
                    <TestCases testCases={problem.testCases} testResults={testResults} />

                    {/* Solution Explanation */}
                    {showSolution && problem.solutionExplanation ? (
                        <SolutionExplanation explanation={problem.solutionExplanation} />
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-2 text-gray-500">
                                <Lock className="w-5 h-5" />
                                <p className="font-outfit">
                                    {problem.isSolved
                                        ? 'Solution explanation unlocked!'
                                        : `Solution will unlock after ${3 - (problem.attempts || 0)} more attempt(s) or when you solve it.`}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Complexity Info */}
                    {(problem.timeComplexity || problem.spaceComplexity) && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold font-outfit text-gray-900 mb-3">
                                Complexity Analysis
                            </h3>
                            <div className="space-y-2 text-sm font-outfit">
                                {problem.timeComplexity && (
                                    <div>
                                        <span className="font-semibold text-gray-700">Time Complexity: </span>
                                        <span className="text-gray-600">{problem.timeComplexity}</span>
                                    </div>
                                )}
                                {problem.spaceComplexity && (
                                    <div>
                                        <span className="font-semibold text-gray-700">Space Complexity: </span>
                                        <span className="text-gray-600">{problem.spaceComplexity}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - Code Editor */}
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold font-outfit text-gray-900">Code Editor</h2>
                            <select
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value as Language)}
                                className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-outfit focus:outline-none focus:ring-2 focus:ring-[#CD5656]"
                            >
                                {problem.languages.map((lang) => (
                                    <option key={lang} value={lang}>
                                        {lang}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <CodeEditor
                            value={code}
                            onChange={setCode}
                            language={selectedLanguage}
                        />
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={handleRun}
                                disabled={isSubmitting}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-outfit hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Play className="w-4 h-4" />
                                Run Code
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#CD5656] text-white rounded-lg font-outfit hover:bg-[#AF3E3E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-4 h-4" />
                                Submit Solution
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemDetail;

