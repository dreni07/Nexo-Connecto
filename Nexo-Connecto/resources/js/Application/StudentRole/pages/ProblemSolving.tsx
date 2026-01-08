import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import StudentLayout from '@/layouts/student-layout';
import LevelSelection from '../components/ProblemSolving/LevelSelection';
import ProblemList from '../components/ProblemSolving/ProblemList';
import ProblemDetail from '../components/ProblemSolving/ProblemDetail';
import ProgressTracking from '../components/ProblemSolving/ProgressTracking';
import DailyChallenge from '../components/ProblemSolving/DailyChallenge';
import MiniLeaderboard from '../components/ProblemSolving/MiniLeaderboard';
import { Difficulty } from '../components/ProblemSolving/types';

interface ProblemSolvingProps {
    user_details?: {
        name: string;
        email: string;
        avatar?: string;
    };
}

const ProblemSolving = ({ user_details }: ProblemSolvingProps) => {
    const [selectedProblem, setSelectedProblem] = useState<number | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

    const handleSelectLevel = (level: number, difficulty: Difficulty) => {
        setSelectedLevel(level);
        setSelectedDifficulty(difficulty);
    };

    const handleBackToLevels = () => {
        setSelectedLevel(null);
        setSelectedDifficulty(null);
        setSelectedProblem(null);
    };

    return (
        <StudentLayout>
            <Head title="Problem Solving" />
            <div className="min-h-screen bg-[#F4F5ED]">
                <main className="w-full px-4 sm:px-6 md:px-8 py-6 md:py-8">
                        <div className="max-w-[1800px] mx-auto">
                            {selectedProblem ? (
                                <ProblemDetail 
                                    problemId={selectedProblem} 
                                    onBack={() => setSelectedProblem(null)}
                                />
                            ) : selectedLevel ? (
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                    {/* Left Sidebar - Progress & Challenges */}
                                    <div className="lg:col-span-3 space-y-6">
                                        <ProgressTracking />
                                        <DailyChallenge />
                                        <MiniLeaderboard />
                                    </div>

                                    {/* Main Content - Problem List */}
                                    <div className="lg:col-span-9">
                                        <ProblemList 
                                            onSelectProblem={setSelectedProblem}
                                            selectedDifficulty={selectedDifficulty}
                                            selectedLevel={selectedLevel}
                                            onBackToLevels={handleBackToLevels}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                    {/* Left Sidebar - Progress & Challenges */}
                                    <div className="lg:col-span-3 space-y-6">
                                        <ProgressTracking />
                                        <DailyChallenge />
                                        <MiniLeaderboard />
                                    </div>

                                    {/* Main Content - Level Selection */}
                                    <div className="lg:col-span-9">
                                        <LevelSelection onSelectLevel={handleSelectLevel} />
                                    </div>
                                </div>
                            )}
                        </div>
                </main>
            </div>
        </StudentLayout>
    );
};

export default ProblemSolving;

