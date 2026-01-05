interface University {
    id: number;
    name: string;
    location: string;
    logo: string;
    description: string;
}

interface SpecificMajor {
    id: number;
    name: string;
}

interface SpecificMajorsResponse {
    success: boolean;
    majors: SpecificMajor[];
}

const getCsrfToken = (): string | null => {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (token) return token;
    
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'XSRF-TOKEN') {
            return decodeURIComponent(value);
        }
    }
    return null;
};

export const getSpecificMajors = async (universityId: number): Promise<SpecificMajorsResponse> => {
    try {
        const csrfToken = getCsrfToken();
        
        const url = new URL('/student/specific-majors', window.location.origin);
        url.searchParams.append('university_id', universityId.toString());
        
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken ?? ''
            },
            credentials: 'same-origin'
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch specific majors');
        }
        
        return await response.json();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to fetch specific majors');
    }
};

interface CourseSubject {
    name: string;
    [key: string]: any; // Allow for additional properties
}

interface CourseSubjectsResponse {
    success: boolean;
    subjects?: CourseSubject[];
    message?: string;
}

export const getCourseSubjects = async (majorId: number, year: number): Promise<CourseSubjectsResponse> => {
    try {
        
        const url = new URL('/student/course-subjects', window.location.origin);
        
        url.searchParams.append('major_id', majorId.toString());
        url.searchParams.append('year', year.toString());
        
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch course subjects');
        }
        
        return await response.json();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to fetch course subjects');
    }
};

export interface SaveProfileData {
    avatar: File | null;
    bio: string;
    specific_major: number;
    degree_level: string;
    academic_year: number;
    subjects_choosen: Record<string, string[]>;
}

export const saveStudentProfile = async (data: SaveProfileData): Promise<{ success: boolean; message: string }> => {
    try {
        const csrfToken = getCsrfToken();
        const formData = new FormData();
        
        if (data.avatar) {
            formData.append('avatar', data.avatar);
        }

        formData.append('bio', data.bio);
        formData.append('specific_major', data.specific_major.toString());

        formData.append('degree_level', data.degree_level);
        formData.append('academic_year', data.academic_year.toString());
        
        formData.append('subjects_choosen', JSON.stringify(data.subjects_choosen));

        const response = await fetch('/student/complete-profile', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken ?? '',
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json',
            },
            body: formData,
            credentials: 'same-origin'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to save student profile');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to save student profile');
    }
};

export type { University, SpecificMajor, CourseSubject, CourseSubjectsResponse };

