import React from 'react';
import Modal from 'react-modal';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    maxWidth?: string;
    className?: string;
}

export default function CustomModal({ isOpen, onClose, children, title, maxWidth, className }: ModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={title || 'Modal'}
            className={className || "modal-content"}
            overlayClassName="modal-overlay"
            ariaHideApp={false}
            style={{
                content: {
                    maxWidth: maxWidth || '90vw',
                    width: maxWidth ? '100%' : 'auto',
                }
            }}
        >
            {title && (
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold font-outfit text-gray-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 group"
                        aria-label="Close modal"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-8 w-8 text-gray-400 group-hover:text-gray-600 transition-colors" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
            {children}
        </Modal>
    );
}

