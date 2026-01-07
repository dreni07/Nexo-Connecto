import React, { useState } from 'react';
import { CheckCircle2, Circle, FileText, ArrowRight } from 'lucide-react';
import { Components } from './ProgressTrackerActions';
import { motion, AnimatePresence } from 'framer-motion';

interface ProgressStep {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

interface ProfileCompletion {
    non_empty_fields: string[];
    empty_fields: string[];
}

interface ProgressTrackerProps {
    profile_completion?: ProfileCompletion;
}

const fieldMetadata: Record<string, { title: string; description: string }> = {
    specific_major: { title: 'Specific Major', description: 'Choose your specific major of study' },
    degree_level: { title: 'Degree Level', description: 'Specify your current degree level' },
    gpa: { title: 'GPA', description: 'Enter your grade point average' },
    academic_year: { title: 'Academic Year', description: 'Specify your current year of study' },
    technical_skills: { title: 'Technical Skills', description: 'List your technical expertise' },
    languages: { title: 'Languages', description: 'Add languages you are proficient in' },
    work_preference: { title: 'Work Preference', description: 'Set your preferred work type' },
    social_media: { title: 'Social Media', description: 'Link your professional social profiles' },
    industries_preferences: { title: 'Industries Preferences', description: 'Choose industries you are interested in' },
    career_goals: { title: 'Career Goals', description: 'Describe your professional aspirations' },
    student_answers: { title: 'Student Quiz', description: 'Complete the student assessment' },
};

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ profile_completion }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const steps: ProgressStep[] = [
        ...(profile_completion?.non_empty_fields || []).map((field) => ({
            id: field,
            title: fieldMetadata[field]?.title || field,
            description: fieldMetadata[field]?.description || '',
            completed: true,
        })),
        ...(profile_completion?.empty_fields || []).map((field) => ({
            id: field,
            title: fieldMetadata[field]?.title || field,
            description: fieldMetadata[field]?.description || '',
            completed: false,
        })),
    ];

    const completedCount = profile_completion?.non_empty_fields?.length || 0;
    const totalSteps = steps.length;
    const progressPercentage = totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0;

    return (
        <div 
            className="rounded-2xl p-4 sm:p-6 transition-all duration-300 font-outfit h-full relative"
            style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#CD5656]" />
                    <h3 className="text-lg font-semibold text-[#2A2A2A]">Progress Tracker</h3>
                </div>
                {activeIndex !== null && (
                    <button 
                        onClick={() => setActiveIndex(null)}
                        className="text-xs font-medium text-gray-500 hover:text-[#CD5656] transition-colors flex items-center gap-1"
                    >
                        Back to list <ArrowRight className="w-3 h-3 rotate-180" />
                    </button>
                )}
            </div>

            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-400">
                        {completedCount} of {totalSteps} completed
                    </span>
                    <span className="text-lg font-bold text-[#CD5656]">
                        {Math.round(progressPercentage)}%
                    </span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-100">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        className="h-2 rounded-full bg-[#CD5656]"
                    />
                </div>
            </div>

            <div className="relative overflow-hidden min-h-[320px]">
                <AnimatePresence mode="wait">
                    {activeIndex === null ? (
                        <motion.div
                            key="list"
                            initial={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="space-y-4 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar"
                        >
                            {steps.map((step, index) => (
                                <div key={step.id} className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors group">
                                    <div className="mt-1">
                                        {step.completed ? (
                                            <CheckCircle2 className="w-5 h-5 text-[#CD5656]" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-gray-300" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={`font-semibold text-sm ${step.completed ? 'text-gray-800' : 'text-gray-400'}`}>
                                            {step.title}
                                        </div>
                                        <div className="text-xs text-gray-400 truncate">{step.description}</div>
                                    </div>
                                    {!step.completed && (
                                        <button 
                                            onClick={() => setActiveIndex(index)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 bg-[#CD5656] text-white text-[10px] font-bold rounded-lg uppercase tracking-wider"
                                        >
                                            Complete
                                        </button>
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="component"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            className="h-full flex items-center justify-center"
                        >
                            <div className="w-full">
                                {Components[activeIndex]}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.05); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(205, 86, 86, 0.3); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(205, 86, 86, 0.5); }
            `}} />
        </div>
    );
};

export default ProgressTracker;
