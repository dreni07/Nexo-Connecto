import React from 'react';

const DecorativeLines = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-96 opacity-30" viewBox="0 0 1200 400">
                {/* Curved lines connecting elements */}
                <path
                    d="M 200 150 Q 400 100, 600 150 T 1000 150"
                    stroke="#DA6C6C"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                />
                <path
                    d="M 150 200 Q 350 180, 550 200 T 950 200"
                    stroke="#CD5656"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="3,3"
                />
                <path
                    d="M 250 100 Q 450 80, 650 100 T 1050 100"
                    stroke="#AF3E3E"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="4,4"
                />
                
                {/* Small connecting dots */}
                <circle cx="200" cy="150" r="3" fill="#DA6C6C" />
                <circle cx="600" cy="150" r="3" fill="#CD5656" />
                <circle cx="1000" cy="150" r="3" fill="#AF3E3E" />
                
                {/* Star-like decorative elements */}
                {[300, 500, 700, 900].map((x, i) => (
                    <g key={i} transform={`translate(${x}, ${120 + i * 20})`}>
                        <path
                            d="M 0 -8 L 2 -2 L 8 -2 L 3 1 L 5 7 L 0 4 L -5 7 L -3 1 L -8 -2 L -2 -2 Z"
                            fill="#EAEBD0"
                            opacity="0.6"
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default DecorativeLines;

