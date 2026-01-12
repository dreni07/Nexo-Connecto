import React from 'react';
import { motion } from 'framer-motion';

interface TechStackRowProps {
    name: string;
    percentage?: number;
}

const TechStackRow: React.FC<TechStackRowProps> = ({ name, percentage }) => (
    <div className="group space-y-2 py-4 border-b border-gray-100 last:border-0">
        <div className="flex justify-between items-center px-1">
            <span className="text-base font-bold text-gray-700 group-hover:text-[#CD5656] transition-colors">{name}</span>
            {percentage !== undefined && (
                <span className="text-sm font-black text-[#CD5656]">{percentage}%</span>
            )}
        </div>
        {percentage !== undefined && (
            <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-[#CD5656] shadow-sm"
                />
            </div>
        )}
    </div>
);

export default TechStackRow;


