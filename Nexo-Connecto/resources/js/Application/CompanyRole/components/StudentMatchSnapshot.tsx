import React from 'react';
import { motion } from 'framer-motion';
import { Users, Bookmark, Sparkles } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function StudentMatchSnapshot() {
    const { state } = useDashboard();
    const { studentMatches } = state;

    const matchItems = [
        {
            icon: Users,
            label: 'highly match your company',
            value: studentMatches.highlyMatched,
            color: '#CD5656',
        },
        {
            icon: Bookmark,
            label: 'bookmarked your company',
            value: studentMatches.bookmarked,
            color: '#DA6C6C',
        },
        {
            icon: Sparkles,
            label: 'new recommended students today',
            value: studentMatches.newRecommended,
            color: '#AF3E3E',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md font-outfit"
            style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.06)',
            }}
        >
            <h3 
                className="text-lg font-semibold mb-4"
                style={{ color: '#2A2A2A' }}
            >
                Student Matches (Preview)
            </h3>
            
            <div className="space-y-4">
                {matchItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center gap-3"
                        >
                            <div 
                                className="flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0"
                                style={{ backgroundColor: `${item.color}15` }}
                            >
                                <Icon className="w-5 h-5" style={{ color: item.color }} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-baseline gap-2">
                                    <span 
                                        className="text-2xl font-bold"
                                        style={{ color: item.color }}
                                    >
                                        {item.value}
                                    </span>
                                    <span 
                                        className="text-sm"
                                        style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                                    >
                                        students {item.label}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}

