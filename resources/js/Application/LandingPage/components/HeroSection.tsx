import React, { useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { motion, useAnimation } from 'framer-motion';
import Globe from './HeroSection/Globe';
import JobCard from './HeroSection/JobCard';

const HeroSection = () => {
    const titleControls = useAnimation();
    const descriptionControls = useAnimation();
    const ctaControls = useAnimation();
    const globeControls = useAnimation();
    const jobCardsControls = useAnimation();

    useEffect(() => {
        const animateSequentially = async () => {
            await titleControls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: 'easeOut' }
            });

            await descriptionControls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: 'easeOut' }
            });

            await ctaControls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: 'easeOut' }
            });

            await globeControls.start({
                opacity: 1,
                scale: 1,
                transition: { duration: 0.8, ease: 'easeOut' }
            });

            await jobCardsControls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: 'easeOut' }
            });
        };

        animateSequentially();
    }, [titleControls, descriptionControls, ctaControls, globeControls, jobCardsControls]);

    return (
        <section className="relative min-h-[90vh] overflow-hidden pt-32 pb-0">
            {/* Globe Container - Separate positioning container for Globe */}
            <motion.div 
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={globeControls}
            >
                <Globe />
            </motion.div>
            
            {/* Mask effect at the bottom to fade the globe */}
            <div 
                className="absolute bottom-0 left-0 right-0 h-64 z-10 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, transparent 0%, #F4F5ED 100%)'
                }}
            />
            
            {/* Title Content Container - Independent positioning for text */}
            <div className="relative z-20 w-full px-6 pt-4 flex flex-col items-center bottom-[100px]">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={titleControls}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-outfit leading-tight text-center mb-6">
                        Find Internships.
                        <br />
                        Connect With Companies.
                        <br />
                        <span 
                            className="inline-block font-bold"
                            style={{
                                background: 'linear-gradient(to right, #AF3E3E 0%, #CD5656 30%, #DA6C6C 70%, #E8A5A5 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: '700'
                            }}
                        >
                            Fast.
                        </span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={descriptionControls}
                >
                    <p className="text-base md:text-lg text-gray-600 font-outfit opacity-70 text-center max-w-2xl mb-8">
                        Students discover internships. Companies find talent — all in one clean, simple platform.
                    </p>
                </motion.div>
                
                {/* CTA Buttons */}
                <motion.div 
                    className="flex items-center justify-center gap-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={ctaControls}
                >
                    <Link
                        href="#learn-more"
                        className="px-8 py-3 bg-red text-white rounded-lg font-semibold font-outfit hover:bg-red-dark transition-colors shadow-lg"
                    >
                        Learn More
                    </Link>
                    <Link
                        href="#book-demo"
                        className="px-8 py-3 bg-white text-gray-800 rounded-lg font-semibold font-outfit border-2 border-gray-300 hover:border-gray-400 transition-colors shadow-lg"
                    >
                        Book Demo
                    </Link>
                </motion.div>
            </div>

            {/* Job Cards positioned around the globe */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={jobCardsControls}
            >
                <JobCard
                    title="UI designer"
                    company="Facebook"
                    tags={['Design', 'Designer', 'Full-time']}
                    icon="facebook"
                    position="left"
                    zIndex="z-25"
                />
                <JobCard
                    title="Product designer"
                    company="Instagram"
                    tags={['Design', 'Full-time']}
                    icon="instagram"
                    position="center"
                    zIndex="z-30"
                />
                <JobCard
                    title="Full-stack Developer"
                    company="Twitter"
                    tags={['Developer', 'Full-time']}
                    icon="twitter"
                    position="right"
                    zIndex="z-25"
                />
            </motion.div>
        </section>
    );
};

export default HeroSection;
