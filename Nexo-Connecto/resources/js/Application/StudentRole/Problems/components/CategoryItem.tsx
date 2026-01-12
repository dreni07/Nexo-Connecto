import React from 'react';
import { Category } from '../types';

interface Props {
    category: Category;
    isActive: boolean;
    onClick: (categoryId: number) => void;
}

const CategoryItem = ({ category, isActive, onClick }: Props) => {
    return (
        <button 
            onClick={() => onClick(category.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap shadow-sm border ${
                isActive 
                ? 'bg-[#CD5656] text-white border-[#CD5656]' 
                : 'bg-white text-gray-700 border-gray-200 hover:border-[#CD5656] hover:text-[#CD5656]'
            }`}
        >
            {category.category_name}
        </button>
    );
};

export default CategoryItem;

