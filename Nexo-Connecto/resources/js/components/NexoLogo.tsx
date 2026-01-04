import React from 'react';
import { Link } from '@inertiajs/react';

export type LogoSize = 'sm' | 'md' | 'lg' | 'xl';
export type LogoFont = 'outfit' | 'kolbe';

interface NexoLogoProps {
    size?: LogoSize;
    font?: LogoFont;
    href?: string;
    className?: string;
    asLink?: boolean;
}

const sizeClasses: Record<LogoSize, string> = {
    sm: 'text-lg',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl',
    xl: 'text-3xl md:text-4xl',
};

export default function NexoLogo({ 
    size = 'md', 
    font = 'outfit',
    href = '/',
    className = '',
    asLink = true 
}: NexoLogoProps) {
    const fontFamily = font === 'kolbe' 
        ? { fontFamily: '"Kolbe Slab Condensed", sans-serif' }
        : {};

    const logoContent = (
        <span 
            className={`${sizeClasses[size]} font-bold bg-gradient-to-r from-red-dark via-red to-coral bg-clip-text text-transparent font-outfit ${className}`}
            style={fontFamily}
        >
            Nexo
        </span>
    );

    if (asLink) {
        return (
            <Link href={href} className="flex items-center">
                {logoContent}
            </Link>
        );
    }

    return logoContent;
}

