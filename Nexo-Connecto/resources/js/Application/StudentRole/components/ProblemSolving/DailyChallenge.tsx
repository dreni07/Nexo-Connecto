import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Award } from 'lucide-react';
import { dailyChallenge } from './dummyData';

const DailyChallenge = () => {
    const [timeRemaining, setTimeRemaining] = useState(dailyChallenge.timeRemaining);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    return 86400; // Reset to 24 hours
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
        <div className="bg-gradient-to-br from-[#CD5656] to-[#AF3E3E] rounded-lg shadow-sm border border-red-300 p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5" />
                <h2 className="text-lg font-semibold font-outfit">Daily Challenge</h2>
            </div>

            <div className="mb-4">
                <h3 className="text-xl font-bold font-outfit mb-2">{dailyChallenge.title}</h3>
                <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(
                        dailyChallenge.difficulty
                    )} font-outfit`}
                >
                    {dailyChallenge.difficulty}
                </span>
            </div>

            <div className="flex items-center gap-2 mb-4 p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-outfit">Time Remaining:</span>
                <span className="text-lg font-bold font-mono font-outfit">{formatTime(timeRemaining)}</span>
            </div>

            <button className="w-full px-4 py-2 bg-white text-[#CD5656] rounded-lg font-semibold font-outfit hover:bg-gray-100 transition-colors">
                Start Challenge
            </button>

            <div className="mt-4 flex items-center gap-2 text-sm font-outfit opacity-90">
                <Award className="w-4 h-4" />
                <span>Complete to earn bonus points!</span>
            </div>
        </div>
    );
};

export default DailyChallenge;

