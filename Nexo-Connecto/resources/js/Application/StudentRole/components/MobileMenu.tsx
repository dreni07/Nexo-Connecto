import React, { useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    const { url } = usePage();

    const links = [
        { href: '/student/dashboard', label: 'Home' },
        { href: '/student/companies', label: 'Companies' },
        { href: '/student/feed', label: 'Feed' },
        { href: '/student/projects', label: 'Projects' },
        { href: '/student/preferences', label: 'Preferences' },
    ];

    // Close menu when clicking outside or on a link
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close menu on route change
    useEffect(() => {
        if (isOpen) {
            onClose();
        }
    }, [url]);

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            {/* Menu Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold font-outfit text-gray-900">Menu</h2>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors"
                            aria-label="Close menu"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 overflow-y-auto py-4">
                        <div className="flex flex-col">
                            {links.map((link) => {
                                const isActive = url === link.href || url.startsWith(link.href + '/');

                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={onClose}
                                        className={`px-6 py-4 font-outfit text-base transition-colors relative ${
                                            isActive
                                                ? 'text-[#CD5656] bg-[#F8F9F3] font-semibold'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {isActive && (
                                                <div className="w-1 h-6 bg-[#CD5656] rounded-full" />
                                            )}
                                            <span className={isActive ? '' : 'pl-4'}>
                                                {link.label}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default MobileMenu;

