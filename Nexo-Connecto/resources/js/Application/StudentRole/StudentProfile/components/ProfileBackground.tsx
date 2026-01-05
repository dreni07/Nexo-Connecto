import React from 'react';

export default function ProfileBackground() {
    return (
        <>
            <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(circle at 15% 25%, rgba(205, 86, 86, 0.08) 0%, transparent 45%),
                        radial-gradient(circle at 85% 75%, rgba(218, 108, 108, 0.06) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(175, 62, 62, 0.05) 0%, transparent 55%)
                    `
                }}
            />
            
            <div className="absolute inset-0 pointer-events-none">
                <div 
                    className="absolute top-10 left-5 w-96 h-96 rounded-full blur-3xl opacity-[0.12]"
                    style={{ backgroundColor: '#CD5656' }}
                />
                <div 
                    className="absolute bottom-10 right-5 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-[0.10]"
                    style={{ backgroundColor: '#DA6C6C' }}
                />
                <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-[0.08]"
                    style={{ backgroundColor: '#AF3E3E' }}
                />
                
                <div 
                    className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-2xl opacity-[0.07]"
                    style={{ backgroundColor: '#CD5656' }}
                />
                <div 
                    className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full blur-2xl opacity-[0.06]"
                    style={{ backgroundColor: '#DA6C6C' }}
                />
            </div>
        </>
    );
}

