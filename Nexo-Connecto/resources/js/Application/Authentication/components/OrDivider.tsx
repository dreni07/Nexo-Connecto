import React from 'react';

export default function OrDivider() {
    return (
        <div className="flex items-center gap-4 my-2">
            <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}></div>
            <span className="text-sm text-muted-foreground font-outfit">or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}></div>
        </div>
    );
}

