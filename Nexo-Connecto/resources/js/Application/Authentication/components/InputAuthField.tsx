import React from 'react';

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
    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={id}
                className="sr-only"
            >
                {placeholder}
            </label>
            <input
                id={id}
                type={type}
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
        </div>
    );
}

