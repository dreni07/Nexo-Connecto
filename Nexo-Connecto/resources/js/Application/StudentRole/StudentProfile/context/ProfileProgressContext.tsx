import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface ProfileProgressState {
    hasAvatar: boolean;
    hasBio: boolean;
    hasUniversity: boolean;
    hasMajor: boolean;
    hasDegreeLevel: boolean;
    hasAcademicYear: boolean;
}

interface ProfileProgressContextType {
    progress: number;
    setHasAvatar: (hasAvatar: boolean) => void;
    setHasBio: (hasBio: boolean) => void;
    setHasUniversity: (hasUniversity: boolean) => void;
    setHasMajor: (hasMajor: boolean) => void;
    setHasDegreeLevel: (hasDegreeLevel: boolean) => void;
    setHasAcademicYear: (hasAcademicYear: boolean) => void;
}

const ProfileProgressContext = createContext<ProfileProgressContextType | undefined>(undefined);

export function ProfileProgressProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<ProfileProgressState>({
        hasAvatar: false,
        hasBio: false,
        hasUniversity: false,
        hasMajor: false,
        hasDegreeLevel: false,
        hasAcademicYear: false,
    });

    const progress = useMemo(() => {
        let percentage = 0;
        if (state.hasAvatar) percentage += 10; 
        if (state.hasBio) percentage += 15; 
        
        if (state.hasUniversity) percentage += 15; 
        if (state.hasMajor) percentage += 15; 
        if (state.hasDegreeLevel) percentage += 15;
        if (state.hasAcademicYear) percentage += 30; 
        
        return percentage;
    }, [state]);

    const setHasAvatar = (hasAvatar: boolean) => {
        setState((prev) => ({ ...prev, hasAvatar }));
    };

    const setHasBio = (hasBio: boolean) => {
        setState((prev) => ({ ...prev, hasBio }));
    };

    const setHasUniversity = (hasUniversity: boolean) => {
        setState((prev) => ({ ...prev, hasUniversity }));
    };

    const setHasMajor = (hasMajor: boolean) => {
        setState((prev) => ({ ...prev, hasMajor }));
    };

    const setHasDegreeLevel = (hasDegreeLevel: boolean) => {
        setState((prev) => ({ ...prev, hasDegreeLevel }));
    };

    const setHasAcademicYear = (hasAcademicYear: boolean) => {
        setState((prev) => ({ ...prev, hasAcademicYear }));
    };

    return (
        <ProfileProgressContext.Provider
            value={{
                progress,
                setHasAvatar,
                setHasBio,
                setHasUniversity,
                setHasMajor,
                setHasDegreeLevel,
                setHasAcademicYear,
            }}
        >
            {children}
        </ProfileProgressContext.Provider>
    );
}

export function useProfileProgress() {
    const context = useContext(ProfileProgressContext);
    if (context === undefined) {
        throw new Error('useProfileProgress must be used within a ProfileProgressProvider');
    }
    return context;
}

