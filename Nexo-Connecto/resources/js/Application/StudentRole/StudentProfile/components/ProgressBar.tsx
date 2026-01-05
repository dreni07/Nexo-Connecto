import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
    progress: number;
    className?: string;
}

const getProgressMessage = (progress: number): string => {
    if (progress === 0) {
        return 'Let\'s start building your profile!';
    } else if (progress >= 10 && progress < 25) {
        return 'Great start! You\'re on the right track.';
    } else if (progress >= 25 && progress < 50) {
        return 'You\'re making excellent progress!';
    } else if (progress >= 50 && progress < 65) {
        return 'Halfway there! Keep going!';
    } else if (progress >= 65 && progress < 75) {
        return 'You\'re almost ready to connect with opportunities!';
    } else if (progress >= 75 && progress < 100) {
        return 'Just one more step and you\'re all set!';
    } else if (progress === 100) {
        return 'Perfect! You\'re ready to discover amazing opportunities!';
    } else {
        return 'Every detail brings you closer to real opportunities.';
    }
};

export default function ProgressBar({ progress, className = '' }: ProgressBarProps) {
    const message = getProgressMessage(progress);

    return (
        <div className={`fixed top-6 left-6 z-50 ${className}`}>
            <div className="min-w-[320px]">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-xs font-outfit" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                            {message}
                        </p>
                    </div>

                    <div className="relative w-full h-3 rounded-full overflow-hidden">
                        <div 
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: 'linear-gradient(90deg, rgba(205, 86, 86, 0.15) 0%, rgba(218, 108, 108, 0.15) 100%)',
                            }}
                        />
                        
                        <motion.div
                            className="absolute top-0 left-0 h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            style={{
                                background: 'linear-gradient(90deg, #CD5656 0%, #DA6C6C 100%)',
                                boxShadow: '0 2px 8px rgba(205, 86, 86, 0.4)',
                            }}
                        >
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                animate={{
                                    background: [
                                        'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                                        'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 100%, transparent 100%)',
                                    ],
                                    backgroundPosition: ['-100% 0', '200% 0'],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                                style={{
                                    backgroundSize: '50% 100%',
                                }}
                            />
                        </motion.div>
                    </div>

                    <div className="flex justify-end">
                        <span className="text-xs text-muted-foreground font-outfit" style={{ color: '#CD5656' }}>
                            {progress}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

