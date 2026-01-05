import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import type { University } from '../requests';
import { getUniversityLogo } from '../../../assets/universityLogos';
import { useProfileProgress } from '../context/ProfileProgressContext';

interface UniversitySearchProps {
    universities: University[];
    onUniversitySelect: (university: University | null) => void;
    selectedUniversity: University | null;
}

export default function UniversitySearch({ 
    universities, 
    onUniversitySelect, 
    selectedUniversity 
}: UniversitySearchProps) {
    const { setHasUniversity } = useProfileProgress();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUniversities, setFilteredUniversities] = useState<University[]>(universities);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredUniversities(universities);
        } else {
            const filtered = universities.filter(university =>
                university.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUniversities(filtered);
        }
    }, [searchQuery, universities]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setHasUniversity(selectedUniversity !== null);
    }, [selectedUniversity, setHasUniversity]);

    const handleUniversitySelect = (university: University) => {
        onUniversitySelect(university);
        setSearchQuery('');
        setIsSearchOpen(false);
    };

    const handleRemoveUniversity = () => {
        onUniversitySelect(null);
    };

    return (
        <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-foreground font-outfit">
                University
            </label>
            
            {!selectedUniversity ? (
                <div ref={searchRef} className="relative">
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            <Search className="w-4 h-4" style={{ color: '#666' }} />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setIsSearchOpen(true);
                            }}
                            placeholder="Search for your university..."
                            className="w-full h-12 pl-10 pr-4 rounded-xl border text-base text-foreground placeholder:text-muted-foreground transition-all duration-300 ease-out focus:outline-none focus:ring-0 font-outfit"
                            style={{
                                backgroundColor: '#F8F9F3',
                                borderColor: 'rgba(0, 0, 0, 0.08)',
                                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
                            }}
                            onFocus={(e) => {
                                setIsSearchOpen(true);
                                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                                e.currentTarget.style.boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.08), 0 0 0 3px rgba(205, 86, 86, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                                e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.03)';
                            }}
                        />
                    </div>

                    {isSearchOpen && filteredUniversities.length > 0 && (
                        <div
                            className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-white/30 max-h-96 overflow-y-auto custom-scrollbar"
                            style={{
                                boxShadow: '0 10px 38px -10px rgba(22, 23, 24, 0.35), 0 10px 20px -15px rgba(22, 23, 24, 0.2)',
                            }}
                        >
                            {filteredUniversities.map((university) => {
                                const logo = getUniversityLogo(university.logo);
                                return (
                                    <button
                                        key={university.id}
                                        type="button"
                                        onClick={() => handleUniversitySelect(university)}
                                        className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0 cursor-pointer"
                                    >
                                        {logo && (
                                            <img
                                                src={logo}
                                                alt={university.name}
                                                className="w-12 h-12 object-contain flex-shrink-0"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-foreground font-outfit truncate">
                                                {university.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground font-outfit">
                                                {university.location}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-4 p-4 rounded-xl border" style={{ backgroundColor: '#F8F9F3', borderColor: 'rgba(0, 0, 0, 0.08)' }}>
                    {(() => {
                        const logo = getUniversityLogo(selectedUniversity.logo);
                        return logo ? (
                            <img
                                src={logo}
                                alt={selectedUniversity.name}
                                className="w-16 h-16 object-contain flex-shrink-0"
                            />
                        ) : null;
                    })()}
                    <div className="flex-1 min-w-0">
                        <p className="text-base font-medium text-foreground font-outfit">
                            {selectedUniversity.name}
                        </p>
                        <p className="text-sm text-muted-foreground font-outfit">
                            {selectedUniversity.location}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleRemoveUniversity}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>
            )}
        </div>
    );
}

