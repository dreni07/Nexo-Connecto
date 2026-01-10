import React from 'react';
import { motion } from 'framer-motion';

interface ProjectInsightProps {
    label: string;
    answer: string;
    index: number;
}

const ProjectInsight: React.FC<ProjectInsightProps> = ({ label, answer, index }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
        >
            <div className="max-w-4xl">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-2 h-8 bg-[#CD5656] rounded-full group-hover:scale-y-110 transition-transform duration-300" />
                    <h3 className="text-2xl font-extrabold text-gray-800 tracking-tight">
                        {label}
                    </h3>
                </div>
                <div className="relative pl-6">
                    <p className="text-xl text-gray-600 leading-relaxed font-medium italic">
                        &quot;{answer}&quot;
                    </p>
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-100 rounded-full" />
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectInsight;

