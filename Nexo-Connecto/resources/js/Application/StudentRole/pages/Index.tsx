import React,{useState,useEffect,createContext} from 'react';
import { Head } from '@inertiajs/react';
import StudentNavBar from '../components/StudentNavBar';
import ProgressTracker from '../components/ProgressTracker';
import LetsConnect from '../components/LetsConnect';
import UnlockFeatures from '../components/UnlockFeatures';
import YourProjects from '../components/YourProjects';
import ProposalProgress from '../components/ProposalProgress';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedText from '@/components/AnimatedText';
import StudentLayout from '@/layouts/student-layout';

interface UserDetails {
    name:string;
    email:string;
    avatar?:string;
}

interface IndexProps {
    user_details: UserDetails;
}

export const StudentDashboardContext = createContext<UserDetails | undefined>(undefined);



const Index = ({ user_details }: IndexProps) => {

    const [showOverlay, setShowOverlay] = useState(() => {
        if (typeof window === 'undefined') return false;
        return new URLSearchParams(window.location.search).get('completed') === 'true';
    });

    useEffect(() => {
        if (!showOverlay) return;

        const timer = setTimeout(() => {
            setShowOverlay(false);

            const url = new URL(window.location.href);
            url.searchParams.delete('completed');
            window.history.replaceState({}, '', url.pathname);
        }, 4000);

        return () => clearTimeout(timer);
    }, [showOverlay]);

    return (
        <StudentDashboardContext.Provider value={user_details}>
            <Head title="Student Dashboard" />
            <AnimatePresence>
                {showOverlay && (
                    <motion.div
                        key="welcome-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F4F5ED]"
                    >
        <StudentLayout>
            <StudentDashboardContext.Provider value={user_details}>
                <Head title="Student Dashboard" />
                
                <AnimatePresence>
                    {showOverlay && (
                        <motion.div
                            key="welcome-overlay"
                            initial={{ opacity: 0 }}
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
                                    text="Be ready to meet opportunities" 
                                    className="text-3xl font-outfit font-semibold text-gray-800"
                                    delay={0.2}
                                />
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.5, duration: 0.5 }}
                                    className="text-sm text-gray-500 font-outfit mt-4"
                                >
                                    Setting up your personalized experience...
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            <div className="min-h-screen bg-[#f5f2ed] w-full overflow-x-hidden">
                <StudentNavBar />
                
                <main className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 overflow-x-hidden">
                    <div className="w-full mx-auto">
                        {/* Main Content Grid - Responsive */}
                        <div className="grid grid-cols-1 lg:grid-cols-24 gap-4 sm:gap-6 items-stretch w-full">
                            {/* First Row: Progress Tracker and Your Recent Projects */}
                            <div className="lg:col-span-13 order-1 w-full">
                                <ProgressTracker />
                            </div>
                            <div className="lg:col-span-11 order-2 w-full">
                                <YourProjects />
                            </div>

                            {/* Second Row: Let's Connect, Unlock Features, and Proposal Progress */}
                            <div className="lg:col-span-13 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch order-3 lg:order-3 w-full">
                                <LetsConnect />
                                <UnlockFeatures />
                            </div>
                            <div className="lg:col-span-11 order-4 lg:order-4 w-full">
                                <ProposalProgress />
                <div className="min-h-screen bg-[#f5f2ed]">
                    <StudentNavBar />
                    
                    <main className="w-full px-8 py-8">
                        <div className="w-full max-w-full mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-24 gap-6 items-stretch" style={{ gridTemplateRows: '1fr auto' }}>
                                <div className="lg:col-span-13" style={{ gridRow: '1' }}>
                                    <ProgressTracker />
                                </div>
                                <div className="lg:col-span-11" style={{ gridRow: '1' }}>
                                    <YourProjects />
                                </div>

                                <div className="lg:col-span-13 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch" style={{ gridRow: '2' }}>
                                    <LetsConnect />
                                    <UnlockFeatures />
                                </div>
                                <div className="lg:col-span-11" style={{ gridRow: '2' }}>
                                    <ProposalProgress />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </StudentDashboardContext.Provider>
        </StudentLayout>
    )
}

export default Index;