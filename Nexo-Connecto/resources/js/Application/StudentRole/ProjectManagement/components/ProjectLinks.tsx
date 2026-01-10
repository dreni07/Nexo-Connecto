import React from 'react';
import { motion } from 'framer-motion';
import { Github, Globe } from 'lucide-react';

interface ProjectLinksProps {
    githubLink: string | null;
    liveDemoLink: string | null;
}

const ProjectLinks: React.FC<ProjectLinksProps> = ({ githubLink, liveDemoLink }) => {
    if (!githubLink && !liveDemoLink) return null;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-6 items-center pt-8 border-t border-gray-100"
        >
            {githubLink && (
                <a 
                    href={githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
                >
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-[#CD5656]/5 transition-colors">
                        <Github className="w-5 h-5 text-gray-400 group-hover:text-[#CD5656]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Source Code</span>
                        <span className="text-sm font-bold text-gray-700">View on GitHub</span>
                    </div>
                </a>
            )}

            {liveDemoLink && (
                <a 
                    href={liveDemoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
                >
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-[#CD5656]/5 transition-colors">
                        <Globe className="w-5 h-5 text-gray-400 group-hover:text-[#CD5656]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Preview</span>
                        <span className="text-sm font-bold text-gray-700">Explore Project</span>
                    </div>
                </a>
            )}
        </motion.div>
    );
};

export default ProjectLinks;

