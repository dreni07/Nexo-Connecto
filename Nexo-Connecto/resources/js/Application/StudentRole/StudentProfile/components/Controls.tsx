import React from 'react';
import { ControlStatus, CONTROLS_CONFIG } from '../config/controlsConfig';

interface ControlsProps {
    activeControl: ControlStatus;
    onControlChange: (control: ControlStatus) => void;
    onRightClick: (e: React.MouseEvent, control: Exclude<ControlStatus, null>, label: string) => void;
}

const Controls: React.FC<ControlsProps> = ({ activeControl, onControlChange, onRightClick }) => {
    return (
        <div className="flex flex-wrap items-center gap-3 p-0 bg-transparent border-none">
            {CONTROLS_CONFIG.map((control) => (
                <button
                    key={control.id}
                    onClick={() => onControlChange(activeControl === control.id ? null : control.id)}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        onRightClick(e, control.id, control.label);
                    }}
                    className={`
                        flex-1 min-w-[140px] flex items-center justify-center gap-3 px-4 py-3 rounded-xl
                        transition-all duration-300 font-outfit font-medium text-sm cursor-pointer
                        ${activeControl === control.id 
                            ? `${control.activeBg} ${control.textColor} shadow-md scale-[1.02] border-2 ${control.borderColor}` 
                            : 'bg-white text-gray-500 border border-gray-100 hover:border-gray-200 hover:bg-gray-50 hover:text-gray-700 shadow-sm'}
                    `}
                >
                    <div className={`w-3 h-3 rounded-full shadow-sm ${control.color} ${activeControl === control.id ? 'animate-pulse' : ''}`} />
                    {control.label}
                </button>
            ))}
        </div>
    );
};

export default Controls;

