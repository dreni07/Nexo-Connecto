import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { AnimatePresence } from 'framer-motion';
import MiniNavbar from '../../components/MiniNavbar';
import ProjectProgressBar from '../components/ProjectProgressBar';
import Step1GeneralInfo from '../components/Step1GeneralInfo';
import Step2VisualsAndLinks from '../components/Step2VisualsAndLinks';
import Step3Insights from '../components/Step3Insights';
import Step4Growth from '../components/Step4Growth';
import { createProject } from '../requests';

const CreateProject = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const steps = [
        Step1GeneralInfo,
        Step2VisualsAndLinks,
        Step3Insights,
        Step4Growth
    ];
    const totalSteps = steps.length;

    const [projectData, setProjectData] = useState({
        title: '',
        summary: '',
        tags: [] as string[],
        difficulty: 'medium',
        status: 'in_progress',
        images: [] as File[],
        liveDemoUrl: '',
        githubUrl: '',
        techStack: [] as { name: string; percentage?: number }[],
        fixedQuestions: {} as Record<string, string>,
        learningQuestions: {} as Record<string, string>
    });

    const calculateProgress = () => {
        const checks = [
            projectData.title.trim().length > 0,
            projectData.summary.trim().length > 0,
            projectData.tags.length > 0,
            !!projectData.difficulty,
            !!projectData.status,
            projectData.images.length > 0,
            projectData.liveDemoUrl.trim().length > 0,
            projectData.githubUrl.trim().length > 0,
            projectData.techStack.length > 0,
            Object.keys(projectData.fixedQuestions).length > 0,
            Object.keys(projectData.learningQuestions).length > 0,
        ];

        const completedFields = checks.filter(Boolean).length;
        return (completedFields / checks.length) * 100;
    };

    const handleDataChange = (field: string, value: any) => {
        setProjectData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const nextStep = () => {
        if (currentStep === totalSteps) {
            setIsLoading(true);
            createProject(
                projectData,
                () => {
                    // Success logic - redirect handled by backend
                    setIsLoading(false);
                    console.log('Project created successfully!');
                },
                () => {
                    // Error logic
                    setIsLoading(false);
                    console.error('Failed to create project.');
                }
            );
            return;
        }
        setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    };

    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const CurrentStepComponent = steps[currentStep - 1];

    return (
        <div className="min-h-screen bg-[#FAFAF9] font-outfit">
            <Head title="Post New Project" />
            
            <MiniNavbar />

            <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                <ProjectProgressBar progress={calculateProgress()} />

                <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100/50">
                    <AnimatePresence mode="wait">
                        <CurrentStepComponent 
                            key={`step-${currentStep}`}
                            data={projectData}
                            onDataChange={handleDataChange}
                            onNext={nextStep}
                            {...(currentStep === totalSteps ? { loading: isLoading } : {})}
                            {...(currentStep > 1 ? { onBack: prevStep } : {})}
                        />
                    </AnimatePresence>
                </div>

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
