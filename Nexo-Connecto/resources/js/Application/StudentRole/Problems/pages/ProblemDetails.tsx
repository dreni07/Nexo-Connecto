import React from 'react';
import { Head } from '@inertiajs/react';
import { ProblemProvider } from '../context/ProblemContext';
import ProblemControlBar from '../components/ProblemControlBar';
import ProblemInfoContent from '../components/ProblemInfoContent';
import ProblemCodeEditor from '../components/ProblemCodeEditor';

enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}

enum Status {
    ACTIVE = 'active',
    ARCHIVED = 'archived',
    DEPRECATED = 'deprecated'
}

interface Problem {
    id: number;
    problem_title: string;
    description: string;
    difficulty: Difficulty;
    status: Status;
}

interface ProblemVersion {
    id: number;
    problem: Problem;
    version: string;
    prompt: string;
    constraints: string;
    test_cases: string[];
    sample_output_input: Array<{
        input: string;
        output: string;
        explanation?: string;
    }>;
    official_solution: string;
    checksum: string;
}

interface Language {
    id: number;
    language_name: string;
}

interface ProblemDetailsProps {
    problem_details: ProblemVersion;
    available_languages: Language[];
}

const ProblemDetails = ({ problem_details, available_languages }: ProblemDetailsProps) => {
    return (
        <ProblemProvider>
            <div className="h-screen flex flex-col bg-white overflow-hidden font-outfit">
                <Head title={`${problem_details.problem.id}. ${problem_details.problem.problem_title}`} />

                <ProblemControlBar />

                <div className="h-[90%] flex flex-1 overflow-hidden">
                    <div className="w-1/2 border-r border-gray-100 h-full">
                        <ProblemInfoContent problem_details={problem_details} />
                    </div>

                    <div className="w-1/2 h-full">
                        <ProblemCodeEditor available_languages={available_languages} />
                    </div>
                </div>
            </div>
        </ProblemProvider>
    );
};

export default ProblemDetails;
