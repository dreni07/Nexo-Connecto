import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
}

export default function AnimatedText({ text, className = "", delay = 0, stagger = 0.04 }: AnimatedTextProps) {
    const letters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { 
                staggerChildren: stagger, 
                delayChildren: delay 
            },
        },
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 200,
            },
        },
        hidden: {
            opacity: 0,
            y: 10,
            filter: "blur(4px)",
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 200,
            },
        },
    };

    return (
        <motion.div
            className={`flex flex-wrap justify-center ${className}`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {letters.map((letter, index) => (
                <motion.span 
                    variants={child} 
                    key={index}
                    className="inline-block"
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    );
}











