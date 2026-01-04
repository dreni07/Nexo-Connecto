import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send } from 'lucide-react';

const Features = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    const features = [
        {
            title: 'One-Click Applications',
            description: 'Apply instantly with a complete, optimized student profile designed to help you stand out.',
            colSpan: 'md:col-span-1',
        },
        {
            title: 'Smart Matching Algorithm',
            description: 'Your skills, interests, and experience are automatically matched with suitable internships — no endless searching',
            colSpan: 'md:col-span-2',
        },
        {
            title: 'Verified Company Listings',
            description: 'Only legitimate, trusted employers and internship opportunities — giving students transparency and confidence.',
            colSpan: 'md:col-span-2',
        },
        {
            title: 'Company Insights & Skill Highlights',
            description: 'You get personalized recommendations on which skills companies want and how well you match their requirements.',
            colSpan: 'md:col-span-1',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 30,
        },
        visible: { 
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
        scrollDown: {
            y: 200,
            opacity: 0,
            transition: {
                duration: 1.2,
                ease: [0.4, 0, 0.2, 1] as const,
            },
        },
    };

    const sectionRef = useRef<HTMLElement>(null);
    const [shouldDisappear, setShouldDisappear] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            
            const section = sectionRef.current;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const viewportTop = scrollTop;
            
            const section95Percent = sectionTop + (sectionHeight * 0.95);
            
            setShouldDisappear(viewportTop >= section95Percent);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); 
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={sectionRef} className="w-full pt-20 pb-8 relative" style={{ backgroundColor: '#F4F5ED' }}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <Send className="w-4 h-4 text-gray-400" />
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                        Features
                    </p>
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center mb-6 font-outfit">
                    All the Tools you need to help
                </h2>
                
                <p className="text-base md:text-lg text-gray-500 text-center max-w-3xl mx-auto leading-relaxed mb-16">
                    Empowering you with intelligent features to simplify your job search and connect with opportunities effortlessly
                </p>

                <motion.div
                    ref={containerRef}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className={feature.colSpan}
                            variants={cardVariants}
                            animate={shouldDisappear ? 'scrollDown' : (isInView ? 'visible' : 'hidden')}
                        >
                            <div 
                                className="p-6 h-full"
                                style={{
                                    border: '1px solid rgba(0, 0, 0, 0.08)',
                                    borderRadius: '8px',
                                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                                    backgroundColor: 'transparent',
                                }}
                            >
                                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-outfit">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Features;

