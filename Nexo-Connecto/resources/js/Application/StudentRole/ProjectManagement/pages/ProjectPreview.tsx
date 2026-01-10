import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Code2, Sparkles } from 'lucide-react';
import MiniNavbar from '../../components/MiniNavbar';
import ImagePreviewModal from '../components/ImagePreviewModal';
import ProjectLinks from '../components/ProjectLinks';
import ProjectInsight from '../components/ProjectInsight';
import TechStackRow from '../components/TechStackRow';

export enum ProjectStatus {
    COMPLETED = 'completed',
    BETA = 'beta',
    PROTOTYPE = 'prototype',
    IN_PROGRESS = 'in_progress',
    CONCEPT = 'concept'
}

interface ProjectPreviewProps {
    project: {
        id: number;
        project_detail: {
            project_title: string;
            project_summary: string;
            project_tags: string[];
            project_difficulty: string;
            project_status: ProjectStatus;
            project_answers: Record<string, string>;
            project_learning_answers: Record<string, string>;
            project_tech_stack: { name: string; percentage?: number }[];
        };
        project_visual: {
            images: string[];
            live_demo: string | null;
            github_link: string | null;
        };
        user: {
            name: string;
        };
    };
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project }) => {
    const { project_detail: detail, project_visual: visual } = project;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const questionLabels: Record<string, string> = {
        problem_solving: "What Problems Were You Solving?",
        project_impact: "Why Does This Project Matter?",
        constraints: "Constraints",
        new_skills: "New Skills Gained/Learned",
        concepts_reinforced: "Concepts Reinforced",
        next_steps: "Next Steps & Growth"
    };

    const images = visual.images || [];
    const visibleCount = 3;

    const nextSlide = () => {
        if (currentIndex < images.length - visibleCount) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case ProjectStatus.COMPLETED: return 'bg-green-100 text-green-700 border-green-200';
            case ProjectStatus.BETA: return 'bg-blue-100 text-blue-700 border-blue-200';
            case ProjectStatus.PROTOTYPE: return 'bg-purple-100 text-purple-700 border-purple-200';
            case ProjectStatus.IN_PROGRESS: return 'bg-amber-100 text-amber-700 border-amber-200';
            case ProjectStatus.CONCEPT: return 'bg-gray-100 text-gray-700 border-gray-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getDisplayStatus = (status: string) => {
        if (status === ProjectStatus.IN_PROGRESS) return 'In Progress';
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'easy': return 'text-green-500';
            case 'medium': return 'text-amber-500';
            case 'hard': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAF9] font-outfit pb-20">
            <Head title={`${detail.project_title} - Preview`} />
            <MiniNavbar />

            <main className="max-w-7xl mx-auto px-6 pt-12">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                    <div className="flex-1 space-y-4">
                        <motion.h1 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight"
                        >
                            {detail.project_title}
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-gray-500 leading-relaxed max-w-2xl"
                        >
                            {detail.project_summary}
                        </motion.p>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col items-end gap-4 shrink-0"
                    >
                        <div className="flex flex-wrap justify-end gap-2">
                            {detail.project_tags.map((tag, idx) => (
                                <span 
                                    key={idx}
                                    className="px-3 py-1.5 bg-white border border-[#CD5656]/20 text-[11px] font-bold text-[#CD5656] rounded-full shadow-sm uppercase tracking-wider"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-gray-100 shadow-sm">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Difficulty:</span>
                                <span className={`text-xs font-black uppercase tracking-wider ${getDifficultyColor(detail.project_difficulty)}`}>
                                    {detail.project_difficulty}
                                </span>
                            </div>

                            <div className={`px-4 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest shadow-sm ${getStatusColor(detail.project_status)}`}>
                                {getDisplayStatus(detail.project_status)}
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="relative group mb-12">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={prevSlide}
                            disabled={currentIndex === 0}
                            className={`p-3 rounded-2xl bg-white shadow-lg border border-gray-100 text-gray-400 transition-all hover:text-[#CD5656] disabled:opacity-0 ${currentIndex === 0 ? 'cursor-default' : 'hover:scale-110 active:scale-95'}`}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <div className="flex-1 overflow-hidden py-4">
                            <motion.div 
                                className="flex gap-6"
                                animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                style={{ width: `${(images.length / visibleCount) * 100}%` }}
                            >
                                {images.map((path, idx) => (
                                    <div 
                                        key={idx} 
                                        className="relative aspect-video rounded-[32px] overflow-hidden group/img cursor-pointer shadow-md hover:shadow-xl transition-all duration-500"
                                        style={{ width: `${100 / images.length}%` }}
                                        onClick={() => setSelectedImage(path)}
                                    >
                                        <img 
                                            src={`/storage/${path}`} 
                                            alt={`Project slide ${idx + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 text-white">
                                                <Maximize2 className="w-6 h-6" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        <button 
                            onClick={nextSlide}
                            disabled={currentIndex >= images.length - visibleCount}
                            className={`p-3 rounded-2xl bg-white shadow-lg border border-gray-100 text-gray-400 transition-all hover:text-[#CD5656] disabled:opacity-0 ${currentIndex >= images.length - visibleCount ? 'cursor-default' : 'hover:scale-110 active:scale-95'}`}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex justify-center gap-1.5 mt-6">
                        {Array.from({ length: Math.max(0, images.length - visibleCount + 1) }).map((_, idx) => (
                            <div 
                                key={idx}
                                className={`h-1 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-8 bg-[#CD5656]' : 'w-2 bg-gray-200'}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="mb-16">
                    <ProjectLinks 
                        githubLink={visual.github_link} 
                        liveDemoLink={visual.live_demo} 
                    />
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-8 mb-20"
                >
                    <div className="flex items-center gap-3 px-1 border-b border-gray-100 pb-6">
                        <div className="w-12 h-12 rounded-2xl bg-[#CD5656]/5 flex items-center justify-center">
                            <Code2 className="w-6 h-6 text-[#CD5656]" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Technology Stack</h2>
                            <p className="text-sm text-gray-400 font-medium">The tools and languages used to bring this project to life.</p>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-2">
                        {detail.project_tech_stack.map((tech, idx) => (
                            <TechStackRow key={idx} name={tech.name} percentage={tech.percentage} />
                        ))}
                    </div>
                </motion.div>

                {/* Insights Section - Full Width Questions */}
                <div className="space-y-20">
                    <div className="flex items-center gap-3 px-1">
                        <div className="w-12 h-12 rounded-2xl bg-[#CD5656]/5 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-[#CD5656]" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Project Insights</h2>
                            <p className="text-sm text-gray-400 font-medium">Deep dive into the development process and lessons learned.</p>
                        </div>
                    </div>

                    <div className="space-y-16">
                        {[...Object.entries(detail.project_answers), ...Object.entries(detail.project_learning_answers)].map(([key, answer], idx) => (
                            <ProjectInsight 
                                key={idx}
                                label={questionLabels[key]}
                                answer={answer}
                                index={idx}
                            />
                        ))}
                    </div>
                </div>
            </main>

            <ImagePreviewModal 
                selectedImage={selectedImage} 
                onClose={() => setSelectedImage(null)} 
            />
        </div>
    );
};

export default ProjectPreview;

