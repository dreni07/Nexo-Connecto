import React from 'react';

// Specific Major Component
export const MajorStep = () => (
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-2">Specific Major</h4>
        <p className="text-sm text-gray-600 mb-4">Please select your major from the list of available options.</p>
        <button className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors">
            Select Major
        </button>
    </div>
);

// Degree Level Component
export const DegreeStep = () => (
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-2">Degree Level</h4>
        <p className="text-sm text-gray-600 mb-4">Are you pursuing a Bachelor's, Master's, or PhD?</p>
        <button className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors">
            Update Degree
        </button>
    </div>
);

// GPA Component
export const GpaStep = () => (
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-2">GPA</h4>
        <p className="text-sm text-gray-600 mb-4">Enter your current cumulative GPA to showcase your academic performance.</p>
        <button className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors">
            Enter GPA
        </button>
    </div>
);

// Academic Year Component
export const YearStep = () => (
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-2">Academic Year</h4>
        <p className="text-sm text-gray-600 mb-4">What year of your studies are you currently in?</p>
        <button className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors">
            Set Year
        </button>
    </div>
);

// Technical Skills Component
export const SkillsStep = () => (
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-2">Technical Skills</h4>
        <p className="text-sm text-gray-600 mb-4">Add your technical expertise such as programming languages or tools.</p>
        <button className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors">
            Add Skills
        </button>
    </div>
);

// Languages Component
export const LanguagesStep = () => (
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-2">Languages</h4>
        <p className="text-sm text-gray-600 mb-4">List the languages you can speak and your proficiency level.</p>
        <button className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors">
            Add Languages
        </button>
    </div>
);

// Work Preference Component
export const WorkStep = () => (
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-2">Work Preference</h4>
        <p className="text-sm text-gray-600 mb-4">Remote, hybrid, or on-site? Let us know your preference.</p>
        <button className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors">
            Set Preference
        </button>
    </div>
);

// Social Media Component
export const SocialStep = () => (
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-2">Social Media</h4>
        <p className="text-sm text-gray-600 mb-4">Connect your LinkedIn, GitHub, or portfolio links.</p>
        <button className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors">
            Link Profiles
        </button>
    </div>
);

// Industries Preferences Component
export const IndustriesStep = () => (
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-2">Industries</h4>
        <p className="text-sm text-gray-600 mb-4">Which industries are you most interested in for your career?</p>
        <button className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors">
            Select Industries
        </button>
    </div>
);

// Career Goals Component
export const GoalsStep = () => (
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-2">Career Goals</h4>
        <p className="text-sm text-gray-600 mb-4">Briefly describe your short-term and long-term professional goals.</p>
        <button className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors">
            Describe Goals
        </button>
    </div>
);

// Student Answers Component
export const QuizStep = () => (
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-2">Student Assessment</h4>
        <p className="text-sm text-gray-600 mb-4">Complete the assessment to help us find better matches for you.</p>
        <button className="w-full py-2 bg-[#CD5656] text-white rounded-lg font-medium hover:bg-[#B44B4B] transition-colors">
            Take Assessment
        </button>
    </div>
);

// Array of components export
export const Components = [
    <MajorStep />,
    <DegreeStep />,
    <GpaStep />,
    <YearStep />,
    <SkillsStep />,
    <LanguagesStep />,
    <WorkStep />,
    <SocialStep />,
    <IndustriesStep />,
    <GoalsStep />,
    <QuizStep />
];

