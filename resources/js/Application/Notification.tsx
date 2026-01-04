import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, XCircle, Info, AlertCircle } from 'lucide-react';

export type NotificationType = 'success' | 'fail' | 'information' | 'default';

export interface NotificationProps {
    type?: NotificationType;
    message: string;
    className?: string;
    duration?: number;
    onClose?: () => void;
    showCloseButton?: boolean;
    position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
}

const notificationConfig = {
    success: {
        icon: CheckCircle,
        bgColor: '#10B981',
        textColor: '#FFFFFF',
        borderColor: '#059669',
    },
    fail: {
        icon: XCircle,
        bgColor: '#CD5656',
        textColor: '#FFFFFF',
        borderColor: '#AF3E3E',
    },
    information: {
        icon: Info,
        bgColor: '#3B82F6',
        textColor: '#FFFFFF',
        borderColor: '#2563EB',
    },
    default: {
        icon: AlertCircle,
        bgColor: '#6B7280',
        textColor: '#FFFFFF',
        borderColor: '#4B5563',
    },
};

const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

export default function Notification({
    type = 'default',
    message,
    className = '',
    duration = 5000,
    onClose,
    showCloseButton = true,
    position = 'top-right',
}: NotificationProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration]);

    const handleClose = () => {
        setIsVisible(false);
        onClose?.();
    };

    const config = notificationConfig[type];
    const Icon = config.icon;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={`fixed z-[9999] ${positionClasses[position]} ${className}`}
                    style={{ maxWidth: '400px', width: '90%' }}
                >
                    <div
                        className="flex items-start gap-3 rounded-lg border px-4 py-3 shadow-lg font-outfit"
                        style={{
                            backgroundColor: config.bgColor,
                            borderColor: config.borderColor,
                            color: config.textColor,
                        }}
                    >
                        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium leading-relaxed break-words">
                                {message}
                            </p>
                        </div>
                        {showCloseButton && (
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-shrink-0 ml-2 rounded-md p-1 transition-colors hover:bg-white/20 active:bg-white/30"
                                aria-label="Close notification"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

