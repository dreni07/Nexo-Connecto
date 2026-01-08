import React from 'react';
import { CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react';
import { TestCase } from './types';

interface TestCasesProps {
    testCases: TestCase[];
    testResults?: Array<{
        testCase: TestCase;
        passed: boolean;
        output: string;
    }>;
}

const TestCases = ({ testCases, testResults = [] }: TestCasesProps) => {
    const getTestCaseResult = (testCaseId: number) => {
        return testResults.find((r) => r.testCase.id === testCaseId);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold font-outfit text-gray-900 mb-4">Test Cases</h2>
            <div className="space-y-4">
                {testCases.map((testCase) => {
                    const result = getTestCaseResult(testCase.id);
                    const isVisible = !testCase.isHidden || result;

                    return (
                        <div
                            key={testCase.id}
                            className={`p-4 rounded-lg border ${
                                result
                                    ? result.passed
                                        ? 'bg-green-50 border-green-200'
                                        : 'bg-red-50 border-red-200'
                                    : 'bg-gray-50 border-gray-200'
                            }`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                {result ? (
                                    result.passed ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-red-600" />
                                    )
                                ) : (
                                    <div className="w-5 h-5" />
                                )}
                                <span className="font-semibold font-outfit text-gray-900">
                                    Test Case {testCase.id}
                                </span>
                                {testCase.isHidden && (
                                    <span className="flex items-center gap-1 text-xs text-gray-500 font-outfit">
                                        {isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                        {isVisible ? 'Hidden' : 'Hidden'}
                                    </span>
                                )}
                            </div>
                            {isVisible ? (
                                <>
                                    <div className="mb-2">
                                        <span className="text-sm font-semibold text-gray-700 font-outfit">Input:</span>
                                        <pre className="mt-1 p-2 bg-gray-100 rounded text-sm font-mono text-gray-800 overflow-x-auto">
                                            {testCase.input}
                                        </pre>
                                    </div>
                                    <div className="mb-2">
                                        <span className="text-sm font-semibold text-gray-700 font-outfit">
                                            Expected Output:
                                        </span>
                                        <pre className="mt-1 p-2 bg-gray-100 rounded text-sm font-mono text-gray-800 overflow-x-auto">
                                            {testCase.expectedOutput}
                                        </pre>
                                    </div>
                                    {result && (
                                        <div>
                                            <span className="text-sm font-semibold text-gray-700 font-outfit">
                                                Your Output:
                                            </span>
                                            <pre className="mt-1 p-2 bg-gray-100 rounded text-sm font-mono text-gray-800 overflow-x-auto">
                                                {result.output}
                                            </pre>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p className="text-sm text-gray-500 font-outfit italic">
                                    This is a hidden test case. Run your code to see the result.
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TestCases;

