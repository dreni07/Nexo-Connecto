import React from 'react';
import { TrendingUp, Trophy, Flame } from 'lucide-react';
import { Progress } from './types';
import { dummyProgress } from './dummyData';

const ProgressTracking = () => {
    const progress: Progress = dummyProgress;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#CD5656]" />
                <h2 className="text-lg font-semibold font-outfit text-gray-900">Your Progress</h2>
            </div>

            {/* Total Solved */}
            <div className="text-center p-4 bg-gradient-to-br from-[#CD5656] to-[#AF3E3E] rounded-lg text-white">
                <div className="text-3xl font-bold font-outfit mb-1">{progress.totalSolved}</div>
                <div className="text-sm font-outfit opacity-90">Problems Solved</div>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <Flame className="w-6 h-6 text-orange-600" />
                <div>
                    <div className="text-xl font-bold font-outfit text-orange-900">{progress.streak}</div>
                    <div className="text-xs text-orange-700 font-outfit">Day Streak</div>
                </div>
            </div>

            {/* Language Progress */}
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 font-outfit">Progress by Language</h3>
                {Object.entries(progress.byLanguage).map(([language, stats]) => (
                    <div key={language}>
                        <div className="flex justify-between text-xs mb-1 font-outfit">
                            <span className="text-gray-700">{language}</span>
                            <span className="text-gray-600">
                                {stats.solved}/{stats.total} ({stats.percentage.toFixed(0)}%)
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-[#CD5656] h-2 rounded-full transition-all duration-300"
                                style={{ width: `${stats.percentage}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgressTracking;

