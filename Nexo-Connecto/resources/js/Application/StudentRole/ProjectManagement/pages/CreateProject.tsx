import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { AnimatePresence } from 'framer-motion';
import MiniNavbar from '../../components/MiniNavbar';
import ProjectProgressBar from '../components/ProjectProgressBar';
import Step1GeneralInfo from '../components/Step1GeneralInfo';
import Step2VisualsAndLinks from '../components/Step2VisualsAndLinks';
import Step3Insights from '../components/Step3Insights';

const CreateProject = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4; // We'll adjust this as we add more steps

    const [projectData, setProjectData] = useState({
        title: '',
        summary: '',
        tags: [] as string[],
        difficulty: 'medium',
        status: 'In Progress',
        images: [] as File[],
        liveDemoUrl: '',
        githubUrl: '',
        techStack: [] as { name: string; percentage?: number }[],
        fixedQuestions: {} as Record<string, string>,
        lessonsLearned: ''
    });

    const calculateProgress = () => {
        let completedFields = 0;
        const totalFields = 11;

        if (projectData.title.trim()) completedFields++;
        if (projectData.summary.trim()) completedFields++;
        if (projectData.tags.length > 0) completedFields++;
        if (projectData.difficulty) completedFields++;
        if (projectData.status) completedFields++;
        if (projectData.images.length > 0) completedFields++;
        if (projectData.liveDemoUrl.trim()) completedFields++;
        if (projectData.githubUrl.trim()) completedFields++;
        if (projectData.techStack.length > 0) completedFields++;
        if (Object.keys(projectData.fixedQuestions).length > 0) completedFields++;
        if (projectData.lessonsLearned.trim()) completedFields++;

        return (completedFields / totalFields) * 100;
    };

    const handleDataChange = (field: string, value: any) => {
        setProjectData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    return (
        <div className="min-h-screen bg-[#FAFAF9] font-outfit">
            <Head title="Post New Project" />
            
            <MiniNavbar />

            <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                <ProjectProgressBar progress={calculateProgress()} />

                <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100/50">
                    <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                            <Step1GeneralInfo 
                                key="general-info"
                                data={projectData}
                                onDataChange={handleDataChange}
                                onNext={nextStep}
                            />
                        )}

                        {currentStep === 2 && (
                            <Step2VisualsAndLinks 
                                key="visuals-links"
                                data={projectData}
                                onDataChange={handleDataChange}
                                onNext={nextStep}
                                onBack={prevStep}
                            />
                        )}

                        {currentStep === 3 && (
                            <Step3Insights 
                                key="insights"
                                data={projectData}
                                onDataChange={handleDataChange}
                                onNext={nextStep}
                                onBack={prevStep}
                            />
                        )}
                        
                        {/* Placeholder for future sections */}
                        {currentStep > 3 && (
                            <div className="py-20 text-center">
                                <p className="text-gray-400 italic">Coming soon: Section {currentStep}</p>
                                <button 
                                    onClick={prevStep}
                                    className="mt-4 text-[#CD5656] font-bold hover:underline"
                                >
                                    Go Back
                                </button>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Tip */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
                        Your project will be visible to potential employers and other students.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default CreateProject;

