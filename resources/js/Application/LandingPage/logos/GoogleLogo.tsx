import React from 'react';
import { SiGoogle } from 'react-icons/si';

interface LogoProps {
    size?: number;
    color?: string;
    className?: string;
}

const GoogleLogo: React.FC<LogoProps> = ({ 
    size = 24, 
    color,
    className = '' 
}) => {
    return (
        <SiGoogle 
            size={size}
            color={color}
            className={className}
        />
    );
};

export default GoogleLogo;

