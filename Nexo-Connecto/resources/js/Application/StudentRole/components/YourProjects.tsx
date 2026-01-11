import React, { useState } from 'react';
import { Folder, MapPin, Clock, ChevronDown, ChevronUp, DollarSign, ExternalLink } from 'lucide-react';
import { router } from '@inertiajs/react';

interface Project {
    id: number;
    project_detail: {
        project_title: string;
        project_summary: string;
        project_tags: string[];
        project_difficulty: string;
        project_status: string;
    };
    project_visual: {
        images: string[];
        live_demo: string | null;
        github_link: string | null;
    };
    created_at: string;
}

interface YourProjectsProps {
    projects: Project[];
}

const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
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

const YourProjects: React.FC<YourProjectsProps> = ({ projects }) => {
    const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());

    const toggleProject = (id: number) => {
        const newExpanded = new Set(expandedProjects);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedProjects(newExpanded);
    };

    const handleViewProject = (id: number) => {
        router.visit(`/student/project/${id}`);
    };

    return (
        <div 
            className="rounded-2xl p-4 sm:p-6 transition-all duration-300 font-outfit h-full bg-white"
            style={{
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            }}
        >
            <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#CD5656' }} />
                    <h3 
                        className="text-base sm:text-lg font-semibold"
                        style={{ color: '#2A2A2A' }}
                    >
                        Your Recent Projects
                    </h3>
                </div>
                <button 
                    className="text-xs sm:text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer"
                    style={{ color: '#CD5656' }}
                >
                    See all Projects
                </button>
            </div>

            <div className="space-y-4">
                {projects.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 italic">
                        No projects created yet.
                    </div>
                ) : (
                    projects.map((project) => {
                        const isExpanded = expandedProjects.has(project.id);
                        const detail = project.project_detail;
                        
                        return (
                            <div
                                key={project.id}
                                className="rounded-xl border overflow-hidden transition-all hover:border-[#CD5656]/30"
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                    borderColor: 'rgba(0, 0, 0, 0.06)',
                                }}
                            >
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3 flex-1">
                                            <div 
                                                className="w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                                                style={{ backgroundColor: '#CD5656' }}
                                                onClick={() => handleViewProject(project.id)}
                                            >
                                                <Folder className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <div 
                                                    className="font-semibold text-sm mb-2 cursor-pointer hover:text-[#CD5656] transition-colors inline-block"
                                                    style={{ color: '#2A2A2A' }}
                                                    onClick={() => handleViewProject(project.id)}
                                                >
                                                    {detail.project_title}
                                                </div>
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    <span
                                                        className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                                                        style={{
                                                            backgroundColor: 'rgba(205, 86, 86, 0.1)',
                                                            color: '#CD5656',
                                                        }}
                                                    >
                                                        {getStatusDisplay(detail.project_status)}
                                                    </span>
                                                    
                                                    {detail.project_tags.slice(0, 2).map((tag, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-2 py-1 rounded-md text-[10px] font-medium bg-white border border-gray-100 text-gray-500"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleViewProject(project.id)}
                                                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer text-gray-400 hover:text-[#CD5656]"
                                                title="View Project"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => toggleProject(project.id)}
                                                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer text-gray-400"
                                            >
                                                {isExpanded ? (
                                                    <ChevronUp className="w-4 h-4" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div className="mt-3 pt-3 border-t" style={{ borderColor: 'rgba(0, 0, 0, 0.06)' }}>
                                            <p className="text-xs mb-3 text-gray-500 leading-relaxed">
                                                {detail.project_summary}
                                            </p>
                                            <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{formatTimeAgo(project.created_at)}</span>
                                                </div>
                                                <span>•</span>
                                                <span className={
                                                    detail.project_difficulty === 'hard' ? 'text-red-400' :
                                                    detail.project_difficulty === 'medium' ? 'text-amber-400' : 'text-green-400'
                                                }>
                                                    {detail.project_difficulty}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default YourProjects;
