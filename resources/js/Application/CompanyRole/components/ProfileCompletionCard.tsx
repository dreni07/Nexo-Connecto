import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { Link } from '@inertiajs/react';

export default function ProfileCompletionCard() {
    const { state } = useDashboard();
    const { profileCompletion } = state;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md font-outfit"
            style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.06)',
            }}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" style={{ color: '#CD5656' }} />
                    <h3 
                        className="text-lg font-semibold"
                        style={{ color: '#2A2A2A' }}
                    >
                        Profile Completion
                    </h3>
                </div>
                <Link
                    href="/company/profile"
                    className="flex items-center gap-1 text-sm font-medium transition-colors hover:opacity-80"
                    style={{ color: '#CD5656' }}
                >
                    Complete
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="mb-2">
                <div className="flex items-center justify-between text-sm mb-2">
                    <span style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                        {profileCompletion}% Complete
                    </span>
                    <span style={{ color: 'rgba(0, 0, 0, 0.4)' }}>
                        {100 - profileCompletion}% remaining
                    </span>
                </div>
                <div 
                    className="h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.08)' }}
                >
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${profileCompletion}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: '#CD5656' }}
                    />
                </div>
            </div>

            <p 
                className="text-xs mt-3"
                style={{ color: 'rgba(0, 0, 0, 0.5)' }}
            >
                Complete your profile to attract more students
            </p>
        </motion.div>
    );
}

