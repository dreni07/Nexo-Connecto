import React, { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
    id: number;
    companyName: string;
    message: string;
    time: string;
    isRead: boolean;
}

interface NotificationButtonProps {
    onClick?: () => void;
    hasNotifications?: boolean;
    className?: string;
}

// Dummy data për njoftime
const notifications: Notification[] = [
    { 
        id: 1, 
        companyName: 'Kosbit', 
        message: 'just posted a new announcement', 
        time: '2 hours ago',
        isRead: false
    },
    { 
        id: 2, 
        companyName: 'TechCorp', 
        message: 'has a new job opening', 
        time: '5 hours ago',
        isRead: false
    },
    { 
        id: 3, 
        companyName: 'InnovateLab', 
        message: 'just posted a new announcement', 
        time: '1 day ago',
        isRead: true
    },
    { 
        id: 4, 
        companyName: 'Digital Solutions', 
        message: 'is looking for interns', 
        time: '2 days ago',
        isRead: true
    },
];

export default function NotificationButton({ 
    onClick, 
    hasNotifications = false,
    className = '' 
}: NotificationButtonProps) {
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

    const unreadCount = notifications.filter(n => !n.isRead).length;

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
                aria-label="Notifications"
            >
                <Bell 
                    className="w-5 h-5" 
                    style={{ color: '#333' }}
                />
                {(hasNotifications || unreadCount > 0) && (
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
                        className="fixed left-1/2 -translate-x-1/2 top-[120px] sm:absolute sm:left-auto sm:translate-x-0 sm:right-0 sm:top-auto mt-0 sm:mt-2 w-[calc(100vw-50px)] sm:w-96 bg-white rounded-lg shadow-lg z-50 border border-gray-200 overflow-hidden ml-[25px] sm:ml-0"
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
                                <h3 className="text-base sm:text-lg font-outfit font-semibold text-gray-800">Notifications</h3>
                                {unreadCount > 0 && (
                                    <p className="text-xs sm:text-sm text-gray-500 font-outfit mt-1">
                                        {unreadCount} new notification{unreadCount !== 1 ? 's' : ''}
                                    </p>
                                )}
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {notifications.length === 0 ? (
                                    <div className="p-8 text-center">
                                        <p className="text-gray-500 font-outfit">No notifications</p>
                                    </div>
                                ) : (
                                    notifications.map((notification, index) => (
                                        <motion.div
                                            key={notification.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05, duration: 0.2 }}
                                            className={`p-3 sm:p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 cursor-pointer ${
                                                !notification.isRead ? 'bg-blue-50/30' : ''
                                            }`}
                                            onClick={() => {
                                                console.log('Notification clicked:', notification.id);
                                                // Këtu mund të shtosh logjikën për të shënuar si të lexuar
                                            }}
                                        >
                                            <div className="flex items-start gap-2 sm:gap-3">
                                                <div 
                                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"
                                                    style={{ backgroundColor: '#F5F5F5' }}
                                                >
                                                    <span className="text-gray-600 font-outfit font-semibold text-sm sm:text-base">
                                                        {notification.companyName.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-outfit text-sm sm:text-base text-gray-800">
                                                        <span className="font-semibold">{notification.companyName}</span>{' '}
                                                        <span className="text-gray-600">{notification.message}</span>
                                                    </p>
                                                    <p className="text-xs text-gray-500 font-outfit mt-1">
                                                        {notification.time}
                                                    </p>
                                                </div>
                                                {!notification.isRead && (
                                                    <div 
                                                        className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                                                        style={{ backgroundColor: '#CD5656' }}
                                                    />
                                                )}
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

