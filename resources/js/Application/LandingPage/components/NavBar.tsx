import React from 'react';
import { Link } from '@inertiajs/react';

const NavBar = () => {
    return (
        <>
            {/* Top banner bar */}
            <div className="w-full text-white py-2 text-center text-xs" style={{ backgroundColor: '#2A2A2A' }}>
                <p className="font-outfit">Our software provides seamless integration with your existing tools.</p>
            </div>

            {/* Main navigation */}
            <nav className="w-full border-b border-gray-200 sticky top-0 z-50" style={{ backgroundColor: '#ECEDE1' }}>
                <div className="w-full px-8 md:px-12 lg:px-16 py-4">
                    <div className="flex items-center justify-between">
                        {/* Left - Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center">
                                <span className="text-2xl font-bold bg-gradient-to-r from-red-dark via-red to-coral bg-clip-text text-transparent">
                                    Nexo
                                </span>
                            </Link>
                        </div>

                        {/* Center - Navigation Links */}
                        <div className="hidden md:flex items-center justify-center flex-1 gap-8">
                            <Link
                                href="#home"
                                className="text-gray-700 hover:text-red transition-colors font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                href="#how-it-works"
                                className="text-gray-700 hover:text-red transition-colors font-medium"
                            >
                                How It Works
                            </Link>
                            <Link
                                href="#features"
                                className="text-gray-700 hover:text-red transition-colors font-medium"
                            >
                                Features
                            </Link>
                            <Link
                                href="#contact"
                                className="text-gray-700 hover:text-red transition-colors font-medium"
                            >
                                Contact
                            </Link>
                        </div>

                        {/* Right - Get Started Button */}
                        <div className="flex-shrink-0">
                            <Link
                                href="/register"
                                className="px-6 py-2.5 bg-red text-white rounded-lg font-medium hover:bg-red-dark transition-colors"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
