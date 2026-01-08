import { Problem, Progress } from './types';

export const dummyProblems: Problem[] = [
    {
        id: 1,
        title: 'Two Sum',
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
        difficulty: 'Easy',
        tags: ['Arrays'],
        languages: ['JavaScript', 'Python', 'Java'],
        testCases: [
            {
                id: 1,
                input: 'nums = [2,7,11,15], target = 9',
                expectedOutput: '[0,1]',
                isHidden: false,
            },
            {
                id: 2,
                input: 'nums = [3,2,4], target = 6',
                expectedOutput: '[1,2]',
                isHidden: false,
            },
            {
                id: 3,
                input: 'nums = [3,3], target = 6',
                expectedOutput: '[0,1]',
                isHidden: true,
            },
        ],
        solutionExplanation: 'Use a hash map to store each number and its index. For each number, check if target - current number exists in the map.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        isSolved: false,
        attempts: 0,
    },
    {
        id: 2,
        title: 'Reverse String',
        description: 'Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.',
        difficulty: 'Easy',
        tags: ['Strings', 'Loops'],
        languages: ['JavaScript', 'Python', 'Java'],
        testCases: [
            {
                id: 1,
                input: 's = ["h","e","l","l","o"]',
                expectedOutput: '["o","l","l","e","h"]',
                isHidden: false,
            },
            {
                id: 2,
                input: 's = ["H","a","n","n","a","h"]',
                expectedOutput: '["h","a","n","n","a","H"]',
                isHidden: false,
            },
        ],
        solutionExplanation: 'Use two pointers approach: one at the start and one at the end. Swap characters and move pointers towards each other.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        isSolved: true,
        attempts: 1,
    },
    {
        id: 3,
        title: 'Fibonacci Sequence',
        description: 'Write a function to return the nth Fibonacci number. The Fibonacci sequence is defined as: F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n > 1.',
        difficulty: 'Medium',
        tags: ['Recursion'],
        languages: ['JavaScript', 'Python', 'Java'],
        testCases: [
            {
                id: 1,
                input: 'n = 5',
                expectedOutput: '5',
                isHidden: false,
            },
            {
                id: 2,
                input: 'n = 10',
                expectedOutput: '55',
                isHidden: false,
            },
            {
                id: 3,
                input: 'n = 30',
                expectedOutput: '832040',
                isHidden: true,
            },
        ],
        solutionExplanation: 'Use dynamic programming with memoization to avoid recalculating the same values. Store previously calculated Fibonacci numbers.',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        isSolved: false,
        attempts: 2,
    },
    {
        id: 4,
        title: 'Binary Search',
        description: 'Given a sorted array of integers and a target value, return the index of the target if it exists, otherwise return -1.',
        difficulty: 'Medium',
        tags: ['Arrays', 'Loops'],
        languages: ['JavaScript', 'Python', 'Java'],
        testCases: [
            {
                id: 1,
                input: 'nums = [-1,0,3,5,9,12], target = 9',
                expectedOutput: '4',
                isHidden: false,
            },
            {
                id: 2,
                input: 'nums = [-1,0,3,5,9,12], target = 2',
                expectedOutput: '-1',
                isHidden: false,
            },
        ],
        solutionExplanation: 'Use two pointers (left and right) and calculate the middle index. Compare the middle element with the target and adjust pointers accordingly.',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
        isSolved: false,
        attempts: 0,
    },
    {
        id: 5,
        title: 'Class Design: Bank Account',
        description: 'Design a BankAccount class with methods to deposit, withdraw, and get balance. Ensure that withdrawals cannot exceed the current balance.',
        difficulty: 'Medium',
        tags: ['OOP'],
        languages: ['JavaScript', 'Python', 'Java'],
        testCases: [
            {
                id: 1,
                input: 'account = new BankAccount(100); account.deposit(50); account.withdraw(30)',
                expectedOutput: 'Balance: 120',
                isHidden: false,
            },
            {
                id: 2,
                input: 'account.withdraw(200)',
                expectedOutput: 'Error: Insufficient funds',
                isHidden: false,
            },
        ],
        solutionExplanation: 'Create a class with a private balance property. Implement deposit and withdraw methods with proper validation.',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        isSolved: false,
        attempts: 0,
    },
    {
        id: 6,
        title: 'SQL: Find Employees',
        description: 'Write a SQL query to find all employees who earn more than their managers.',
        difficulty: 'Hard',
        tags: ['SQL'],
        languages: ['SQL'],
        testCases: [
            {
                id: 1,
                input: 'Employee table with id, name, salary, managerId',
                expectedOutput: 'List of employees with higher salary than their manager',
                isHidden: false,
            },
        ],
        solutionExplanation: 'Use a self-join to compare each employee with their manager. Filter where employee salary > manager salary.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(n)',
        isSolved: false,
        attempts: 0,
    },
];

export const dummyProgress: Progress = {
    totalSolved: 1,
    byLanguage: {
        JavaScript: { solved: 1, total: 6, percentage: 16.67 },
        Python: { solved: 0, total: 5, percentage: 0 },
        Java: { solved: 0, total: 5, percentage: 0 },
    },
    streak: 3,
};

export const dailyChallenge = {
    problemId: 3,
    title: 'Fibonacci Sequence',
    difficulty: 'Medium' as const,
    timeRemaining: 86400, // 24 hours in seconds
};

