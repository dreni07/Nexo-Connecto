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
        <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }, (_, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentStep;
                const isActive = stepNumber === currentStep;

                return (
                    <React.Fragment key={stepNumber}>
                        {/* Step Circle with Number */}
                        <motion.div
                            className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium font-outfit transition-all duration-300"
                            initial={false}
                            animate={{
                                backgroundColor: isCompleted || isActive 
                                    ? '#CD5656' 
                                    : 'rgba(0, 0, 0, 0.1)',
                                color: isCompleted || isActive 
                                    ? '#FFFFFF' 
                                    : 'rgba(0, 0, 0, 0.4)',
                                scale: isActive ? 1.1 : 1,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {stepNumber}
                        </motion.div>

                        {/* Connecting Line */}
                        {index < totalSteps - 1 && (
                            <div className="relative w-12 h-0.5 overflow-hidden">
                                {/* Background Line */}
                                <div 
                                    className="absolute inset-0"
                                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
                                />
                                {/* Animated Fill Line */}
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

