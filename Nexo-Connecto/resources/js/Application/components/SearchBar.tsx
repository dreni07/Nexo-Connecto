import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Building2, GraduationCap, Loader2, X } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import SearchResultItem from './SearchBar/SearchResultItem';
import { searchEntities } from './SearchBar/requests';

export type SearchType = 'Companies' | 'Students';

interface SearchBarProps {
    className?: string;
}

export default function SearchBar({ 
    className = '' 
}: SearchBarProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState<SearchType>('Companies');
    const [isFocused, setIsFocused] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const performSearch = async (query: string, type: SearchType) => {
        if (query.trim().length < 2) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        setIsLoading(true);
        setIsOpen(true);
        const typeParam = type === 'Students' ? 'student' : 'company';
        const searchResults = await searchEntities(query, typeParam);
        setResults(searchResults);
        setIsLoading(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery) {
                performSearch(searchQuery, searchType);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, searchType]);

    const handleTypeChange = (type: SearchType) => {
        setSearchType(type);
        if (searchQuery) {
            performSearch(searchQuery, type);
        }
    };

    return (
        <div ref={containerRef} className={`relative w-[480px] ${className}`}>
            <div 
                className="relative flex items-center h-11 rounded-2xl transition-all duration-300 group overflow-hidden"
                style={{
                    backgroundColor: '#FFFFFF',
                    border: `1px solid ${isFocused ? 'rgba(205, 86, 86, 0.4)' : 'rgba(0, 0, 0, 0.08)'}`,
                    boxShadow: isFocused 
                        ? '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 0 0 4px rgba(205, 86, 86, 0.1)' 
                        : '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
                }}
            >
                <div className="flex items-center pl-4 flex-shrink-0">
                    <Search className={`w-4 h-4 transition-colors duration-300 ${isFocused ? 'text-[#CD5656]' : 'text-zinc-400'}`} />
                </div>
                
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Search..."
                    className="h-10 px-3 py-2 bg-transparent border-0 outline-none text-sm font-outfit placeholder:text-muted-foreground flex-1 min-w-0"
                    style={{ color: '#333', minWidth: '120px' }}
                />

                <div className="flex items-center border-l pr-1" style={{ borderColor: 'rgba(0, 0, 0, 0.08)' }}>
                <div className="relative flex-1 flex items-center min-w-0">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => {
                            setIsFocused(true);
                            if (results.length > 0 || isLoading) setIsOpen(true);
                        }}
                        placeholder="Search for people or companies..."
                        className="h-full w-full px-3 py-2 bg-transparent border-0 outline-none text-sm font-medium placeholder:text-zinc-400"
                        style={{ color: '#18181B' }}
                    />

                    <AnimatePresence>
                        {searchQuery && (
                            <motion.button 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={() => {
                                    setSearchQuery('');
                                    setResults([]);
                                    setIsOpen(false);
                                }}
                                className="absolute right-2 p-1 text-zinc-400 hover:text-zinc-600 transition-colors"
                            >
                                <X className="w-3.5 h-3.5" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex items-center border-l border-zinc-200/50 pr-1 flex-shrink-0">
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <button
                                type="button"
                                className="flex items-center justify-center gap-1.5 px-2 md:px-3 py-2 h-10 text-xs md:text-sm font-outfit transition-colors hover:bg-gray-50 rounded-r-lg cursor-pointer outline-none"
                                style={{ 
                                    color: '#333',
                                    minWidth: '80px',
                                }}
                                className="flex items-center justify-center gap-2 px-4 py-2 h-11 text-xs font-semibold text-zinc-600 transition-all hover:bg-zinc-100/50 rounded-r-2xl cursor-pointer outline-none active:scale-95"
                            >
                                <span className="truncate">{searchType}</span>
                                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                            </button>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Portal>
                            <DropdownMenu.Content
                                className="min-w-[180px] bg-white rounded-2xl shadow-2xl p-1.5 z-[100] border border-zinc-100"
                                sideOffset={8}
                                align="end"
                            >
                                <DropdownMenu.Item asChild>
                                    <button
                                        type="button"
                                        onClick={() => handleTypeChange('Companies')}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer outline-none ${
                                            searchType === 'Companies' ? 'bg-[#CD5656]/10 text-[#CD5656]' : 'text-zinc-600 hover:bg-zinc-50'
                                        }`}
                                    >
                                        <Building2 className={`w-4 h-4 ${searchType === 'Companies' ? 'text-[#CD5656]' : 'text-zinc-400'}`} />
                                        <span>Companies</span>
                                    </button>
                                </DropdownMenu.Item>

                                <DropdownMenu.Item asChild>
                                    <button
                                        type="button"
                                        onClick={() => handleTypeChange('Students')}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer outline-none ${
                                            searchType === 'Students' ? 'bg-[#CD5656]/10 text-[#CD5656]' : 'text-zinc-600 hover:bg-zinc-50'
                                        }`}
                                    >
                                        <GraduationCap className={`w-4 h-4 ${searchType === 'Students' ? 'text-[#CD5656]' : 'text-zinc-400'}`} />
                                        <span>Students</span>
                                    </button>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, height: 0, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, height: 'auto', scale: 1 }}
                        exit={{ opacity: 0, y: -20, height: 0, scale: 0.95 }}
                        transition={{ 
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-zinc-100 overflow-hidden z-50 origin-top"
                    >
                        <div className="p-3 max-h-[450px] overflow-y-auto scrollbar-hide">
                            <div className="flex items-center justify-between px-3 py-2 mb-2 border-b border-zinc-50">
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                    {isLoading ? 'Searching...' : `Found ${results.length} ${searchType.toLowerCase()}`}
                                </span>
                            </div>

                            {isLoading && results.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-12 gap-3">
                                    <Loader2 className="w-6 h-6 text-[#CD5656] animate-spin" />
                                    <p className="text-sm text-zinc-400 font-medium">Scanning our network...</p>
                                </div>
                            )}

                            {!isLoading && results.length === 0 && searchQuery && (
                                <div className="flex flex-col items-center justify-center py-12 gap-2 text-center px-6">
                                    <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center mb-2">
                                        <Search className="w-5 h-5 text-zinc-300" />
                                    </div>
                                    <p className="text-sm font-semibold text-zinc-900">No results found</p>
                                    <p className="text-xs text-zinc-500">We couldn't find any {searchType.toLowerCase()} matching "{searchQuery}"</p>
                                </div>
                            )}

                            <div className="grid gap-1">
                                {results.map((item) => (
                                    <SearchResultItem 
                                        key={item.id}
                                        name={item.name}
                                        subText={item.sub_text}
                                        avatar={item.avatar}
                                        type={item.type}
                                    />
                                ))}
                            </div>
                        </div>
                        
                        {results.length > 0 && (
                            <div className="p-3 bg-zinc-50/50 border-top border-zinc-50 text-center">
                                <button className="text-xs font-bold text-[#CD5656] hover:text-[#B44B4B] transition-colors">
                                    View all results
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
