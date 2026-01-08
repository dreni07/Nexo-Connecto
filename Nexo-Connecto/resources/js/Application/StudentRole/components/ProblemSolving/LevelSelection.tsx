import React from 'react';
import { Difficulty } from './types';

interface LevelSelectionProps {
    onSelectLevel: (level: number, difficulty: Difficulty) => void;
}

const LevelSelection = ({ onSelectLevel }: LevelSelectionProps) => {
    // Map levels to difficulties
    const getDifficultyForLevel = (level: number): Difficulty => {
        if (level <= 3) return 'Easy';
        if (level <= 6) return 'Medium';
        return 'Hard';
    };

    const getDifficultyColor = (difficulty: Difficulty) => {
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
            <div>
                <h1 className="text-3xl font-bold font-outfit text-gray-900 mb-2">Problem Solving</h1>
                <p className="text-gray-600 font-outfit">Select a level to start practicing</p>
            </div>

            {/* Level Boxes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((level) => {
                    const difficulty = getDifficultyForLevel(level);
                    return (
                        <div
                            key={level}
                            onClick={() => onSelectLevel(level, difficulty)}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer hover:border-[#CD5656] group"
                        >
                            <div className="flex flex-col items-center text-center space-y-3">
                                <div className="w-16 h-16 rounded-full bg-[#CD5656] flex items-center justify-center group-hover:bg-[#AF3E3E] transition-colors">
                                    <span className="text-2xl font-bold text-white font-outfit">{level}</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold font-outfit text-gray-900 mb-2">
                                        Level {level}
                                    </h3>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold border ${getDifficultyColor(
                                            difficulty
                                        )} font-outfit`}
                                    >
                                        {difficulty}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 font-outfit">
                                    {difficulty} difficulty problems
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LevelSelection;

