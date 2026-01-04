import React from 'react';
import { SiAmazon } from 'react-icons/si';

interface LogoProps {
    size?: number;
    color?: string;
    className?: string;
}

const AmazonLogo: React.FC<LogoProps> = ({ 
    size = 24, 
    color,
    className = '' 
}) => {
    return (
        <SiAmazon 
            size={size}
            color={color}
            className={className}
        />
    );
};

export default AmazonLogo;

