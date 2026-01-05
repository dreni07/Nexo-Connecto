import React from 'react';
import { SiGoogle } from 'react-icons/si';
import { FaMicrosoft } from 'react-icons/fa';

export default function OAuthButtons() {
    
    const handleGoogleOAuth = () => {
        window.location.href = '/auth/google';
    };

    const handleMicrosoftOAuth = () => {
        window.location.href = '/auth/microsoft';
    };

    return (
        <div className="flex gap-3">
            <button
                type="button"
                onClick={handleGoogleOAuth}
                className="flex h-12 flex-1 items-center justify-center rounded-lg border text-base font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm cursor-pointer font-outfit"
                style={{ 
                    borderColor: '#CD5656',
                    backgroundColor: 'transparent',
                    color: '#CD5656',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#CD5656';
                    e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#CD5656';
                }}
            >
                <SiGoogle
                    className="mr-2 h-5 w-5"
                    aria-hidden="true"
                />
                <span className="font-outfit">Google</span>
            </button>
            <button
                type="button"
                onClick={handleMicrosoftOAuth}
                className="flex h-12 flex-1 items-center justify-center rounded-lg border text-base font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm cursor-pointer font-outfit"
                style={{ 
                    borderColor: '#CD5656',
                    backgroundColor: 'transparent',
                    color: '#CD5656',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#CD5656';
                    e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#CD5656';
                }}
            >
                <FaMicrosoft
                    className="mr-2 h-5 w-5"
                    aria-hidden="true"
                />
                <span className="font-outfit">Microsoft</span>
            </button>
        </div>
    );
}

