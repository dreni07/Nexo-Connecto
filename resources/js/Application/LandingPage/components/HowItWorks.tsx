import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const HowItWorks = () => {
    const titleRef = useRef(null);
    const isTitleInView = useInView(titleRef, { once: true, margin: '-300px' });

    const titleVariants = {
        hidden: {
            opacity: 0,
            y: -50,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    return (
        <section className="w-full pt-8 pb-40 relative" style={{ backgroundColor: '#F4F5ED', minHeight: '100vh' }}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                <motion.h2
                    ref={titleRef}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center font-outfit"
                    variants={titleVariants}
                    initial="hidden"
                    animate={isTitleInView ? 'visible' : 'hidden'}
                >
                    How Does{' '}
                    <span style={{ color: '#CD5656' }}>Nexo</span>
                    {' '}Work
                </motion.h2>
            </div>
        </section>
    );
};

export default HowItWorks;

