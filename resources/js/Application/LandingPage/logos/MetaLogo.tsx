import React from 'react';
import { SiMeta } from 'react-icons/si';

interface LogoProps {
    size?: number;
    color?: string;
    className?: string;
}

const MetaLogo: React.FC<LogoProps> = ({ 
    size = 24, 
    color,
    className = '' 
}) => {
    return (
        <SiMeta 
            size={size}
            color={color}
            className={className}
        />
    );
};

export default MetaLogo;

