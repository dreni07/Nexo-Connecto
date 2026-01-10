import React from 'react';
import { motion } from 'framer-motion';

interface ProjectProgressBarProps {
    progress: number;
}

const ProjectProgressBar: React.FC<ProjectProgressBarProps> = ({ progress }) => {
    return (
        <div className="w-full mb-12">
            <div className="flex justify-between items-end mb-3 font-outfit">
                <div>
                    <span className="text-xs font-bold text-[#CD5656] uppercase tracking-widest">Project Creation</span>
                </div>
                <div className="text-right">
                    <span className="text-3xl font-black text-[#CD5656]">{Math.round(progress)}%</span>
                </div>
            </div>
            
            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200/50">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#CD5656] to-[#E88B8B] rounded-full shadow-lg"
                />
            </div>
        </div>
    );
};

export default ProjectProgressBar;

