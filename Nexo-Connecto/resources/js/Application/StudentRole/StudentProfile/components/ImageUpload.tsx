import React, { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import Tooltip from '../../../../components/Tooltip';

interface ImageUploadProps {
    value?: string | null;
    onChange: (file: File | null) => void;
    className?: string;
}

export default function ImageUpload({
    value,
    onChange,
    className = '',
}: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(value || null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileSelect = (file: File | null) => {
        if (file) {
            if (file.type.startsWith('image/')) {
                onChange(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
        } else {
            onChange(null);
            setPreview(null);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        handleFileSelect(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0] || null;
        handleFileSelect(file);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    return (
        <div className={`flex flex-col items-center ${className}`}>
           
                <div
                    onClick={handleClick}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`
                        relative w-32 h-32 rounded-full overflow-hidden cursor-pointer
                        transition-all duration-300 ease-out
                        ${isDragging ? 'scale-105' : 'hover:scale-105'}
                    `}
                    style={{
                        background: preview 
                            ? 'transparent' 
                            : 'linear-gradient(135deg, rgba(205, 86, 86, 0.08) 0%, rgba(218, 108, 108, 0.05) 100%)',
                        border: preview ? 'none' : '3px dashed rgba(205, 86, 86, 0.5)',
                        boxShadow: isDragging
                            ? '0 8px 24px rgba(205, 86, 86, 0.2), 0 0 0 4px rgba(205, 86, 86, 0.1)'
                            : '0 4px 12px rgba(205, 86, 86, 0.1)',
                    }}
                >
                {/* Dotted border overlay for circular effect */}
                {!preview && (
                    <svg 
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        style={{ opacity: 0.6 }}
                    >
                        <circle
                            cx="50%"
                            cy="50%"
                            r="calc(50% - 4px)"
                            fill="none"
                            stroke="rgba(205, 86, 86, 0.6)"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            strokeLinecap="round"
                        />
                    </svg>
                )}

                {preview && (
                    <img
                        src={preview}
                        alt="Profile preview"
                        className="w-full h-full object-cover rounded-full"
                    />
                )}

                {!preview && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Camera 
                            className="w-8 h-8"
                            style={{ color: '#CD5656' }}
                        />
                    </div>
                )}

                {preview && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-full">
                        <Camera 
                            className="w-8 h-8 text-white"
                        />
                    </div>
                )}
                </div>
         

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
}

