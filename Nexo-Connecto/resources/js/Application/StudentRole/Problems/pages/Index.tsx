import React, { useEffect, useState } from 'react';
import StudentLayout from '@/layouts/student-layout';
import StudentNavBar from '@/Application/StudentRole/components/StudentNavBar';
import WelcomeOverlay from '@/components/WelcomeOverlay';
import { Head, Link } from '@inertiajs/react';
import { ChevronRight, Search, Filter, TrendingUp, Users, Building2 } from 'lucide-react';

interface Category {
    id: number;
    category_name: string;
    category_description: string;
}

interface Problem {
    id: number;
    problem_title: string;
    difficulty: 'easy' | 'medium' | 'hard';
    status: string;
    categories: Category[];
}

interface Company {
    id: number;
    company_name: string;
    company_pictures: string[] | null;
}

interface Props {
    categories: Category[];
    problems: {
        data: Problem[];
        links: any[];
        current_page: number;
        last_page: number;
        total: number;
    };
    trendingCompanies: Company[];
}

const Index = ({ categories, problems, trendingCompanies }: Props) => {
    const [showWelcome, setShowWelcome] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'easy': return 'text-green-500';
            case 'medium': return 'text-yellow-600';
            case 'hard': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    return (
        <StudentLayout>
            <Head title="Problems - Nexo" />
            <WelcomeOverlay
                show={showWelcome}
                title="Problems To Solve"
                subtitle="Setting up your personalized experience..."
            />

            {!showWelcome && (
            <div className="min-h-screen bg-[#f5f2ed]">
                <StudentNavBar />
                
                    <main className="w-full px-4 md:px-12 py-10">
                        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                            
                            {/* Left Column - Categories & Problems List */}
                            <div className="lg:col-span-8 xl:col-span-8 space-y-8">
                                
                                {/* Horizontal Categories (LeetCode Style) */}
                                <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar scroll-smooth">
                                    <button className="flex-shrink-0 px-4 py-2 bg-[#CD5656] text-white rounded-full text-sm font-medium shadow-sm">
                                        All Topics
                                    </button>
                                    {categories.map((category) => (
                                        <button 
                                            key={category.id}
                                            className="flex-shrink-0 px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200 hover:border-[#CD5656] hover:text-[#CD5656] transition-all whitespace-nowrap shadow-sm"
                                        >
                                            {category.category_name}
                                        </button>
                                    ))}
                                </div>

                                {/* Problems Table Container */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <h2 className="text-xl font-bold text-gray-800">Available Challenges</h2>
                                        
                                        <div className="flex items-center gap-3 w-full md:w-auto">
                                            <div className="relative flex-grow md:flex-grow-0">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                                <input 
                                                    type="text" 
                                                    placeholder="Search questions..." 
                                                    className="w-full md:w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#CD5656]/20 focus:border-[#CD5656]"
                                                />
                                            </div>
                                            <button className="p-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                                                <Filter className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                    <th className="px-6 py-4">ID</th>
                                                    <th className="px-6 py-4">Title</th>
                                                    <th className="px-6 py-4">Categories</th>
                                                    <th className="px-6 py-4">Difficulty</th>
                                                    <th className="px-6 py-4 text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {problems.data.length > 0 ? (
                                                    problems.data.map((problem) => (
                                                        <tr key={problem.id} className="hover:bg-gray-50/50 transition-colors group">
                                                            <td className="px-6 py-4 text-sm text-gray-500 font-medium">#{problem.id}</td>
                                                            <td className="px-6 py-4">
                                                                <Link 
                                                                    href={`/student/problems/${problem.id}`}
                                                                    className="text-sm font-semibold text-gray-800 group-hover:text-[#CD5656] transition-colors"
                                                                >
                                                                    {problem.problem_title}
                                                                </Link>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="flex flex-wrap gap-1">
                                                                    {problem.categories.map(cat => (
                                                                        <span key={cat.id} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
                                                                            {cat.category_name}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className={`text-xs font-bold capitalize ${getDifficultyColor(problem.difficulty)}`}>
                                                                    {problem.difficulty}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <Link 
                                                                    href={`/student/problems/${problem.id}`}
                                                                    className="inline-flex items-center gap-1 text-xs font-bold text-[#CD5656] hover:bg-[#CD5656]/5 px-3 py-1.5 rounded-lg transition-all"
                                                                >
                                                                    Solve <ChevronRight className="w-3 h-3" />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-outfit">
                                                            No problems found matching your criteria.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination Footer */}
                                    <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/30 font-outfit">
                                        <p className="text-xs text-gray-500">
                                            Showing <span className="font-semibold">{problems.data.length}</span> of <span className="font-semibold">{problems.total}</span> problems
                                        </p>
                                        <div className="flex gap-2">
                                        {problems.links.map((link, idx) => (
                                            link.url ? (
                                                <Link
                                                    key={idx}
                                                    href={link.url}
                                                    className={`px-3 py-1.5 text-xs font-semibold border rounded-lg transition-all ${
                                                        link.active 
                                                        ? 'bg-[#CD5656] text-white border-[#CD5656]' 
                                                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#CD5656] hover:text-[#CD5656]'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ) : (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1.5 text-xs font-semibold border rounded-lg opacity-50 cursor-not-allowed bg-white text-gray-400 border-gray-200"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            )
                                        ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Trending Companies & Stats */}
                            <div className="lg:col-span-4 xl:col-span-3 xl:col-start-10 space-y-8">
                                
                                {/* Solved Stats Card */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 font-outfit">
                                    <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-[#CD5656]" /> Your Progress
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <span className="text-3xl font-bold text-gray-800">0</span>
                                            <span className="text-xs text-gray-500 mb-1">/ {problems.total} Solved</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                            <div className="bg-[#CD5656] h-full w-[2%] rounded-full"></div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 pt-2">
                                            <div className="text-center">
                                                <p className="text-[10px] text-gray-400 font-bold uppercase">Easy</p>
                                                <p className="text-sm font-bold text-green-500">0/--</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[10px] text-gray-400 font-bold uppercase">Med.</p>
                                                <p className="text-sm font-bold text-yellow-500">0/--</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[10px] text-gray-400 font-bold uppercase">Hard</p>
                                                <p className="text-sm font-bold text-red-500">0/--</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Trending Companies Sidebar */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 font-outfit">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-[#CD5656]" /> Trending Companies
                                        </h3>
                                    </div>
                                    <div className="space-y-4">
                                        {trendingCompanies.map((company) => (
                                            <div key={company.id} className="flex items-center justify-between group cursor-pointer">
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
                                        ))}
                                    </div>
                                    <button className="w-full mt-6 py-2.5 text-xs font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all border border-gray-100">
                                        View All Companies
                                    </button>
                                </div>

                                {/* Community Stats */}
                                <div className="bg-[#CD5656] p-6 rounded-2xl shadow-lg shadow-[#CD5656]/10 text-white relative overflow-hidden font-outfit">
                                    <Users className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 rotate-12" />
                                    <h3 className="text-sm font-bold mb-1 relative">Global Nexo Ranking</h3>
                                    <p className="text-xs text-white/80 mb-4 relative italic">See where you stand among students</p>
                                    <div className="relative">
                                        <p className="text-3xl font-bold">#---</p>
                                        <Link href="/ranking" className="inline-block mt-4 text-[10px] font-bold uppercase tracking-widest bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all backdrop-blur-sm">
                                            Full Leaderboard
                                        </Link>
                                    </div>
                            </div>

                        </div>
                    </div>
                </main>
                </div>
            )}

            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </StudentLayout>
    );
};

export default Index;
