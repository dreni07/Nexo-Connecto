import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useDashboard } from '../context/DashboardContext';

export default function EmptyState() {
    const { state } = useDashboard();
    
    const hasNoActivity = 
        state.recentActivity.profileViews === 0 &&
        state.recentActivity.studentsApproached === 0 &&
        state.liveMatchScore === 0;

    if (!hasNoActivity) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-8 text-center font-outfit"
            style={{
                backgroundColor: '#FFFFFF',
                border: '2px dashed rgba(205, 86, 86, 0.2)',
            }}
        >
            <motion.div
                animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 2
                }}
                className="flex justify-center mb-4"
            >
                <div 
                    className="flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ backgroundColor: 'rgba(205, 86, 86, 0.1)' }}
                >
                    <Sparkles className="w-8 h-8" style={{ color: '#CD5656' }} />
                </div>
            </motion.div>
            
            <h3 
                className="text-xl font-semibold mb-2"
                style={{ color: '#2A2A2A' }}
            >
                Your dashboard will come alive soon!
            </h3>
            <p 
                className="text-sm mb-6 max-w-md mx-auto"
                style={{ color: 'rgba(0, 0, 0, 0.6)' }}
            >
                Complete your profile to start attracting students. Once you're set up, students will start discovering you and your dashboard will show real-time activity!
            </p>
            
            <Link
                href="/company/profile"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                style={{ backgroundColor: '#CD5656' }}
            >
                Complete Your Profile
                <ArrowRight className="w-4 h-4" />
            </Link>
        </motion.div>
    );
}

