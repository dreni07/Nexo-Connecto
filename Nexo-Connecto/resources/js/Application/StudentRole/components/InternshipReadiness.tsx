import React from 'react';
import { CheckCircle2, Circle, TrendingUp } from 'lucide-react';

interface InternshipReadinessProps {
    skills: { id: number; skill_name: string }[];
    industry: { id: number; name: string } | null;
    university: string;
    avatar: string | null;
}

interface ReadinessCategory {
    name: string;
    score: number;
    maxScore: number;
    weight: number; // percentage weight in total score
}

interface ImprovementStep {
    id: number;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
}

const InternshipReadiness = ({ skills, industry, university, avatar }: InternshipReadinessProps) => {
    // Calculate scores for each category
    const calculateTechnicalSkillsScore = (): number => {
        const skillCount = skills?.length || 0;
        // Max score at 5+ skills
        return Math.min((skillCount / 5) * 100, 100);
    };

    const calculateProfileCompletionScore = (): number => {
        let score = 0;
        const maxScore = 100;
        
        // Avatar (20%)
        if (avatar) score += 20;
        
        // University (20%)
        if (university && university !== 'Not Specified') score += 20;
        
        // Industry (30%)
        if (industry) score += 30;
        
        // Skills (30%)
        if (skills && skills.length > 0) {
            score += Math.min((skills.length / 3) * 30, 30);
        }
        
        return Math.min(score, maxScore);
    };

    const calculateProblemsSolvedScore = (): number => {
        // Placeholder: In a real app, this would come from actual data
        // For now, we'll base it on skills (more skills = more problems likely solved)
        const skillCount = skills?.length || 0;
        return Math.min((skillCount / 4) * 100, 100);
    };

    const calculateInterviewPrepScore = (): number => {
        // Placeholder: In a real app, this would come from actual interview prep data
        // For now, we'll base it on profile completeness
        const profileScore = calculateProfileCompletionScore();
        return Math.min(profileScore * 0.8, 100);
    };

    const categories: ReadinessCategory[] = [
        {
            name: 'Technical Skills',
            score: calculateTechnicalSkillsScore(),
            maxScore: 100,
            weight: 25
        },
        {
            name: 'Profile Completion',
            score: calculateProfileCompletionScore(),
            maxScore: 100,
            weight: 25
        },
        {
            name: 'Problems Solved',
            score: calculateProblemsSolvedScore(),
            maxScore: 100,
            weight: 25
        },
        {
            name: 'Interview Preparation',
            score: calculateInterviewPrepScore(),
            maxScore: 100,
            weight: 25
        }
    ];

    // Calculate total readiness score
    const totalScore = Math.round(
        categories.reduce((sum, category) => {
            return sum + (category.score * category.weight) / 100;
        }, 0)
    );

    // Generate improvement steps based on lowest scores
    const generateImprovementSteps = (): ImprovementStep[] => {
        const steps: ImprovementStep[] = [];
        
        // Sort categories by score (lowest first)
        const sortedCategories = [...categories].sort((a, b) => a.score - b.score);
        
        sortedCategories.forEach((category, index) => {
            if (category.score < 80) {
                let step: ImprovementStep | null = null;
                
                switch (category.name) {
                    case 'Technical Skills':
                        step = {
                            id: index + 1,
                            title: 'Add More Technical Skills',
                            description: skills?.length === 0 
                                ? 'Start by adding your first technical skill to showcase your expertise'
                                : `You have ${skills?.length || 0} skill(s). Add more to strengthen your profile.`,
                            priority: category.score < 40 ? 'high' : category.score < 60 ? 'medium' : 'low'
                        };
                        break;
                    case 'Profile Completion':
                        step = {
                            id: index + 1,
                            title: 'Complete Your Profile',
                            description: !avatar 
                                ? 'Add a profile picture and complete all profile sections'
                                : !industry 
                                ? 'Select your target industry to improve profile visibility'
                                : 'Fill in any missing profile information',
                            priority: category.score < 50 ? 'high' : 'medium'
                        };
                        break;
                    case 'Problems Solved':
                        step = {
                            id: index + 1,
                            title: 'Solve More Coding Problems',
                            description: 'Practice solving coding challenges to demonstrate your problem-solving abilities',
                            priority: category.score < 50 ? 'high' : 'medium'
                        };
                        break;
                    case 'Interview Preparation':
                        step = {
                            id: index + 1,
                            title: 'Prepare for Interviews',
                            description: 'Practice common interview questions and prepare your portfolio projects',
                            priority: category.score < 50 ? 'high' : 'medium'
                        };
                        break;
                }
                
                if (step) {
                    steps.push(step);
                }
            }
        });

        // If all categories are good, show a positive message
        if (steps.length === 0) {
            steps.push({
                id: 1,
                title: 'Keep Up the Great Work!',
                description: 'Your profile is well-prepared. Continue building your skills and networking.',
                priority: 'low'
            });
        }

        return steps.slice(0, 4); // Limit to 4 steps
    };

    const improvementSteps = generateImprovementSteps();

    const getScoreColor = (score: number): string => {
        if (score >= 80) return '#CD5656';
        if (score >= 60) return '#CD5656';
        if (score >= 40) return '#CD5656';
        return '#CD5656';
    };

    const getScoreLabel = (score: number): string => {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        if (score >= 40) return 'Fair';
        return 'Needs Improvement';
    };

    return (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-fit">
            <div className="p-4 sm:p-5 pb-2 sm:pb-3">
                <div className="flex items-center justify-between mb-1">
                    <h2 className="text-lg sm:text-xl font-bold font-outfit text-gray-900">Internship Readiness</h2>
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#CD5656]" />
                </div>
                <p className="text-[10px] sm:text-xs text-gray-600 font-outfit">
                    Based on skills, profile, and preparation
                </p>
            </div>

            {/* Total Score */}
            <div className="px-4 sm:px-5 pb-2 sm:pb-3">
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-gray-100">
                    <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                        <span className="text-[10px] sm:text-xs font-medium text-gray-600 font-outfit">Overall Score</span>
                        <span className="text-base sm:text-lg font-bold font-outfit text-gray-900">{totalScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mb-1">
                        <div 
                            className="bg-[#CD5656] h-1.5 sm:h-2 rounded-full transition-all duration-500"
                            style={{ width: `${totalScore}%` }}
                        />
                    </div>
                    <p className="text-[10px] sm:text-xs font-medium font-outfit text-[#CD5656]">
                        {getScoreLabel(totalScore)}
                    </p>
                </div>
            </div>

            {/* Category Breakdown */}
            <div className="px-4 sm:px-5 pb-2">
                <h3 className="text-[10px] sm:text-xs font-semibold text-gray-900 font-outfit mb-1 sm:mb-1.5">Score Breakdown</h3>
                <div className="space-y-1 sm:space-y-1.5">
                    {categories.map((category) => (
                        <div key={category.name} className="flex items-center justify-between gap-2">
                            <span className="text-[10px] sm:text-xs font-medium text-gray-700 font-outfit flex-1 truncate pr-1 sm:pr-2">
                                {category.name}
                            </span>
                            <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                                <div className="w-12 sm:w-14 bg-gray-100 rounded-full h-0.5 sm:h-1">
                                    <div 
                                        className="bg-[#CD5656] h-0.5 sm:h-1 rounded-full transition-all duration-300"
                                        style={{ width: `${category.score}%` }}
                                    />
                                </div>
                                <span className="text-[10px] sm:text-xs font-bold text-gray-900 font-outfit w-6 sm:w-7 text-right">
                                    {Math.round(category.score)}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Improvement Steps */}
            <div className="px-4 sm:px-5 pb-3 sm:pb-4 pt-0.5">
                <h3 className="text-[10px] sm:text-xs font-semibold text-gray-900 font-outfit mb-1 sm:mb-1.5">Next Steps</h3>
                <div className="space-y-1 sm:space-y-1.5">
                    {improvementSteps.slice(0, 3).map((step) => (
                        <div key={step.id} className="flex gap-1.5 sm:gap-2">
                            <div className="flex-shrink-0 pt-0.5">
                                {step.priority === 'high' ? (
                                    <Circle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#CD5656]" fill="#CD5656" />
                                ) : (
                                    <Circle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-300" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-[10px] sm:text-xs font-semibold font-outfit text-gray-900 mb-0.5 leading-tight">
                                    {step.title}
                                </h4>
                                <p className="text-[10px] sm:text-xs text-gray-500 font-outfit leading-tight line-clamp-1">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InternshipReadiness;

