import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedText from './AnimatedText';

interface WelcomeOverlayProps {
    title: string;
    subtitle: string;
    show?: boolean;
}

const WelcomeOverlay = ({ title, subtitle, show = true }: WelcomeOverlayProps) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    key="welcome-overlay"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F4F5ED]"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center"
                    >
                        <AnimatedText 
                            text={title} 
                            className="text-3xl font-outfit font-semibold text-gray-800"
                            delay={0.2}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: 0.5 }}
                            className="text-sm text-gray-500 font-outfit mt-4"
                        >
                            {subtitle}
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WelcomeOverlay;
