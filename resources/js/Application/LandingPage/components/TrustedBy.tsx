import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    OpenAILogo,
    GoogleLogo,
    AmazonLogo,
    AppleLogo,
    MetaLogo,
} from '../logos';

const TrustedBy = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    const companies = [
        { name: 'OpenAI', Logo: OpenAILogo },
        { name: 'Google', Logo: GoogleLogo },
        { name: 'Amazon', Logo: AmazonLogo },
        { name: 'Apple', Logo: AppleLogo },
        { name: 'Meta', Logo: MetaLogo },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const iconVariants = {
        hidden: { 
            opacity: 0, 
            x: -50,
        },
        visible: { 
            opacity: 0.5,
            x: 0,
            transition: {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    return (
        <section 
            className="w-full pt-16 pb-6 relative mt-16"
            style={{ backgroundColor: '#F4F5ED' }}
        >
            <div 
                className="absolute top-0 left-0 right-0 h-16 z-10 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, rgba(244, 245, 237, 0) 0%, #F4F5ED 100%)'
                }}
            />
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-20">
                <p className="text-center text-gray-500 text-xs font-medium mb-4">
                    Trusted by top companies
                </p>
                <motion.div 
                    ref={containerRef}
                    className="flex items-center justify-center gap-12 md:gap-16 lg:gap-20 xl:gap-28 flex-wrap"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {companies.map((company, index) => {
                        return (
                            <motion.div
                                key={company.name}
                                className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300"
                                variants={iconVariants}
                            >
                                <company.Logo size={72} color="#2A2A2A"/>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default TrustedBy;

