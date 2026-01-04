import React from 'react';

interface AuthSubmitButtonProps {
    text: string;
    processing: boolean;
    disabled?: boolean;
}

export default function AuthSubmitButton({ text, processing, disabled = false }: AuthSubmitButtonProps) {
    return (
        <button
            type="submit"
            disabled={processing || disabled}
            className="h-12 w-full rounded-lg text-white text-base font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer flex items-center justify-center gap-2 font-outfit"
            style={{ 
                backgroundColor: processing ? '#AF3E3E' : '#CD5656',
            }}
            onMouseEnter={(e) => {
                if (!processing && !disabled) {
                    e.currentTarget.style.backgroundColor = '#AF3E3E';
                }
            }}
            onMouseLeave={(e) => {
                if (!processing && !disabled) {
                    e.currentTarget.style.backgroundColor = '#CD5656';
                }
            }}
        >
            {processing && (
                <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            <span className="font-outfit">{text}</span>
        </button>
    );
}

