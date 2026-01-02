import React from 'react';
import { Link } from '@inertiajs/react';
import { Info } from 'lucide-react';
import Tooltip from '@/components/Tooltip';

export default function AuthNavigation() {
    return (
        <>
            <nav className="relative z-20 flex items-center justify-between px-6 py-3 md:px-10 md:py-4 bg-transparent">
                <Link href="/" className="flex items-center">
                    <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-dark via-red to-coral bg-clip-text text-transparent font-outfit">
                        Nexo
                    </span>
                </Link>
                
                <Tooltip 
                    content="Click here for help" 
                    position="bottom"
                >
                    <button
                        type="button"
                        className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:opacity-80 active:scale-95"
                        style={{
                            backgroundColor: 'rgba(205, 86, 86, 0.1)',
                        }}
                        aria-label="Help"
                    >
                        <Info className="w-4 h-4" style={{ color: '#CD5656' }} />
                    </button>
                </Tooltip>
            </nav>
            
            <div 
                className="relative z-20 w-full"
                style={{ 
                    height: '2px',
                    backgroundColor: 'rgba(0, 0, 0, 0.06)',
                }}
            />
        </>
    );
}

