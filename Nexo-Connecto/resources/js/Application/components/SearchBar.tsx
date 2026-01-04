import React, { useState } from 'react';
import { Search, ChevronDown, Building2, GraduationCap } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export type SearchType = 'Companies' | 'Students';

interface SearchBarProps {
    onSearch?: (query: string, type: SearchType) => void;
    className?: string;
}

export default function SearchBar({ 
    onSearch,
    className = '' 
}: SearchBarProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState<SearchType>('Companies');
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch?.(searchQuery, searchType);
    };

    const handleTypeChange = (type: SearchType) => {
        setSearchType(type);
    };

    return (
        <form 
            onSubmit={handleSearch}
            className={`relative flex items-center ${className}`}
        >
            <div 
                className="relative flex items-center rounded-lg transition-all duration-200"
                style={{
                    backgroundColor: isFocused ? '#FFFFFF' : '#F8F9F3',
                    border: `1px solid ${isFocused ? 'rgba(205, 86, 86, 0.3)' : 'rgba(0, 0, 0, 0.08)'}`,
                    boxShadow: isFocused 
                        ? '0 2px 8px 0 rgba(0, 0, 0, 0.08), 0 0 0 3px rgba(205, 86, 86, 0.1)' 
                        : '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
                }}
            >
                <div className="flex items-center pl-3">
                    <Search className="w-4 h-4" style={{ color: '#666' }} />
                </div>
                
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Search..."
                    className="h-10 px-3 py-2 bg-transparent border-0 outline-none text-sm font-outfit placeholder:text-muted-foreground flex-1 min-w-0"
                    style={{ color: '#333', width: '280px' }}
                />

                <div className="flex items-center border-l pr-1" style={{ borderColor: 'rgba(0, 0, 0, 0.08)' }}>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <button
                                type="button"
                                className="flex items-center justify-center gap-1.5 px-3 py-2 h-10 text-sm font-outfit transition-colors hover:bg-gray-50 rounded-r-lg cursor-pointer outline-none"
                                style={{ 
                                    color: '#333',
                                    width: '110px',
                                    minWidth: '110px',
                                }}
                            >
                                <span className="truncate">{searchType === 'Companies' ? 'Companies' : 'Students'}</span>
                                <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" />
                            </button>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Portal>
                            <DropdownMenu.Content
                                className="min-w-[160px] bg-white rounded-lg shadow-lg p-1 z-50"
                                style={{
                                    boxShadow: '0 10px 38px -10px rgba(22, 23, 24, 0.35), 0 10px 20px -15px rgba(22, 23, 24, 0.2)',
                                    animation: 'dropdownFadeIn 0.2s ease-out',
                                }}
                                sideOffset={5}
                                align="end"
                            >
                                <style>{`
                                    @keyframes dropdownFadeIn {
                                        from {
                                            opacity: 0;
                                            transform: translateY(-8px) scale(0.95);
                                        }
                                        to {
                                            opacity: 1;
                                            transform: translateY(0) scale(1);
                                        }
                                    }
                                `}</style>
                                
                                <DropdownMenu.Item asChild>
                                    <button
                                        type="button"
                                        onClick={() => handleTypeChange('Companies')}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer outline-none font-outfit ${
                                            searchType === 'Companies' ? 'bg-gray-50' : ''
                                        }`}
                                        style={{
                                            color: '#333',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (searchType !== 'Companies') {
                                                e.currentTarget.style.backgroundColor = '#F8F9F3';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (searchType !== 'Companies') {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                            }
                                        }}
                                    >
                                        <Building2 className="w-4 h-4" style={{ color: '#CD5656' }} />
                                        <span>Companies</span>
                                    </button>
                                </DropdownMenu.Item>

                                <DropdownMenu.Item asChild>
                                    <button
                                        type="button"
                                        onClick={() => handleTypeChange('Students')}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer outline-none font-outfit ${
                                            searchType === 'Students' ? 'bg-gray-50' : ''
                                        }`}
                                        style={{
                                            color: '#333',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (searchType !== 'Students') {
                                                e.currentTarget.style.backgroundColor = '#F8F9F3';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (searchType !== 'Students') {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                            }
                                        }}
                                    >
                                        <GraduationCap className="w-4 h-4" style={{ color: '#CD5656' }} />
                                        <span>Students</span>
                                    </button>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                </div>
            </div>
        </form>
    );
}

