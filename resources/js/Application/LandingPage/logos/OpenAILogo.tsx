import React from 'react';
import { SiOpenai } from 'react-icons/si';

interface LogoProps {
    size?: number;
    color?: string;
    className?: string;
}

const OpenAILogo: React.FC<LogoProps> = ({ 
    size = 24, 
    color,
    className = '' 
}) => {
    return (
        <SiOpenai 
            size={size}
            color={color}
            className={className}
        />
    );
};

export default OpenAILogo;

