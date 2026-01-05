import React, { useEffect, useRef } from 'react';

interface ContextMenuProps {
    x: number;
    y: number;
    onClose: () => void;
    onMarkAll: () => void;
    label: string;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, onMarkAll, label }) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div 
            ref={menuRef}
            className="fixed z-[2000] bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[200px] animate-in fade-in zoom-in duration-150"
            style={{ top: y, left: x }}
        >
            <button
                onClick={() => {
                    onMarkAll();
                    onClose();
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-outfit font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer text-left"
            >
                <div className="w-4 h-4 rounded-full border-2 border-gray-900 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-900 rounded-full" />
                </div>
                Mark All as {label}
            </button>
        </div>
    );
};

export default ContextMenu;

