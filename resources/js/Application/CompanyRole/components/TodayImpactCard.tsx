import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Bookmark } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function TodayImpactCard() {
    const { state } = useDashboard();
    const { todayImpact } = state;

    const impactItems = [
        {
            icon: TrendingUp,
            label: 'students discovered you',
            value: todayImpact.studentsDiscovered,
            color: '#CD5656',
        },
        {
            icon: Target,
            label: 'new skill matches',
            value: todayImpact.skillMatches,
            color: '#DA6C6C',
        },
        {
            icon: Bookmark,
            label: 'student bookmarked your profile',
            value: todayImpact.bookmarks,
            color: '#AF3E3E',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md font-outfit"
            style={{
                background: 'linear-gradient(135deg, rgba(205, 86, 86, 0.05) 0%, rgba(218, 108, 108, 0.02) 100%)',
                border: '1px solid rgba(205, 86, 86, 0.1)',
            }}
        >
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5" style={{ color: '#CD5656' }} />
                <h3 
                    className="text-lg font-semibold"
                    style={{ color: '#2A2A2A' }}
                >
                    Today's Impact
                </h3>
            </div>
            
            <div className="space-y-3">
                {impactItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center gap-3"
                        >
                            <div 
                                className="flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0"
                                style={{ backgroundColor: `${item.color}15` }}
                            >
                                <Icon className="w-4 h-4" style={{ color: item.color }} />
                            </div>
                            <div className="flex items-baseline gap-2 flex-1">
                                <span 
                                    className="text-xl font-bold"
                                    style={{ color: item.color }}
                                >
                                    {item.value}
                                </span>
                                <span 
                                    className="text-sm"
                                    style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                                >
                                    {item.label}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}

