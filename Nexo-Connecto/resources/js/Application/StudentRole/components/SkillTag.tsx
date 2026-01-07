import React from 'react';
import { X } from 'lucide-react';

interface SkillTagProps {
    name: string;
    onRemove?: () => void;
    className?: string;
    showRemove?: boolean;
}

const SkillTag = ({ name, onRemove, className = '', showRemove = false }: SkillTagProps) => {
    return (
        <div
            className={`
                flex items-center gap-2 px-4 bg-white border border-gray-100 rounded-xl 
                text-sm font-semibold text-gray-700 shadow-sm transition-all 
                h-10 shrink-0 select-none
                ${showRemove ? 'group hover:border-[#CD5656]/40 hover:shadow-md' : 'hover:border-[#CD5656]/30 cursor-default'}
                ${className}
            `}
        >
            <span className="truncate max-w-[150px] font-outfit">{name}</span>
            
            {showRemove && onRemove && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    className="p-0.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-[#CD5656] transition-colors cursor-pointer"
                    type="button"
                >
                    <X className="w-3.5 h-3.5" />
                </button>
            )}
        </div>
    );
};

export default SkillTag;

