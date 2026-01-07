import React from 'react';
import { ChevronDown } from 'lucide-react';

interface Connection {
    id: number;
    name: string;
    role: string;
    company: string;
    avatar: string;
    companyLogo: string;
}

const dummyConnections: Connection[] = [
    {
        id: 1,
        name: 'Ahamd Ekstrom Bothman',
        role: 'Future Program Designer',
        company: 'Google',
        avatar: 'https://ui-avatars.com/api/?name=Ahamd+Ekstrom+Bothman&background=random&color=fff',
        companyLogo: 'https://placehold.co/40x40/png?text=G'
    },
    {
        id: 2,
        name: 'Sheldon Langosh',
        role: 'Dynamic Directives Architect',
        company: 'Freshbooks',
        avatar: 'https://ui-avatars.com/api/?name=Sheldon+Langosh&background=random&color=fff',
        companyLogo: 'https://placehold.co/40x40/png?text=F'
    },
    {
        id: 3,
        name: 'Jeremy Crist',
        role: 'Lead Configuration Architect',
        company: 'GitHub',
        avatar: 'https://ui-avatars.com/api/?name=Jeremy+Crist&background=random&color=fff',
        companyLogo: 'https://placehold.co/40x40/png?text=GH'
    },
    {
        id: 4,
        name: 'Wilbur Kohler',
        role: 'Future Applications Consultant',
        company: 'Gitlab',
        avatar: 'https://ui-avatars.com/api/?name=Wilbur+Kohler&background=random&color=fff',
        companyLogo: 'https://placehold.co/40x40/png?text=GL'
    }
];

const PeopleAssociated = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-fit">
            <div className="p-6 pb-4">
                <h2 className="text-xl font-bold font-outfit text-gray-900">People Associated</h2>
            </div>

            <div className="flex flex-col">
                {dummyConnections.map((person) => (
                    <div 
                        key={person.id} 
                        className="px-6 py-4 flex flex-col gap-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 cursor-pointer group"
                    >
                        <div className="flex items-center gap-4">
                            {/* Avatar with Company Overlay */}
                            <div className="relative shrink-0">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                    <img src={person.avatar} alt={person.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm overflow-hidden p-1">
                                    <img src={person.companyLogo} alt={person.company} className="w-full h-full object-contain" />
                                </div>
                            </div>

                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-bold text-gray-900 font-outfit truncate group-hover:text-[#CD5656] transition-colors">
                                    {person.name}
                                </span>
                                <p className="text-xs text-gray-500 font-outfit leading-tight mt-0.5">
                                    {person.role} at <span className="underline decoration-gray-300 hover:decoration-[#CD5656] transition-all">{person.company}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full py-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors border-t border-gray-50 text-sm font-bold text-gray-700 font-outfit group cursor-pointer">
                <span>See more</span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:translate-y-0.5 transition-transform" />
            </button>
        </div>
    );
};

export default PeopleAssociated;


