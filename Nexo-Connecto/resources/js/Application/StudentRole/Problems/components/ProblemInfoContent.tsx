import React, {useState} from 'react';
import { Info } from 'lucide-react';

interface Problem {
    id: number;
    problem_title: string;
    description: string;
    difficulty: string;
}

interface ProblemVersion {
    id: number;
    problem: Problem;
    version: string;
    prompt: string;
    constraints: string | null;
    sample_output_input: Array<{
        input: string;
        output: string;
        explanation?: string;
    }> | null;
}

interface ProblemInfoProps {
    problem_details: ProblemVersion;
}

const ProblemInfoContent = ({ problem_details }: ProblemInfoProps) => {
    const { problem } = problem_details;

    const getDifficultyColor = (diff: string) => {
        switch (diff.toLowerCase()) {
            case 'easy': return 'text-green-500 bg-green-50 border-green-100';
            case 'medium': return 'text-amber-500 bg-amber-50 border-amber-100';
            case 'hard': return 'text-red-500 bg-red-50 border-red-100';
            default: return 'text-gray-500 bg-gray-50 border-gray-100';
        }
    };

    return (
        <div className="w-full overflow-y-auto bg-[#FAFAFA] h-full scrollbar-thin scrollbar-thumb-gray-200">
            <div className="max-w-3xl mx-auto p-8 space-y-8 pb-20">
                <div className="space-y-4">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                        {problem.id}. {problem.problem_title}
                    </h1>
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-lg border text-xs font-black uppercase tracking-widest ${getDifficultyColor(problem.difficulty)}`}>
                            {problem.difficulty}
                        </span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                            <Info className="w-3 h-3" />
                            V{problem_details.version}
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">Description</h3>
                    <div className="text-gray-600 leading-relaxed whitespace-pre-wrap font-medium">
                        {problem_details.prompt}
                    </div>
                </div>

                {Array.isArray(problem_details.sample_output_input) && problem_details.sample_output_input.length > 0 && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">Examples</h3>
                        {problem_details.sample_output_input.map((example, idx) => (
                            <div key={idx} className="space-y-3">
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Example {idx + 1}:</p>
                                <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4 shadow-sm">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Input</p>
                                        <code className="block bg-gray-50 p-3 rounded-xl text-sm text-[#CD5656] font-mono">
                                            {example.input}
                                        </code>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Output</p>
                                        <code className="block bg-gray-50 p-3 rounded-xl text-sm text-gray-800 font-mono">
                                            {example.output}
                                        </code>
                                    </div>
                                    {example.explanation && (
                                        <div className="pt-2 italic text-sm text-gray-500">
                                            <span className="font-bold">Explanation:</span> {example.explanation}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">Constraints</h3>
                    <div className="bg-gray-900/5 border border-gray-900/5 rounded-2xl p-6">
                        <ul className="list-disc list-inside space-y-3 text-gray-600 font-mono text-sm">
                            {(problem_details.constraints || '').split('\n').map((constraint, i) => (
                                <li key={i} className="leading-relaxed">{constraint}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemInfoContent;

