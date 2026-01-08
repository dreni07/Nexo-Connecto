import React, { useState, useMemo } from 'react';
import { CheckCircle2, Circle, Filter, ArrowLeft } from 'lucide-react';
import { Problem, Difficulty, Tag, Language } from './types';
import { dummyProblems } from './dummyData';

interface ProblemListProps {
    onSelectProblem: (problemId: number) => void;
    selectedDifficulty: Difficulty | null;
    selectedLevel: number | null;
    onBackToLevels: () => void;
}

const ProblemList = ({ onSelectProblem, selectedDifficulty, selectedLevel, onBackToLevels }: ProblemListProps) => {
    const [selectedTag, setSelectedTag] = useState<Tag | 'All'>('All');
    const [selectedLanguage, setSelectedLanguage] = useState<Language | 'All'>('All');
    const [searchQuery, setSearchQuery] = useState('');

    // When coming from a level, only show that level's difficulty
    const difficulties: (Difficulty | 'All')[] = selectedDifficulty 
        ? [selectedDifficulty] 
        : ['All', 'Easy', 'Medium', 'Hard'];
    
    const tags: (Tag | 'All')[] = ['All', 'Arrays', 'Strings', 'Loops', 'Recursion', 'OOP', 'SQL'];
    const languages: (Language | 'All')[] = ['All', 'JavaScript', 'Python', 'Java'];

    const filteredProblems = useMemo(() => {
        return dummyProblems.filter((problem) => {
            // Always filter by the level's difficulty if a level is selected
            const matchesDifficulty = selectedDifficulty 
                ? problem.difficulty === selectedDifficulty 
                : true;
            const matchesTag = selectedTag === 'All' || problem.tags.includes(selectedTag);
            const matchesLanguage = selectedLanguage === 'All' || problem.languages.includes(selectedLanguage);
            const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 problem.description.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesDifficulty && matchesTag && matchesLanguage && matchesSearch;
        });
    }, [selectedDifficulty, selectedTag, selectedLanguage, searchQuery]);

    const getDifficultyColor = (difficulty: Difficulty) => {
        switch (difficulty) {
            case 'Easy':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'Hard':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onBackToLevels}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Back to levels"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold font-outfit text-gray-900 mb-2">
                        Level {selectedLevel} - {selectedDifficulty} Problems
                    </h1>
                    <p className="text-gray-600 font-outfit">Practice coding problems and improve your skills</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
                <div className="flex items-center gap-2 mb-3">
                    <Filter className="w-5 h-5 text-[#CD5656]" />
                    <h3 className="font-semibold font-outfit text-gray-900">Filters</h3>
                </div>

                {/* Search */}
                <div>
                    <input
                        type="text"
                        placeholder="Search problems..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD5656] focus:border-transparent font-outfit"
                    />
                </div>

                {/* Difficulty Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-outfit">Difficulty</label>
                    <div className="flex flex-wrap gap-2">
                        {difficulties.map((difficulty) => (
                            <button
                                key={difficulty}
                                disabled={!!selectedDifficulty}
                                className={`px-4 py-2 rounded-lg text-sm font-outfit transition-all ${
                                    selectedDifficulty === difficulty
                                        ? 'bg-[#CD5656] text-white'
                                        : selectedDifficulty
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {difficulty}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Language Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-outfit">Language</label>
                    <div className="flex flex-wrap gap-2">
                        {languages.map((language) => (
                            <button
                                key={language}
                                onClick={() => setSelectedLanguage(language)}
                                className={`px-4 py-2 rounded-lg text-sm font-outfit transition-all ${
                                    selectedLanguage === language
                                        ? 'bg-[#CD5656] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {language}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tag Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-outfit">Topics</label>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`px-4 py-2 rounded-lg text-sm font-outfit transition-all ${
                                    selectedTag === tag
                                        ? 'bg-[#CD5656] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Problem List */}
            <div className="space-y-3">
                {filteredProblems.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                        <p className="text-gray-500 font-outfit">No problems found matching your filters.</p>
                    </div>
                ) : (
                    filteredProblems.map((problem) => (
                        <div
                            key={problem.id}
                            onClick={() => onSelectProblem(problem.id)}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        {problem.isSolved ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-gray-400" />
                                        )}
                                        <h3 className="text-lg font-semibold font-outfit text-gray-900">
                                            {problem.title}
                                        </h3>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(
                                                problem.difficulty
                                            )} font-outfit`}
                                        >
                                            {problem.difficulty}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm font-outfit mb-3 line-clamp-2">
                                        {problem.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {problem.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-outfit"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {problem.timeComplexity && (
                                    <div className="ml-4 text-right text-xs text-gray-500 font-outfit">
                                        <div>Time: {problem.timeComplexity}</div>
                                        {problem.spaceComplexity && (
                                            <div>Space: {problem.spaceComplexity}</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProblemList;

