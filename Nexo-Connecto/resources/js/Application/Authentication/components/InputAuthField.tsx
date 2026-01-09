import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputAuthFieldProps {
    id: string;
    name: string;
    type: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    autoComplete?: string;
    autoFocus?: boolean;
    required?: boolean;
    ariaLabel?: string;
}

export default function InputAuthField({
    id,
    name,
    type,
    value,
    onChange,
    placeholder,
    autoComplete,
    autoFocus = false,
    required = true,
    ariaLabel,
}: InputAuthFieldProps) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={id}
                className="sr-only"
            >
                {placeholder}
            </label>
            <div className="relative">
                <input
                    id={id}
                    type={inputType}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    autoFocus={autoFocus}
                    autoComplete={autoComplete}
                    className="h-12 w-full rounded-xl border px-4 text-base text-foreground placeholder:text-muted-foreground transition-all duration-300 ease-out focus:outline-none focus:ring-0 font-outfit"
                    style={{
                        backgroundColor: '#F8F9F3',
                        borderColor: 'rgba(0, 0, 0, 0.08)',
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
                        paddingRight: isPassword ? '3rem' : '1rem',
                    }}
                    onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                        e.currentTarget.style.boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.08), 0 0 0 3px rgba(205, 86, 86, 0.1)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                        e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.03)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    onMouseEnter={(e) => {
                        if (document.activeElement !== e.currentTarget) {
                            e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
                            e.currentTarget.style.boxShadow = '0 2px 4px 0 rgba(0, 0, 0, 0.05)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (document.activeElement !== e.currentTarget) {
                            e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                            e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.03)';
                        }
                    }}
                    aria-label={ariaLabel || placeholder}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none rounded-md p-1 cursor-pointer"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <EyeOff className="w-4 h-4" style={{ color: 'rgba(0, 0, 0, 0.4)' }} />
                        ) : (
                            <Eye className="w-4 h-4" style={{ color: 'rgba(0, 0, 0, 0.4)' }} />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}

