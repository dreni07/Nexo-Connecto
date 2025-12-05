import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DashboardState {
    activeSection: string;
    profileCompletion: number;
    liveMatchScore: number;
    recentActivity: {
        studentsApproached: number;
        profileViews: number;
        recommendationsUpdated: boolean;
    };
    studentMatches: {
        highlyMatched: number;
        bookmarked: number;
        newRecommended: number;
    };
    todayImpact: {
        studentsDiscovered: number;
        skillMatches: number;
        bookmarks: number;
    };
    companyInfo: {
        name: string;
        industry: string;
        employees: string;
    };
    upcomingTasks: Array<{
        id: string;
        title: string;
        completed: boolean;
    }>;
}

interface DashboardContextType {
    state: DashboardState;
    setActiveSection: (section: string) => void;
    updateProfileCompletion: (percentage: number) => void;
    updateLiveMatchScore: (score: number) => void;
    updateRecentActivity: (activity: Partial<DashboardState['recentActivity']>) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const initialState: DashboardState = {
    activeSection: 'dashboard',
    profileCompletion: 45,
    liveMatchScore: 78,
    recentActivity: {
        studentsApproached: 2,
        profileViews: 3,
        recommendationsUpdated: true,
    },
    studentMatches: {
        highlyMatched: 12,
        bookmarked: 7,
        newRecommended: 3,
    },
    todayImpact: {
        studentsDiscovered: 4,
        skillMatches: 2,
        bookmarks: 1,
    },
    companyInfo: {
        name: 'MicroTech Solutions',
        industry: 'Software',
        employees: '12-50',
    },
    upcomingTasks: [
        { id: '1', title: 'Add your mission statement', completed: false },
        { id: '2', title: 'Upload your company banner', completed: false },
        { id: '3', title: 'Create your first internship position', completed: false },
        { id: '4', title: 'Add company perks', completed: false },
        { id: '5', title: 'Configure culture tags', completed: false },
    ],
};

export function DashboardProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<DashboardState>(initialState);

    const setActiveSection = (section: string) => {
        setState((prev) => ({ ...prev, activeSection: section }));
    };

    const updateProfileCompletion = (percentage: number) => {
        setState((prev) => ({ ...prev, profileCompletion: percentage }));
    };

    const updateLiveMatchScore = (score: number) => {
        setState((prev) => ({ ...prev, liveMatchScore: score }));
    };

    const updateRecentActivity = (activity: Partial<DashboardState['recentActivity']>) => {
        setState((prev) => ({
            ...prev,
            recentActivity: { ...prev.recentActivity, ...activity },
        }));
    };

    return (
        <DashboardContext.Provider
            value={{
                state,
                setActiveSection,
                updateProfileCompletion,
                updateLiveMatchScore,
                updateRecentActivity,
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
}

