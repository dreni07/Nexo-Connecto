import React from 'react';
import { motion } from 'framer-motion';

interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

export default function StepIndicator({ 
    currentStep, 
    totalSteps
}: StepIndicatorProps) {
    return (
        <div className="flex items-center gap-6">
            {Array.from({ length: totalSteps }, (_, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentStep;
                const isActive = stepNumber === currentStep;

                return (
                    <React.Fragment key={stepNumber}>
                        <motion.div
                            className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300"
                            initial={false}
                            animate={{
                                backgroundColor: isCompleted || isActive 
                                    ? '#CD5656' 
                                    : 'rgba(0, 0, 0, 0.08)',
                                scale: isActive ? 1.05 : 1,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <div
                                className="absolute rounded-full"
                                style={{
                                    width: '40%',
                                    height: '40%',
                                    backgroundColor: isCompleted || isActive 
                                        ? '#E88A8A' 
                                        : 'rgba(0, 0, 0, 0.15)',
                                }}
                            />
                        </motion.div>

                        {index < totalSteps - 1 && (
                            <div className="relative w-20 h-0.5 overflow-hidden">
                                <div 
                                    className="absolute inset-0"
                                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
                                />
                                {isCompleted && (
                                    <motion.div
                                        className="absolute inset-0"
                                        style={{ backgroundColor: '#CD5656' }}
                                        initial={{ width: '0%' }}
                                        animate={{ width: '100%' }}
                                        transition={{ 
                                            duration: 0.5, 
                                            ease: 'easeInOut' 
                                        }}
                                    />
                                )}
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

