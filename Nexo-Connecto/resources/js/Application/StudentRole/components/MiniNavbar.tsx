import React, { useState } from 'react';
import NexoLogo from '@/components/NexoLogo';
import { usePage } from '@inertiajs/react';
import { Search, Menu, X } from 'lucide-react';
import NotificationButton from '../../components/NotificationButton';
import ProfileButton from '../../components/ProfileButton';
import Items from './Items';
import MobileMenu from './MobileMenu';

const MiniNavbar = () => {
    const { props } = usePage();
    const user = (props.auth as any)?.user;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <nav className="w-full min-h-16 bg-white border-b border-gray-100 flex flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-3 lg:py-0 sticky top-0 z-50">
                <div className="flex items-center gap-4 lg:gap-6">
                    <NexoLogo size="sm" font="outfit" />
                    <div className="h-6 w-px bg-gray-200 hidden md:block" />
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center">
                    <Items />
                </div>

                <div className="flex items-center gap-3 lg:gap-5">
                    <NotificationButton 
                        onClick={() => console.log('Notifications clicked')}
                        hasNotifications={false}
                        className="!w-8 !h-8 !shadow-none !bg-transparent hover:!bg-gray-50"
                    />

                    <div className="flex items-center pl-3 lg:pl-4 border-l border-gray-100">
                        <ProfileButton avatar={user?.avatar} className="!w-9 !h-9 !shadow-none border border-gray-100" />
                    </div>

                    {/* Hamburger Menu Button - Mobile/Tablet Only */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors ml-2"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
};

export default MiniNavbar;
