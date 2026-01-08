export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Tag = 'Arrays' | 'Strings' | 'Loops' | 'Recursion' | 'OOP' | 'SQL';
export type Language = 'JavaScript' | 'Python' | 'Java';

export interface TestCase {
    id: number;
    input: string;
    expectedOutput: string;
    isHidden: boolean;
}

export interface Problem {
    id: number;
    title: string;
    description: string;
    difficulty: Difficulty;
    tags: Tag[];
    languages: Language[];
    testCases: TestCase[];
    solutionExplanation?: string;
    timeComplexity?: string;
    spaceComplexity?: string;
    isSolved?: boolean;
    attempts?: number;
}

export interface Progress {
    totalSolved: number;
    byLanguage: {
        [key in Language]: {
            solved: number;
            total: number;
            percentage: number;
        };
    };
    streak: number;
}

