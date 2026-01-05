import React from 'react';

interface YearTabsProps {
    maxYear: number;
    activeYearTab: number;
    onTabChange: (year: number) => void;
}

const YearTabs: React.FC<YearTabsProps> = ({ maxYear, activeYearTab, onTabChange }) => {
    if (maxYear <= 1) return null;

    return (
        <div className="flex items-center gap-2 mb-6 p-1 bg-white/40 backdrop-blur-sm rounded-xl border border-gray-200/50 w-fit flex-shrink-0">
            {Array.from({ length: maxYear }, (_, i) => i + 1).map((year) => (
                <button
                    key={year}
                    onClick={() => onTabChange(year)}
                    className={`
                        px-5 py-2 rounded-lg font-outfit font-semibold text-sm transition-all duration-300
                        ${activeYearTab === year 
                            ? 'bg-gray-900 text-white shadow-md' 
                            : 'text-gray-500 hover:text-gray-800 hover:bg-white/50 cursor-pointer'}
                    `}
                >
                    Year {year}
                </button>
            ))}
        </div>
    );
};

export default YearTabs;

