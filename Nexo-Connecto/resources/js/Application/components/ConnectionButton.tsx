import React, { useState, useRef, useEffect } from 'react';
import { Users, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Company {
    id: number;
    name: string;
    logo?: string;
    industry?: string;
}

interface ConnectionButtonProps {
    onClick?: () => void;
    hasNewConnections?: boolean;
    className?: string;
}

// Dummy data për kompani të sugjeruara
const suggestedCompanies: Company[] = [
    { id: 1, name: 'Kosbit', logo: undefined, industry: 'Technology' },
    { id: 2, name: 'TechCorp', logo: undefined, industry: 'Software' },
    { id: 3, name: 'InnovateLab', logo: undefined, industry: 'Innovation' },
    { id: 4, name: 'Digital Solutions', logo: undefined, industry: 'Digital' },
];

export default function ConnectionButton({ 
    onClick, 
    hasNewConnections = false,
    className = '' 
}: ConnectionButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleConnect = (companyId: number) => {
        console.log('Connecting to company:', companyId);
        // Këtu mund të shtosh logjikën për të lidhur me kompaninë
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen);
                    onClick?.();
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 active:scale-95 cursor-pointer ${className}`}
                style={{
                    backgroundColor: isHovered ? '#F8F9F3' : '#FFFFFF',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                }}
                aria-label="Connections"
            >
                <Users 
                    className="w-5 h-5" 
                    style={{ color: '#333' }}
                />
                {hasNewConnections && (
                    <span 
                        className="absolute top-1 right-1 w-2 h-2 rounded-full"
                        style={{ backgroundColor: '#CD5656' }}
                    />
                )}
            </button>

            <AnimatePresence>
                {isDropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed left-1/2 -translate-x-1/2 top-[120px] sm:absolute sm:left-auto sm:translate-x-0 sm:right-0 sm:top-auto mt-0 sm:mt-2 w-[calc(100vw-50px)] sm:w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-200 overflow-hidden ml-[25px] sm:ml-0"
                        style={{
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                            maxWidth: 'calc(100vw - 50px)',
                        }}
                    >
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                            <div className="p-3 sm:p-4 border-b border-gray-200">
                                <h3 className="text-base sm:text-lg font-outfit font-semibold text-gray-800">Let's Connect</h3>
                                <p className="text-xs sm:text-sm text-gray-500 font-outfit mt-1">Suggested companies</p>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {suggestedCompanies.map((company, index) => (
                                    <motion.div
                                        key={company.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.2 }}
                                        className="flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                                    >
                                        <div className="flex items-center gap-2 sm:gap-3 flex-1">
                                            <div 
                                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"
                                                style={{ backgroundColor: '#F5F5F5' }}
                                            >
                                                {company.logo ? (
                                                    <img 
                                                        src={company.logo} 
                                                        alt={company.name}
                                                        className="w-full h-full rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-gray-600 font-outfit font-semibold text-base sm:text-lg">
                                                        {company.name.charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-outfit font-semibold text-sm sm:text-base text-gray-800 truncate">
                                                    {company.name}
                                                </p>
                                                {company.industry && (
                                                    <p className="text-xs sm:text-sm text-gray-500 font-outfit truncate">
                                                        {company.industry}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleConnect(company.id)}
                                            className="ml-2 sm:ml-3 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 flex-shrink-0"
                                            style={{
                                                backgroundColor: '#CD5656',
                                                color: 'white',
                                            }}
                                            aria-label={`Connect to ${company.name}`}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

