import React, { useState, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TagInputProps {
    tags: string[];
    onTagsChange: (tags: string[]) => void;
    placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onTagsChange, placeholder = "Add a tag..." }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    const addTag = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue && !tags.includes(trimmedValue)) {
            onTagsChange([...tags, trimmedValue]);
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        onTagsChange(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="space-y-3 font-outfit">
            <div className="flex gap-2">
                <div className="relative flex-1 group">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#CD5656] focus:ring-4 focus:ring-[#CD5656]/5 transition-all text-gray-700 placeholder:text-gray-300"
                    />
                </div>
                <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all active:scale-95 flex items-center justify-center group"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    <span className="ml-2 font-bold text-sm">Add</span>
                </button>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[40px] p-1">
                <AnimatePresence>
                    {tags.length === 0 ? (
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-gray-400 italic py-2"
                        >
                            No tags added yet. Tags help people find your project.
                        </motion.p>
                    ) : (
                        tags.map((tag) => (
                            <motion.span
                                key={tag}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#CD5656]/10 text-[#CD5656] text-xs font-bold rounded-lg border border-[#CD5656]/20"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="hover:bg-[#CD5656] hover:text-white rounded-full p-0.5 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </motion.span>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TagInput;

