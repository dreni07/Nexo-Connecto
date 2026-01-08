import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardEntry {
    rank: number;
    name: string;
    problemsSolved: number;
    streak: number;
}

const dummyLeaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Student A', problemsSolved: 45, streak: 12 },
    { rank: 2, name: 'Student B', problemsSolved: 38, streak: 8 },
    { rank: 3, name: 'Student C', problemsSolved: 35, streak: 15 },
    { rank: 4, name: 'Student D', problemsSolved: 32, streak: 5 },
    { rank: 5, name: 'Student E', problemsSolved: 28, streak: 7 },
];

const MiniLeaderboard = () => {
    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Trophy className="w-5 h-5 text-yellow-500" />;
            case 2:
                return <Medal className="w-5 h-5 text-gray-400" />;
            case 3:
                return <Award className="w-5 h-5 text-orange-600" />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-[#CD5656]" />
                <h2 className="text-lg font-semibold font-outfit text-gray-900">Weekly Leaderboard</h2>
            </div>

            <div className="space-y-3">
                {dummyLeaderboard.map((entry) => (
                    <div
                        key={entry.rank}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center justify-center w-8 h-8">
                            {getRankIcon(entry.rank) || (
                                <span className="text-sm font-bold text-gray-500 font-outfit">{entry.rank}</span>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold text-gray-900 font-outfit">{entry.name}</div>
                            <div className="text-xs text-gray-500 font-outfit">
                                {entry.problemsSolved} solved • {entry.streak} day streak
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-4 px-4 py-2 text-sm text-[#CD5656] font-outfit hover:bg-gray-50 rounded-lg transition-colors">
                View Full Leaderboard
            </button>
        </div>
    );
};

export default MiniLeaderboard;

