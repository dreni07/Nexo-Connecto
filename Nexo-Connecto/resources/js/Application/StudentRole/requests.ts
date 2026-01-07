import { router } from '@inertiajs/react';

export interface Industry {
    id: number;
    industry_name: string;
}

export interface Skill {
    id: number;
    skill_name: string;
}

const getCsrfToken = (): { header: string; token: string } => {
    const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (metaToken) {
        return { header: 'X-CSRF-TOKEN', token: metaToken };
    }
    return { header: 'X-CSRF-TOKEN', token: '' };
};

/**
 * Fetch all industries.
 */
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

/**
 * Fetch technical skills by industry ID.
 */
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

/**
 * Update student technical skills.
 */
export const updateStudentSkills = (skillIds: number[], onSuccess: () => void, onError: () => void) => {
    router.post('/student/profile/update-skills', {
        skills: skillIds
    }, {
        onSuccess,
        onError
    });
};
