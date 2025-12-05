import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { Link } from '@inertiajs/react';

export default function UpcomingTasks() {
    const { state } = useDashboard();
    const incompleteTasks = state.upcomingTasks.filter(task => !task.completed).slice(0, 3);

    if (incompleteTasks.length === 0) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
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
                Upcoming Tasks
            </h3>
            
            <div className="space-y-3">
                {incompleteTasks.map((task, index) => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Circle className="w-5 h-5 flex-shrink-0" style={{ color: 'rgba(0, 0, 0, 0.3)' }} />
                        <span 
                            className="text-sm flex-1"
                            style={{ color: 'rgba(0, 0, 0, 0.7)' }}
                        >
                            {task.title}
                        </span>
                    </motion.div>
                ))}
            </div>
            
            <Link
                href="/company/profile"
                className="mt-4 inline-block text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: '#CD5656' }}
            >
                View all tasks →
            </Link>
        </motion.div>
    );
}

