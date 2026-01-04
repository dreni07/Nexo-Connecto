import React, { useState } from 'react';
import { Users } from 'lucide-react';

interface ConnectionButtonProps {
    onClick?: () => void;
    hasNewConnections?: boolean;
    className?: string;
}

export default function ConnectionButton({ 
    onClick, 
    hasNewConnections = false,
    className = '' 
}: ConnectionButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            type="button"
            onClick={onClick}
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
    );
}

