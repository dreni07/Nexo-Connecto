import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { Problem } from '../types';

interface Props {
    problem: Problem;
    getDifficultyColor: (difficulty: string) => string;
}

const ProblemRow = ({ problem, getDifficultyColor }: Props) => {
    return (
        <tr className="hover:bg-gray-50/50 transition-colors group">
            <td className="px-6 py-4">
                <Link 
                    href={`/student/problems/${problem.id}`}
                    className="text-sm font-semibold text-gray-800 group-hover:text-[#CD5656] transition-colors"
                >
                    {problem.id}. {problem.problem_title}
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
    );
};

export default ProblemRow;

