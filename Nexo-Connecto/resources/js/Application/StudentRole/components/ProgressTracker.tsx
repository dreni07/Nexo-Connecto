import React from 'react';
import { CheckCircle2, Circle, FileText } from 'lucide-react';

interface ProgressStep {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

interface ProgressTrackerProps {
    steps?: ProgressStep[];
}

const mockSteps: ProgressStep[] = [
    {
        id: '1',
        title: 'Complete Your Profile',
        description: 'Add your skills, education, and work experience',
        completed: true,
    },
    {
        id: '2',
        title: 'Upload Your CV',
        description: 'Make sure your CV is up-to-date and professional',
        completed: true,
    },
    {
        id: '3',
        title: 'Add Your Projects',
        description: 'Showcase your work with at least 3 projects',
        completed: false,
    },
    {
        id: '4',
        title: 'Connect Your GitHub',
        description: 'Link your GitHub profile to show your code',
        completed: false,
    },
    {
        id: '5',
        title: 'Apply to 5 Internships',
        description: 'Start applying to internships that match your skills',
        completed: false,
    },
];

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ steps = mockSteps }) => {
    const completedCount = steps.filter(s => s.completed).length;
    const totalSteps = steps.length;
    const progressPercentage = (completedCount / totalSteps) * 100;

    return (
        <div 
            className="rounded-2xl p-6 transition-all duration-300 font-outfit h-full"
            style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 12px -1px rgba(0, 0, 0, 0.12), 0 4px 6px -1px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
        >
            <div className="flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5" style={{ color: '#CD5656' }} />
                <h3 
                    className="text-lg font-semibold"
                    style={{ color: '#2A2A2A' }}
                >
                    Progress Tracker
                </h3>
            </div>

            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span 
                        className="text-sm font-medium"
                        style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                    >
                        {completedCount} of {totalSteps} completed
                    </span>
                    <span 
                        className="text-lg font-bold"
                        style={{ color: '#CD5656' }}
                    >
                        {Math.round(progressPercentage)}%
                    </span>
                </div>
                <div className="w-full h-3 rounded-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                    <div
                        className="h-3 rounded-full transition-all"
                        style={{
                            width: `${progressPercentage}%`,
                            backgroundColor: '#CD5656',
                        }}
                    />
                </div>
            </div>

            <div className="space-y-4">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-3">
                        <div className="mt-0.5">
                            {step.completed ? (
                                <CheckCircle2 className="w-5 h-5" style={{ color: '#CD5656' }} />
                            ) : (
                                <Circle className="w-5 h-5" style={{ color: 'rgba(0, 0, 0, 0.3)' }} />
                            )}
                        </div>
                        <div className="flex-1">
                            <div 
                                className={`font-semibold text-sm mb-1 ${step.completed ? '' : 'opacity-70'}`}
                                style={{ color: '#2A2A2A' }}
                            >
                                {step.title}
                            </div>
                            <div 
                                className="text-xs"
                                style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                            >
                                {step.description}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgressTracker;

