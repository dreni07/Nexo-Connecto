import React, { useState, useEffect } from 'react';

interface TypingTextProps {
    text: string;
    speed?: number; 
    onComplete?: () => void;
    className?: string;
}

export default function TypingText({ 
    text, 
    speed = 50, 
    onComplete,
    className = '' 
}: TypingTextProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (displayedText.length < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, speed);

            return () => clearTimeout(timer);
        } else if (!isComplete) {
            setIsComplete(true);
            onComplete?.();
        }
    }, [displayedText, text, speed, isComplete, onComplete]);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <span className={className}>
            {displayedText}
            <span 
                className="inline-block w-0.5 h-[1em] bg-foreground ml-1 align-middle origin-bottom"
                style={{ 
                    transform: showCursor ? 'scaleY(1)' : 'scaleY(0)',
                    transition: 'transform 0.3s ease-in-out',
                }}
            />
        </span>
    );
}

