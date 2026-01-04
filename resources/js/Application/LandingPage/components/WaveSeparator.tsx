import React from 'react';

interface WaveSeparatorProps {
    waveColor?: string;
    strokeWidth?: number;
    variant?: 'flowing' | 'dynamic' | 'organic';
}

const WaveSeparator: React.FC<WaveSeparatorProps> = ({ 
    waveColor = '#ECEDE1',
    strokeWidth = 3,
    variant = 'flowing'
}) => {
    const wavePaths = {
        flowing: "M0,60 C180,20 360,100 540,60 C720,20 900,100 1080,60 C1260,20 1440,100 1440,60",
        dynamic: "M0,50 C200,10 400,90 600,50 C800,10 1000,90 1200,50 C1400,10 1440,50 1440,50",
        organic: "M0,60 Q120,20 240,60 T480,60 Q600,100 720,60 T960,60 Q1080,20 1200,60 T1440,60"
    };

    return (
        <div 
            className="relative w-full"
            style={{ height: '120px' }}
        >
            <svg
                className="w-full h-full"
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d={wavePaths[variant]}
                    fill="none"
                    stroke={waveColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

export default WaveSeparator;

