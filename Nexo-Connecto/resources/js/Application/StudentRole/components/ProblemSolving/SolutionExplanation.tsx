import React from 'react';
import { Lightbulb } from 'lucide-react';

interface SolutionExplanationProps {
    explanation: string;
}

const SolutionExplanation = ({ explanation }: SolutionExplanationProps) => {
    return (
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow-sm border border-yellow-200 p-6">
            <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                <h2 className="text-lg font-semibold font-outfit text-gray-900">Solution Explanation</h2>
            </div>
            <p className="text-gray-700 font-outfit leading-relaxed whitespace-pre-wrap">{explanation}</p>
        </div>
    );
};

export default SolutionExplanation;

