import { router } from '@inertiajs/react';

export interface Industry {
    id: number;
    industry_name: string;
}

export interface Skill {
    id: number;
    skill_name: string;
}


export const fetchIndustries = async (): Promise<Industry[]> => {
    try {
        const response = await fetch('/student/profile/industries', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch industries');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error in fetchIndustries:', error);
        return [];
    }
};


export const fetchTechnicalSkills = async (industryId: number): Promise<Skill[]> => {
    try {
        const url = `/student/profile/technical-skills?industry_id=${industryId}`;
        console.log('Fetching technical skills from:', url);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        
        if (!response.ok) {
            console.error('Technical skills response not OK:', response.status, response.statusText);
            throw new Error('Failed to fetch technical skills');
        }
        
        const data = await response.json();
        console.log('Technical skills received:', data);
        return data;
    } catch (error) {
        console.error('Error in fetchTechnicalSkills:', error);
        return [];
    }
};


export const updateStudentSkills = (skillIds: number[], onSuccess: () => void, onError: () => void) => {
    router.post('/student/profile/update-skills', {
        skills: skillIds
    }, {
        onSuccess,
        onError
    });
};


export const updateStudentGpa = (gpa: number, onSuccess: () => void, onError: () => void) => {
    router.post('/student/profile/update-gpa', {
        gpa
    }, {
        onSuccess,
        onError
    });
};


export const updateStudentLanguages = (languages: { language: string, level: string }[], onSuccess: () => void, onError: () => void) => {
    router.post('/student/profile/update-languages', {
        languages
    }, {
        onSuccess,
        onError
    });
};


export const updateStudentWorkPreference = (preference: string, onSuccess: () => void, onError: () => void) => {
    router.post('/student/profile/update-work-preference', {
        work_preference: preference
    }, {
        onSuccess,
        onError
    });
};


export const updateStudentSocialMedia = (socialMedia: { name: string, link: string }[], onSuccess: () => void, onError: () => void) => {
    router.post('/student/profile/update-social-media', {
        social_media: socialMedia
    }, {
        onSuccess,
        onError
    });
};


export const updateStudentCareerGoals = (goals: string, onSuccess: () => void, onError: () => void) => {
    router.post('/student/profile/update-career-goals', {
        career_goals: goals
    }, {
        onSuccess,
        onError
    });
};


export const fetchQuizQuestions = async (): Promise<string[]> => {
    try {
        const response = await fetch('/student/profile/quiz-questions', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch quiz questions');
        return await response.json();
    } catch (error) {
        console.error('Error in fetchQuizQuestions:', error);
        return [];
    }
};


export const updateStudentQuizAnswers = (answers: { question: string, answer: string }[], onSuccess: () => void, onError: () => void) => {
    router.post('/student/profile/update-quiz-answers', {
        answers
    }, {
        onSuccess,
        onError
    });
};
