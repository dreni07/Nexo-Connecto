import React from 'react';
import { ControlStatus, getStatusStyles } from '../config/controlsConfig';

interface ClassCardProps {
    name: string;
    status: ControlStatus;
    onClick: () => void;
    activeControl: ControlStatus;
}

const ClassCard: React.FC<ClassCardProps> = ({ name, status, onClick, activeControl }) => {
    return (
        <div
            onClick={onClick}
            className={`
                p-4 rounded-xl transition-all duration-200 
                cursor-pointer select-none font-medium text-center
                flex flex-col items-center justify-center gap-2
                h-[110px] w-full shadow-sm
                ${getStatusStyles(status)}
                ${activeControl ? 'hover:scale-[1.02] active:scale-[0.98]' : 'cursor-default'}
            `}
        >
            <p className="font-outfit text-sm md:text-base leading-tight line-clamp-2">
                {name || 'Unknown Subject'}
            </p>
            <div className="h-5 flex items-center justify-center">
                {status && (
                    <div className="flex items-center gap-1.5 animate-in fade-in zoom-in duration-200">
                        <div className={`w-2 h-2 rounded-full ${
                            status === 'finished' ? 'bg-green-500' : 
                            status === 'taking' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <span className="text-[10px] uppercase tracking-wider font-bold opacity-60">
                            {status.replace('_', ' ')}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassCard;

