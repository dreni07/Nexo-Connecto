import React from 'react';

interface TextInputProps {
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    label?: string;
    required?: boolean;
    multiline?: boolean;
    rows?: number;
    maxLength?: number;
    className?: string;
}

export default function TextInput({
    id,
    name,
    value,
    onChange,
    placeholder,
    label,
    required = false,
    multiline = false,
    rows = 4,
    maxLength,
    className = '',
}: TextInputProps) {
    const baseStyles = {
        backgroundColor: '#F8F9F3',
        borderColor: 'rgba(0, 0, 0, 0.08)',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    };

    const focusStyles = {
        borderColor: 'rgba(0, 0, 0, 0.2)',
        boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.08), 0 0 0 3px rgba(205, 86, 86, 0.1)',
        transform: 'translateY(-1px)',
    };

    const hoverStyles = {
        borderColor: 'rgba(0, 0, 0, 0.12)',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
    };

    const InputComponent = multiline ? 'textarea' : 'input';

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-foreground font-outfit"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <InputComponent
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                maxLength={maxLength}
                rows={multiline ? rows : undefined}
                className={`
                    w-full rounded-xl border px-4 py-3 text-base text-foreground 
                    placeholder:text-muted-foreground transition-all duration-300 ease-out 
                    focus:outline-none focus:ring-0 font-outfit resize-none
                    ${multiline ? 'min-h-[100px]' : 'h-12'}
                `}
                style={baseStyles}
                onFocus={(e) => {
                    Object.assign(e.currentTarget.style, focusStyles);
                }}
                onBlur={(e) => {
                    Object.assign(e.currentTarget.style, baseStyles);
                    e.currentTarget.style.transform = 'translateY(0)';
                }}
                onMouseEnter={(e) => {
                    if (document.activeElement !== e.currentTarget) {
                        Object.assign(e.currentTarget.style, hoverStyles);
                    }
                }}
                onMouseLeave={(e) => {
                    if (document.activeElement !== e.currentTarget) {
                        Object.assign(e.currentTarget.style, baseStyles);
                    }
                }}
            />
            {maxLength && (
                <div className="text-xs text-muted-foreground text-right">
                    {value.length} / {maxLength}
                </div>
            )}
        </div>
    );
}

