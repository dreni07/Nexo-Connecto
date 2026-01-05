import React from 'react';
import { Building2, Plus, MapPin } from 'lucide-react';

interface Company {
    id: string;
    name: string;
    industry: string;
    location: string;
    logo?: string;
    level: 'Senior' | 'Middle' | 'Junior';
}

interface LetsConnectProps {
    companies?: Company[];
}

const mockCompanies: Company[] = [
    {
        id: '1',
        name: 'TechCorp Solutions',
        industry: 'Software Development',
        location: 'Prishtina, Kosovo',
        level: 'Senior',
    },
    {
        id: '2',
        name: 'Digital Innovations',
        industry: 'Web Development',
        location: 'Tirana, Albania',
        level: 'Middle',
    },
];

const levelColors = {
    Senior: { bg: 'rgba(205, 86, 86, 0.1)', text: '#CD5656', border: 'rgba(205, 86, 86, 0.2)' },
    Middle: { bg: 'rgba(0, 0, 0, 0.1)', text: '#2A2A2A', border: 'rgba(0, 0, 0, 0.2)' },
    Junior: { bg: 'rgba(0, 0, 0, 0.05)', text: '#2A2A2A', border: 'rgba(0, 0, 0, 0.15)' },
};

const LetsConnect: React.FC<LetsConnectProps> = ({ companies = mockCompanies }) => {
    return (
        <div 
            className="rounded-2xl p-6 transition-all duration-300 font-outfit h-full"
            style={{
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
            }}
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" style={{ color: '#CD5656' }} />
                    <h3 
                        className="text-lg font-semibold"
                        style={{ color: '#2A2A2A' }}
                    >
                        Let's Connect
                    </h3>
                </div>
                <button 
                    className="text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer"
                    style={{ color: '#CD5656' }}
                >
                    See all
                </button>
            </div>

            <div className="space-y-4">
                {companies.map((company) => {
                    const levelColor = levelColors[company.level];
                    return (
                        <div
                            key={company.id}
                            className="flex items-center justify-between p-4 rounded-xl border hover:shadow-sm transition-all cursor-pointer"
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                borderColor: 'rgba(0, 0, 0, 0.06)',
                            }}
                        >
                            <div className="flex items-center gap-3 flex-1">
                                <div 
                                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                                    style={{ backgroundColor: '#CD5656' }}
                                >
                                    {company.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <div 
                                        className="font-semibold text-sm mb-1"
                                        style={{ color: '#2A2A2A' }}
                                    >
                                        {company.name}
                                    </div>
                                    <div 
                                        className="text-xs mb-2"
                                        style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                                    >
                                        {company.industry}
                                    </div>
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" style={{ color: 'rgba(0, 0, 0, 0.4)' }} />
                                            <span 
                                                className="text-xs"
                                                style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                                            >
                                                {company.location}
                                            </span>
                                        </div>
                                        <span
                                            className="px-2 py-0.5 rounded-md text-xs font-medium"
                                            style={{
                                                backgroundColor: levelColor.bg,
                                                color: levelColor.text,
                                                border: `1px solid ${levelColor.border}`,
                                            }}
                                        >
                                            {company.level}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors ml-2 cursor-pointer"
                                style={{ 
                                    backgroundColor: 'rgba(205, 86, 86, 0.1)',
                                    color: '#CD5656',
                                }}
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LetsConnect;

