import React from 'react';
import { motion } from 'framer-motion';

const EditorLoadingOverlay = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-[1.5px] bg-black/5 transition-all"
        >
            <div className="relative flex items-center justify-center">
                {/* Outer decorative ring */}
                <motion.div
                    className="absolute w-16 h-16 border-4 border-[#CD5656]/10 rounded-full"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />
                
                {/* Main Spinning Circle */}
                <motion.div
                    className="w-12 h-12 border-4 border-[#CD5656]/20 border-t-[#CD5656] rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        ease: "linear"
                    }}
                />
            </div>
        </motion.div>
    );
};

export default EditorLoadingOverlay;

