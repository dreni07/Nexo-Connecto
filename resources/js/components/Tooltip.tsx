import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
    children: React.ReactElement;
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    backgroundColor?: string;
}

export default function Tooltip({ 
    children, 
    content, 
    position = 'top',
    delay = 200,
    backgroundColor = '#241010'
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const tooltipRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const showTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
            // Use requestAnimationFrame to ensure tooltip is rendered before calculating position
            requestAnimationFrame(() => {
                calculatePosition();
            });
        }, delay);
    };

    const hideTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    const calculatePosition = () => {
        if (!triggerRef.current || !tooltipRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();

        let top = 0;
        let left = 0;

        switch (position) {
            case 'top':
                top = triggerRect.top - tooltipRect.height - 8;
                left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'bottom':
                top = triggerRect.bottom + 8;
                // Center horizontally but ensure it doesn't go off-screen
                left = Math.max(
                    8, // Minimum 8px from left edge
                    Math.min(
                        triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2),
                        window.innerWidth - tooltipRect.width - 8 // Maximum: 8px from right edge
                    )
                );
                break;
            case 'left':
                top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
                left = triggerRect.left - tooltipRect.width - 8;
                break;
            case 'right':
                top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
                left = triggerRect.right + 8;
                break;
        }

        setTooltipPosition({ top, left });
    };

    useEffect(() => {
        if (isVisible && tooltipRef.current) {
            // Calculate position after tooltip is visible
            requestAnimationFrame(() => {
                calculatePosition();
            });
            
            const handleResize = () => {
                requestAnimationFrame(() => {
                    calculatePosition();
                });
            };
            const handleScroll = () => {
                requestAnimationFrame(() => {
                    calculatePosition();
                });
            };
            
            window.addEventListener('resize', handleResize);
            window.addEventListener('scroll', handleScroll, true);
            
            return () => {
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('scroll', handleScroll, true);
            };
        }
    }, [isVisible, position]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div 
            ref={triggerRef}
            className="relative inline-block"
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
        >
            {children}
            {isVisible && (
                <div
                    ref={tooltipRef}
                    className="fixed z-[9999] px-3 py-1.5 text-sm text-white rounded-lg pointer-events-none transition-opacity duration-200 font-outfit"
                    style={{
                        top: `${tooltipPosition.top}px`,
                        left: `${tooltipPosition.left}px`,
                        backgroundColor: backgroundColor,
                        whiteSpace: 'nowrap',
                    }}
                    role="tooltip"
                >
                    {content}
                    {/* Arrow */}
                    <div
                        className="absolute w-2 h-2 rotate-45"
                        style={{
                            backgroundColor: backgroundColor,
                            ...(position === 'top' && {
                                bottom: '-4px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }),
                            ...(position === 'bottom' && {
                                top: '-4px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }),
                            ...(position === 'left' && {
                                right: '-4px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                            }),
                            ...(position === 'right' && {
                                left: '-4px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                            }),
                        }}
                    />
                </div>
            )}
        </div>
    );
}
