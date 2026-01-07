import React from 'react';

interface SearchResultItemProps {
    name: string;
    subText: string;
    avatar?: string;
    type: 'student' | 'company';
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ name, subText, avatar, type }) => {
    return (
        <div className="flex items-center gap-4 p-3.5 hover:bg-zinc-50 transition-all duration-200 cursor-pointer rounded-2xl group border border-transparent hover:border-zinc-100">
            <div className="relative h-11 w-11 flex-shrink-0">
                <div className="h-full w-full rounded-full overflow-hidden border border-zinc-200 group-hover:border-[#CD5656]/30 transition-colors">
                    {avatar ? (
                        <img 
                            src={`/storage/${avatar}`} 
                            alt={name} 
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="h-full w-full bg-gradient-to-br from-[#CD5656] to-[#E88B8B] flex items-center justify-center text-white text-xs font-bold">
                            {name.substring(0, 2).toUpperCase()}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-bold text-zinc-900 truncate group-hover:text-[#CD5656] transition-colors">
                    {name}
                </span>
                <span className="text-xs text-zinc-500 font-medium truncate opacity-70">
                    {subText}
                </span>
            </div>
        </div>
    );
};

export default SearchResultItem;
