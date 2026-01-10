import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ImagePreviewModalProps {
    selectedImage: string | null;
    onClose: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ selectedImage, onClose }) => {
    return (
        <AnimatePresence>
            {selectedImage && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-20"
                >
                    <div 
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    
                    <motion.button 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={onClose}
                        className="absolute top-10 right-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center text-white transition-colors cursor-pointer"
                    >
                        <X className="w-6 h-6" />
                    </motion.button>

                    <motion.div 
                        layoutId={selectedImage}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="relative w-full h-full max-w-6xl flex items-center justify-center pointer-events-none"
                    >
                        <img 
                            src={`/storage/${selectedImage}`} 
                            alt="Large preview" 
                            className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl pointer-events-auto"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ImagePreviewModal;

