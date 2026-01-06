import React,{useState,useEffect,useContext} from 'react';
import  NexoLogo from '@/components/NexoLogo';
import Items from './Items';
import NotificationButton from '../../components/NotificationButton';
import ConnectionButton from '../../components/ConnectionButton';
import ProfileButton from '../../components/ProfileButton';
import SearchBar from '../../components/SearchBar';
import { StudentDashboardContext } from '../pages/Index';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentNavBar = () => {
    const user = useContext(StudentDashboardContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    console.log(user);

    useEffect(() => {
        // Mbyll hamburger menu kur ndryshon madhësia e ekranit
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <nav className="w-full h-[100px] flex justify-between items-center relative bg-white">
                {/* Logo - Left Side */}
                <div className="flex-shrink-0 pl-4 md:pl-8">
                    <NexoLogo size="lg" font="outfit" />
                </div>

                {/* Desktop Navigation - Hidden on mobile/tablet */}
                <div className="hidden xl:flex gap-4 pr-8">
                    <Items />
                </div>

                {/* Right Side - Always visible */}
                <div className="flex items-center gap-2 md:gap-4 pr-4 md:pr-8">
                    {/* Desktop Search Bar - Hidden on mobile/tablet */}
                    <div className="hidden xl:block">
                        <SearchBar 
                            onSearch={(query, type) => {
                                console.log('Search:', query, 'Type:', type);
                            }}
                        />
                    </div>
                    
                    {/* Connection, Notification, Profile - Always visible */}
                    <ConnectionButton 
                        onClick={() => {
                            console.log('Connections clicked');
                        }}
                        hasNewConnections={false}
                    />

                    <NotificationButton 
                        onClick={() => {
                            console.log('Notifications clicked');
                        }}
                        hasNotifications={false}
                    />

                    <ProfileButton avatar={user?.avatar} />

                    {/* Hamburger Menu Button - Visible on mobile/tablet and medium screens */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="xl:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 active:scale-95 cursor-pointer ml-2"
                        style={{
                            backgroundColor: '#FFFFFF',
                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                        }}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-5 h-5" style={{ color: '#333' }} />
                        ) : (
                            <Menu className="w-5 h-5" style={{ color: '#333' }} />
                        )}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 bg-black/20 z-40 xl:hidden"
                                onClick={() => setIsMobileMenuOpen(false)}
                            />
                            
                            {/* Mobile Menu */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="fixed top-[100px] left-0 right-0 bg-white shadow-lg z-50 xl:hidden border-b border-gray-200"
                            >
                                <div className="px-4 py-6 space-y-6">
                                    {/* Mobile Navigation Items */}
                                    <div className="flex flex-col gap-4">
                                        <Items />
                                    </div>

                                    {/* Mobile Search Bar */}
                                    <div className="w-full">
                                        <SearchBar 
                                            onSearch={(query, type) => {
                                                console.log('Search:', query, 'Type:', type);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>
        </>
    )
};

export default StudentNavBar;