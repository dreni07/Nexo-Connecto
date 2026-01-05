import React from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
    isVisible: boolean;
}

export default function LoadingScreen({ isVisible }: LoadingScreenProps) {
    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(4px)',
            }}
        >
            <div className="relative">
                <div className="relative w-24 h-24">
                    <motion.div
                        className="absolute inset-0 rounded-full border-4 border-transparent"
                        style={{
                            borderTopColor: '#CD5656',
                            borderRightColor: '#CD5656',
                        }}
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                    
                    <motion.div
                        className="absolute inset-2 rounded-full border-4 border-transparent"
                        style={{
                            borderBottomColor: '#DA6C6C',
                            borderLeftColor: '#DA6C6C',
                        }}
                        animate={{ rotate: -360 }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                    
                    <motion.div
                        className="absolute inset-6 rounded-full"
                        style={{
                            backgroundColor: '#CD5656',
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                    
                    <motion.div
                        className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                        style={{
                            backgroundColor: '#FFA5A5',
                            left: '50%',
                            top: '50%',
                        }}
                        animate={{
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                </div>

                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                            backgroundColor: '#CD5656',
                            left: '50%',
                            top: '50%',
                        }}
                        animate={{
                            x: [
                                0,
                                Math.cos((i * Math.PI) / 3) * 60,
                                Math.cos((i * Math.PI) / 3) * 60,
                                0,
                            ],
                            y: [
                                0,
                                Math.sin((i * Math.PI) / 3) * 60,
                                Math.sin((i * Math.PI) / 3) * 60,
                                0,
                            ],
                            opacity: [0, 1, 1, 0],
                            scale: [0, 1, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
}

