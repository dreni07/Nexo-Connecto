import React from 'react';
import { Company } from '../types';

interface Props {
    company: Company;
}

const TrendingCompanyItem = ({ company }: Props) => {
    return (
        <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                    {company.company_pictures && company.company_pictures[0] ? (
                        <img src={company.company_pictures[0]} alt={company.company_name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-[10px] font-bold text-gray-400">{company.company_name.substring(0, 2).toUpperCase()}</span>
                    )}
                </div>
                <span className="text-sm font-medium text-gray-600 group-hover:text-[#CD5656] transition-colors truncate max-w-[120px]">{company.company_name}</span>
            </div>
            <span className="text-[10px] font-bold bg-gray-50 text-gray-400 px-2 py-1 rounded-full group-hover:bg-[#CD5656]/5 group-hover:text-[#CD5656] transition-all">
                {Math.floor(Math.random() * 2000) + 100}
            </span>
        </div>
    );
};

export default TrendingCompanyItem;

