import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import StudentNavBar from '../../components/StudentNavBar';
import StudentLayout from '@/layouts/student-layout';
import { StudentDashboardContext } from '../../pages/Index';
import { Trash2, Edit3, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomModal from '@/components/Modal';
import { deleteProject } from '../requests';

enum ProjectDifficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}

enum ProjectStatus {
    COMPLETED = 'completed',
    BETA = 'beta',
    PROTOTYPE = 'prototype',
    IN_PROGRESS = 'in_progress',
    CONCEPT = 'concept'
}

interface ProjectDetail {
    project_title: string;
    project_summary: string;
    project_tags: string[];
    project_difficulty: ProjectDifficulty;
    project_status: ProjectStatus;
    project_answers: Record<string, string>;
    project_tech_stack: { name: string; percentage?: number }[];
    project_learning_answers: Record<string, string>;
}

interface ProjectVisual {
    images: string[];
    live_demo: string;
    github_link: string;
    created_at: string;
}

interface Project {
    id: number;
    project_detail: ProjectDetail;
    project_visual: ProjectVisual;
    created_at: string;
}

interface AllProjectsProps {
    projects: Project[];
    user_details: any;
}

const ProjectImageSlider = ({ images }: { images: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-2xl">
                <span className="text-gray-400 text-sm">No images available</span>
            </div>
        );
    }

    const nextSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-full h-48 group overflow-hidden rounded-2xl shadow-sm border border-gray-100">
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={`/storage/${images[currentIndex]}`}
                    alt={`Project ${currentIndex + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                />
            </AnimatePresence>

            {images.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-gray-700"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-gray-700"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {images.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1 rounded-full transition-all ${currentIndex === idx ? 'w-4 bg-[#CD5656]' : 'w-1 bg-white/60'
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const AllProjects = ({ projects, user_details }: AllProjectsProps) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState<number | null>(null);

    const handleDeleteClick = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setProjectToDelete(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (projectToDelete) {
            deleteProject(projectToDelete, () => {
                setDeleteModalOpen(false);
                setProjectToDelete(null);
            });
        }
    };

    const handleProjectClick = (id: number) => {
        router.visit(`/student/project/${id}`);
    };

    const getStatusDisplay = (status: string) => {
        switch (status) {
            case 'in_progress': return 'In Progress';
            case 'concept': return 'Concept';
            case 'prototype': return 'Prototype';
            case 'beta': return 'Beta';
            case 'completed': return 'Completed';
            default: return status;
        }
    };

    return (
        <StudentLayout>
            <StudentDashboardContext.Provider value={user_details}>
                <Head title="My Projects" />
                <div className="min-h-screen bg-[#FDFCFB] font-outfit">
                    <StudentNavBar />

                    <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                        <header className="mb-12">
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
                                Your Projects
                            </h1>
                            <p className="text-lg text-gray-500 max-w-2xl font-medium">
                                Manage and showcase your professional projects on Nexo Connecto.
                            </p>
                        </header>

                        {projects.length === 0 ? (
                            <div className="bg-white rounded-[32px] p-16 text-center border border-dashed border-gray-200">
                                <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <Edit3 className="w-10 h-10 text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No projects yet</h3>
                                <p className="text-gray-500 mb-8">You haven't posted any projects to your portfolio.</p>
                                <button
                                    onClick={() => router.visit('/student/create-project')}
                                    className="px-8 py-3 bg-[#CD5656] text-white font-bold rounded-2xl hover:bg-[#b44b4b] transition-all shadow-lg shadow-[#CD5656]/20 active:scale-95"
                                >
                                    Post New Project
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {projects.map((project) => (
                                    <motion.div
                                        layout
                                        key={project.id}
                                        onClick={() => handleProjectClick(project.id)}
                                        className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
                                    >
                                        <div className="p-3">
                                            <ProjectImageSlider images={project.project_visual?.images || []} />
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-xl font-black text-gray-900 truncate mb-1 group-hover:text-[#CD5656] transition-colors">
                                                        {project.project_detail.project_title}
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        <span className="px-2.5 py-1 bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-500 rounded-lg border border-gray-100">
                                                            {getStatusDisplay(project.project_detail.project_status)}
                                                        </span>
                                                        <span className={`text-[10px] font-black uppercase tracking-widest ${project.project_detail.project_difficulty === 'hard' ? 'text-red-500' :
                                                            project.project_detail.project_difficulty === 'medium' ? 'text-amber-500' : 'text-green-500'
                                                            }`}>
                                                            {project.project_detail.project_difficulty}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed">
                                                {project.project_detail.project_summary}
                                            </p>

                                            <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); /* Update non-functional */ }}
                                                        className="p-2.5 bg-gray-50 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                                                        title="Update Project"
                                                    >
                                                        <Edit3 className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => handleDeleteClick(e, project.id)}
                                                        className="p-2.5 bg-gray-50 text-gray-400 hover:text-[#CD5656] hover:bg-red-50 rounded-xl transition-all"
                                                        title="Delete Project"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                                <button
                                                    className="flex items-center gap-2 text-sm font-black text-[#CD5656] uppercase tracking-widest group/btn"
                                                >
                                                    View Details
                                                    <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </main>

                    <CustomModal
                        isOpen={deleteModalOpen}
                        onClose={() => setDeleteModalOpen(false)}
                        title="Delete Project"
                        maxWidth="500px"
                    >
                        <div className="text-center p-4">
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Trash2 className="w-10 h-10 text-[#CD5656]" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-4">Are you sure?</h3>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                This action <span className="text-[#CD5656] font-bold">cannot be undone</span>. 
                                Are you sure you want to permanently delete this project from your profile?
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => setDeleteModalOpen(false)}
                                    className="flex-1 px-8 py-3 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 px-8 py-3 bg-[#CD5656] text-white font-bold rounded-2xl hover:bg-[#b44b4b] transition-all shadow-lg shadow-[#CD5656]/20 active:scale-95"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </CustomModal>
                </div>
            </StudentDashboardContext.Provider>
        </StudentLayout>
    );
};

export default AllProjects;
