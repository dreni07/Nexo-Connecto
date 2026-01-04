import React from 'react';
import { SiApple } from 'react-icons/si';

interface LogoProps {
    size?: number;
    color?: string;
    className?: string;
}

const AppleLogo: React.FC<LogoProps> = ({ 
    size = 24, 
    color,
    className = '' 
}) => {
    return (
        <SiApple 
            size={size}
            color={color}
            className={className}
        />
    );
};

export default AppleLogo;

