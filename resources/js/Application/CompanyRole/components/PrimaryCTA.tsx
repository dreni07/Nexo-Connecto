import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, UserCheck, X } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useDashboard } from '../context/DashboardContext';

export default function PrimaryCTA() {
    const { state } = useDashboard();
    const isProfileIncomplete = state.profileCompletion < 100;
    const [isDismissed, setIsDismissed] = React.useState(false);

    if (!isProfileIncomplete || isDismissed) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg px-4 py-3 shadow-sm transition-all duration-300 font-outfit mb-6"
            style={{
                background: 'linear-gradient(135deg, rgba(205, 86, 86, 0.08) 0%, rgba(218, 108, 108, 0.04) 100%)',
                border: '1px solid rgba(205, 86, 86, 0.15)',
            }}
        >
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                    <div 
                        className="flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0"
                        style={{ backgroundColor: 'rgba(205, 86, 86, 0.12)' }}
                    >
                        <UserCheck className="w-4 h-4" style={{ color: '#CD5656' }} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <p 
                            className="text-sm font-medium"
                            style={{ color: '#2A2A2A' }}
                        >
                            Finish your profile to unlock more student matches
                        </p>
                    </div>
                    
                    <Link
                        href="/company/profile"
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-white text-xs font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex-shrink-0"
                        style={{ backgroundColor: '#CD5656' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#AF3E3E';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#CD5656';
                        }}
                    >
                        Complete Profile
                        <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
                
                <button
                    onClick={() => setIsDismissed(true)}
                    className="flex-shrink-0 p-1 rounded-md transition-colors hover:bg-white/50"
                    style={{ color: 'rgba(0, 0, 0, 0.4)' }}
                    aria-label="Dismiss"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
}

