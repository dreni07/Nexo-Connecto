import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface SelectOption {
    value: string | number;
    label: string;
}

interface CustomSelectProps {
    options: SelectOption[];
    selectedValue: string | number | null | '';
    onValueChange: (value: string | number | null) => void;
    placeholder?: string;
    label?: string;
    searchable?: boolean;
    searchPlaceholder?: string;
    disabled?: boolean;
}

export default function CustomSelect({
    options,
    selectedValue,
    onValueChange,
    placeholder = 'Select an option',
    label,
    searchable = false,
    searchPlaceholder = 'Search...',
    disabled = false,
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOptions, setFilteredOptions] = useState<SelectOption[]>(options);
    const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(option => option.value === selectedValue);

    useEffect(() => {
        if (searchable) {
            if (searchQuery.trim() === '') {
                setFilteredOptions(options);
            } else {
                const filtered = options.filter(option =>
                    option.label.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setFilteredOptions(filtered);
            }
        }
    }, [searchQuery, options, searchable]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                if (searchable) {
                    setSearchQuery('');
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [searchable]);

    useEffect(() => {
        if (isOpen && dropdownRef.current) {
            requestAnimationFrame(() => {
                if (dropdownRef.current) {
                    const rect = dropdownRef.current.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    const spaceBelow = viewportHeight - rect.bottom - 8;
                    const spaceAbove = rect.top;
                    
                    const minSpace = 100;
                    const maxDropdownHeight = searchable ? 320 : 256;
                    
                    // Calculate available space (subtract padding for bottom edge)
                    const padding = 20;
                    const availableSpace = Math.max(spaceBelow - padding, 150); // Minimum 150px
                    
                    // If not enough space below, use calculated available space
                    if (spaceBelow < minSpace) {
                        setMaxHeight(Math.min(availableSpace, maxDropdownHeight));
                    } else {
                        // Enough space below - use standard max height or available space if smaller
                        setMaxHeight(Math.min(availableSpace, maxDropdownHeight));
                    }
                }
            });
        } else {
            setMaxHeight(undefined);
        }
    }, [isOpen, searchable]);

    const handleSelect = (value: string | number) => {
        onValueChange(value);
        setIsOpen(false);
        if (searchable) {
            setSearchQuery('');
        }
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onValueChange(null);
        if (searchable) {
            setSearchQuery('');
        }
    };

    const displayOptions = searchable ? filteredOptions : options;

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className={`flex flex-col gap-2 ${disabled ? 'opacity-60 grayscale-[0.5]' : ''}`}>
            {label && (
                <label className="text-sm font-medium text-foreground font-outfit">
                    {label}
                </label>
            )}
            <div ref={dropdownRef} className="relative">
                {!selectedOption ? (
                    <button
                        type="button"
                        onClick={handleToggle}
                        disabled={disabled}
                        className={`w-full h-12 px-4 rounded-xl border text-base text-foreground transition-all duration-300 ease-out focus:outline-none focus:ring-0 font-outfit flex items-center justify-between ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        style={{
                            backgroundColor: '#F8F9F3',
                            borderColor: 'rgba(0, 0, 0, 0.08)',
                            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                            e.currentTarget.style.boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.08), 0 0 0 3px rgba(205, 86, 86, 0.1)';
                        }}
                        onBlur={(e) => {
                            if (!isOpen) {
                                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                                e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.03)';
                            }
                        }}
                    >
                        <span className="text-muted-foreground font-outfit">{placeholder}</span>
                        <ChevronDown
                            className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                                isOpen ? 'transform rotate-180' : ''
                            }`}
                        />
                    </button>
                ) : (
                    <div
                        className="w-full min-h-[48px] px-4 py-3 rounded-xl border flex items-center justify-between gap-3"
                        style={{
                            backgroundColor: '#F8F9F3',
                            borderColor: 'rgba(0, 0, 0, 0.08)',
                            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
                        }}
                    >
                        <span className="text-base text-foreground font-outfit flex-1 text-left">
                            {selectedOption.label}
                        </span>
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
                            aria-label="Clear selection"
                        >
                            <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                    </div>
                )}

                {isOpen && (
                    <div
                        ref={dropdownMenuRef}
                        className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-white/30 overflow-hidden flex flex-col"
                        style={{
                            boxShadow: '0 10px 38px -10px rgba(22, 23, 24, 0.35), 0 10px 20px -15px rgba(22, 23, 24, 0.2)',
                            maxHeight: maxHeight !== undefined ? `${maxHeight}px` : (searchable ? '320px' : 'auto'),
                        }}
                    >
                        {searchable && (
                            <div className="p-3 border-b border-gray-100">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={searchPlaceholder}
                                    className="w-full h-9 px-3 rounded-lg border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500/20 font-outfit"
                                    style={{
                                        backgroundColor: '#F8F9F3',
                                        borderColor: 'rgba(0, 0, 0, 0.08)',
                                    }}
                                    autoFocus
                                />
                            </div>
                        )}
                        <div 
                            className={`overflow-y-auto ${searchable ? 'custom-scrollbar' : ''}`}
                            style={{
                                maxHeight: maxHeight !== undefined 
                                    ? `${maxHeight - (searchable ? 60 : 0)}px` 
                                    : (searchable ? '256px' : undefined),
                            }}
                        >
                            {displayOptions.length > 0 ? (
                                displayOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => handleSelect(option.value)}
                                        className={`w-full flex items-center px-4 py-3 text-left transition-colors border-b border-gray-50 last:border-b-0 font-outfit cursor-pointer ${
                                            selectedValue === option.value
                                                ? 'bg-red-50'
                                                : 'hover:bg-gray-50'
                                        }`}
                                        style={{
                                            color: selectedValue === option.value ? '#CD5656' : '#333',
                                        }}
                                    >
                                        <span className="text-sm font-medium">{option.label}</span>
                                    </button>
                                ))
                            ) : (
                                <div className="px-4 py-6 text-center text-sm text-muted-foreground font-outfit">
                                    No options found
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

