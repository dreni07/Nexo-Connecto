import React, { useState } from 'react';
import { Folder, MapPin, Clock, ChevronDown, ChevronUp, DollarSign } from 'lucide-react';

interface Project {
    id: string;
    title: string;
    status: 'Paid' | 'Not Paid';
    rate: string;
    tags: string[];
    description: string;
    location: string;
    timeAgo: string;
    iconColor: string;
}

interface YourProjectsProps {
    projects?: Project[];
}

const mockProjects: Project[] = [
    {
        id: '1',
        title: 'Web Development Project',
        status: 'Paid',
        rate: '$10/hour',
        tags: ['Remote', 'Part-time'],
        description: 'This project involves implementing both frontend and backend functionalities, as well as integrating with third-party APIs.',
        location: 'Germany',
        timeAgo: '2h ago',
        iconColor: '#CD5656',
    },
    {
        id: '2',
        title: 'Copyright Project',
        status: 'Not Paid',
        rate: '$10/hour',
        tags: [],
        description: '',
        location: '',
        timeAgo: '',
        iconColor: '#2A2A2A',
    },
    {
        id: '3',
        title: 'Web Design Project',
        status: 'Paid',
        rate: '$10/hour',
        tags: [],
        description: '',
        location: '',
        timeAgo: '',
        iconColor: '#CD5656',
    },
];

const YourProjects: React.FC<YourProjectsProps> = ({ projects = mockProjects }) => {
    const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set(['1']));

    const toggleProject = (id: string) => {
        const newExpanded = new Set(expandedProjects);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedProjects(newExpanded);
    };

    return (
        <div 
            className="rounded-2xl p-6 transition-all duration-300 font-outfit h-full"
            style={{
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
            }}
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Folder className="w-5 h-5" style={{ color: '#CD5656' }} />
                    <h3 
                        className="text-lg font-semibold"
                        style={{ color: '#2A2A2A' }}
                    >
                        Your Recent Projects
                    </h3>
                </div>
                <button 
                    className="text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer"
                    style={{ color: '#CD5656' }}
                >
                    See all Project
                </button>
            </div>

            <div className="space-y-4">
                {projects.map((project) => {
                    const isExpanded = expandedProjects.has(project.id);
                    return (
                        <div
                            key={project.id}
                            className="rounded-xl border overflow-hidden"
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                borderColor: 'rgba(0, 0, 0, 0.06)',
                            }}
                        >
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div 
                                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                                            style={{ backgroundColor: project.iconColor }}
                                        >
                                            <Folder className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div 
                                                className="font-semibold text-sm mb-2"
                                                style={{ color: '#2A2A2A' }}
                                            >
                                                {project.title}
                                            </div>
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <span
                                                    className="px-2 py-1 rounded-md text-xs font-medium"
                                                    style={{
                                                        backgroundColor: project.status === 'Paid' 
                                                            ? 'rgba(205, 86, 86, 0.1)' 
                                                            : 'rgba(0, 0, 0, 0.1)',
                                                        color: project.status === 'Paid' 
                                                            ? '#CD5656' 
                                                            : '#2A2A2A',
                                                    }}
                                                >
                                                    {project.status}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <DollarSign className="w-3 h-3" style={{ color: 'rgba(0, 0, 0, 0.5)' }} />
                                                    <span 
                                                        className="text-xs font-medium"
                                                        style={{ color: 'rgba(0, 0, 0, 0.7)' }}
                                                    >
                                                        {project.rate}
                                                    </span>
                                                </div>
                                                {project.tags.map((tag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 rounded-md text-xs"
                                                        style={{
                                                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                                            color: 'rgba(0, 0, 0, 0.6)',
                                                        }}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleProject(project.id)}
                                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors ml-2 cursor-pointer"
                                        style={{ color: 'rgba(0, 0, 0, 0.5)' }}
                                    >
                                        {isExpanded ? (
                                            <ChevronUp className="w-4 h-4" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>

                                {isExpanded && project.description && (
                                    <div className="mt-3 pt-3 border-t" style={{ borderColor: 'rgba(0, 0, 0, 0.06)' }}>
                                        <p 
                                            className="text-xs mb-3"
                                            style={{ color: 'rgba(0, 0, 0, 0.7)' }}
                                        >
                                            {project.description}
                                        </p>
                                        {project.location && (
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-3 h-3" style={{ color: 'rgba(0, 0, 0, 0.4)' }} />
                                                <span 
                                                    className="text-xs"
                                                    style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                                                >
                                                    {project.location}
                                                </span>
                                                {project.timeAgo && (
                                                    <>
                                                        <span style={{ color: 'rgba(0, 0, 0, 0.3)' }}>•</span>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" style={{ color: 'rgba(0, 0, 0, 0.4)' }} />
                                                            <span 
                                                                className="text-xs"
                                                                style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                                                            >
                                                                {project.timeAgo}
                                                            </span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default YourProjects;

