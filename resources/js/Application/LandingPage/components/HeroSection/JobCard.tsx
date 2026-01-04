import React from 'react';

interface JobCardProps {
    title: string;
    company: string;
    tags: string[];
    icon: 'facebook' | 'instagram' | 'twitter';
    position: 'left' | 'center' | 'right';
    zIndex?: string;
}

const JobCard: React.FC<JobCardProps> = ({ title, company, tags, icon, position, zIndex = 'z-10' }) => {
    const positionClasses = {
        left: 'left-[25%] top-[58%]',
        center: 'left-1/2 -translate-x-1/2 top-[60%]',
        right: 'right-[25%] top-[58%]',
    };

    const iconClasses = {
        facebook: 'fa fa-facebook',
        instagram: 'fa fa-instagram',
        twitter: 'fa fa-twitter',
    };

    const iconBgColors = {
        facebook: 'bg-blue-600',
        instagram: 'bg-pink-500',
        twitter: 'bg-blue-400',
    };

    return (
        <div className={`absolute ${positionClasses[position]} ${zIndex} w-64 bg-white rounded-2xl shadow-xl p-5 transform transition-all hover:scale-105 cursor-pointer`}>
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">{title}</h3>
                    <p className="text-sm text-gray-600">{company}</p>
                </div>
                <div className={`w-8 h-8 rounded-lg ${iconBgColors[icon]} flex items-center justify-center flex-shrink-0`}>
                    <i className={`${iconClasses[icon]} text-white text-sm`}></i>
                </div>
            </div>
            <div className="flex gap-2 overflow-x-hidden" style={{ whiteSpace: 'nowrap' }}>
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="px-2.5 py-1 text-xs font-medium rounded-md bg-cream text-gray-700 whitespace-nowrap flex-shrink-0"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default JobCard;

