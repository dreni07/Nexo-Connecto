import React, { useEffect, useState } from 'react';
import StudentLayout from '@/layouts/student-layout';
import StudentNavBar from '@/Application/StudentRole/components/StudentNavBar';
import WelcomeOverlay from '@/components/WelcomeOverlay';
import { Head, Link } from '@inertiajs/react';
import { ChevronRight, Search, Filter, TrendingUp, Users, Building2, Loader2 } from 'lucide-react';
import { IndexProps } from '../types';
import { searchProblems } from '../requests';
import ProblemRow from '../components/ProblemRow';
import TrendingCompanyItem from '../components/TrendingCompanyItem';
import CategoryItem from '../components/CategoryItem';

const Index = ({ categories, problems, trendingCompanies, filters }: IndexProps) => {
    const [showWelcome, setShowWelcome] = useState(true);
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(filters.category_id ? Number(filters.category_id) : null);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (searchQuery === (filters.search || '') && selectedCategory === (filters.category_id ? Number(filters.category_id) : null)) {
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        const timer = setTimeout(() => {
            searchProblems(searchQuery, selectedCategory, () => setIsSearching(false));
        }, 400);

        return () => clearTimeout(timer);
    }, [searchQuery, selectedCategory]);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryClick = (categoryId: number | null) => {
        setSelectedCategory(categoryId);
    };

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
                            
                            <div className="lg:col-span-8 xl:col-span-8 space-y-8">
                                
                                <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar scroll-smooth">
                                    <button 
                                        onClick={() => handleCategoryClick(null)}
                                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-all border ${
                                            selectedCategory === null 
                                            ? 'bg-[#CD5656] text-white border-[#CD5656]' 
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-[#CD5656] hover:text-[#CD5656]'
                                        }`}
                                    >
                                        All Topics
                                    </button>
                                    {categories.map((category) => (
                                        <CategoryItem 
                                            key={category.id} 
                                            category={category} 
                                            isActive={selectedCategory === category.id}
                                            onClick={handleCategoryClick}
                                        />
                                    ))}
                                </div>

                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <h2 className="text-xl font-bold text-gray-800">Available Challenges</h2>
                                        
                                        <div className="flex items-center gap-3 w-full md:w-auto">
                                            <div className="relative flex-grow md:flex-grow-0">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                                    {isSearching ? (
                                                        <Loader2 className="w-4 h-4 text-[#CD5656] animate-spin" />
                                                    ) : (
                                                        <Search className="text-gray-400 w-4 h-4" />
                                                    )}
                                                </div>
                                                <input 
                                                    type="text" 
                                                    placeholder="Search questions..." 
                                                    value={searchQuery}
                                                    onChange={onSearchChange}
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
                                                    <th className="px-6 py-4">Title</th>
                                                    <th className="px-6 py-4">Categories</th>
                                                    <th className="px-6 py-4">Difficulty</th>
                                                    <th className="px-6 py-4 text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {problems.data.length > 0 ? (
                                                    problems.data.map((problem) => (
                                                        <ProblemRow 
                                                            key={problem.id} 
                                                            problem={problem} 
                                                            getDifficultyColor={getDifficultyColor} 
                                                        />
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-outfit">
                                                            No problems found matching your criteria.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

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

                            <div className="lg:col-span-4 xl:col-span-3 xl:col-start-10 space-y-8">
                                
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

                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 font-outfit">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-[#CD5656]" /> Trending Companies
                                        </h3>
                                    </div>
                                    <div className="space-y-4">
                                        {trendingCompanies.map((company) => (
                                            <TrendingCompanyItem key={company.id} company={company} />
                                        ))}
                                    </div>
                                    <button className="w-full mt-6 py-2.5 text-xs font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all border border-gray-100">
                                        View All Companies
                                    </button>
                                </div>

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
