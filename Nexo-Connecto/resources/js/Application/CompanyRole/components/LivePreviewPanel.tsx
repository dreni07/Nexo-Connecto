import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Eye, UserPlus, Sparkles } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

interface LiveActivity {
    id: string;
    type: 'match' | 'view' | 'approach' | 'update';
    message: string;
    timestamp: Date;
}

export default function LivePreviewPanel() {
    const { state, updateLiveMatchScore } = useDashboard();
    const [activities, setActivities] = useState<LiveActivity[]>([]);

    useEffect(() => {
        // Simulate live updates
        const interval = setInterval(() => {
            const newActivity: LiveActivity = {
                id: Date.now().toString(),
                type: ['view', 'approach', 'update'][Math.floor(Math.random() * 3)] as LiveActivity['type'],
                message: generateActivityMessage(),
                timestamp: new Date(),
            };
            
            setActivities((prev) => [newActivity, ...prev].slice(0, 5));
            
            // Update match score randomly
            const newScore = Math.max(60, Math.min(95, state.liveMatchScore + (Math.random() > 0.5 ? 1 : -1)));
            updateLiveMatchScore(newScore);
        }, 8000);

        return () => clearInterval(interval);
    }, [state.liveMatchScore, updateLiveMatchScore]);

    const generateActivityMessage = (): string => {
        const messages = [
            'A student viewed your profile',
            '2 students approached your profile',
            'Recommended students updated',
            'New match found',
            'Profile engagement increased',
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    };

    const getActivityIcon = (type: LiveActivity['type']) => {
        switch (type) {
            case 'view':
                return Eye;
            case 'approach':
                return UserPlus;
            case 'update':
                return Sparkles;
            default:
                return TrendingUp;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl p-6 shadow-sm font-outfit"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
            }}
        >
            <div className="mb-6">
                <h3 
                    className="text-lg font-semibold mb-1"
                    style={{ color: '#2A2A2A' }}
                >
                    Live Activity
                </h3>
                <p 
                    className="text-xs"
                    style={{ color: 'rgba(0, 0, 0, 0.5)' }}
                >
                    Real-time updates from your profile
                </p>
            </div>

            {/* Live Match Score */}
            <div className="mb-6 pb-6 border-b" style={{ borderColor: 'rgba(0, 0, 0, 0.08)' }}>
                <div className="flex items-center justify-between mb-2">
                    <span 
                        className="text-sm font-medium"
                        style={{ color: 'rgba(0, 0, 0, 0.7)' }}
                    >
                        Talent Match Score
                    </span>
                    <motion.span
                        key={state.liveMatchScore}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-lg font-bold"
                        style={{ color: '#CD5656' }}
                    >
                        {state.liveMatchScore}%
                    </motion.span>
                </div>
                <div 
                    className="h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.08)' }}
                >
                    <motion.div
                        key={state.liveMatchScore}
                        initial={{ width: 0 }}
                        animate={{ width: `${state.liveMatchScore}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ 
                            background: 'linear-gradient(90deg, #CD5656, #DA6C6C)',
                        }}
                    />
                </div>
            </div>

            {/* Impact Tracker */}
            <div className="mb-6">
                <h4 
                    className="text-sm font-semibold mb-3"
                    style={{ color: '#2A2A2A' }}
                >
                    Recent Impact
                </h4>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                        <Eye className="w-4 h-4" style={{ color: '#CD5656' }} />
                        <span style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                            {state.recentActivity.profileViews} students viewed your profile
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <UserPlus className="w-4 h-4" style={{ color: '#DA6C6C' }} />
                        <span style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                            {state.recentActivity.studentsApproached} students approached you
                        </span>
                    </div>
                    {state.recentActivity.recommendationsUpdated && (
                        <div className="flex items-center gap-2 text-sm">
                            <Sparkles className="w-4 h-4" style={{ color: '#AF3E3E' }} />
                            <span style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                Recommendations updated
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Live Feed */}
            <div>
                <h4 
                    className="text-sm font-semibold mb-3"
                    style={{ color: '#2A2A2A' }}
                >
                    Live Feed
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                    <AnimatePresence>
                        {activities.map((activity) => {
                            const Icon = getActivityIcon(activity.type);
                            return (
                                <motion.div
                                    key={activity.id}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="flex items-start gap-2 p-2 rounded-lg text-xs"
                                    style={{ backgroundColor: 'rgba(205, 86, 86, 0.05)' }}
                                >
                                    <Icon className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: '#CD5656' }} />
                                    <span style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                        {activity.message}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}

