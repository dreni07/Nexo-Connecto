import { router } from '@inertiajs/react';

export interface ProjectData {
    title: string;
    summary: string;
    tags: string[];
    difficulty: string;
    status: string;
    images: File[];
    liveDemoUrl: string;
    githubUrl: string;
    techStack: { name: string; percentage?: number }[];
    fixedQuestions: Record<string, string>;
    learningQuestions: Record<string, string>;
}

export const createProject = (data: ProjectData, onSuccess?: () => void, onError?: () => void) => {
    router.post('/student/create-project', data as any, {
        onSuccess: () => {
            if (onSuccess) onSuccess();
        },
        onError: (errors) => {
            console.error('Error creating project:', errors);
            if (onError) onError();
        }
    });
};

export const deleteProject = (projectId:number,onSuccess?: () => void, onError?: () => void) => {
    router.delete(`/student/delete-project/${projectId}`,{
        onSuccess:() => {
            if (onSuccess) onSuccess();
        },
        onError: (errors) => {
            console.error("Error deleting the project: ",errors);
            if (onError) onError();
        }
    })
}

export const updateProject = (projectId:number,data:ProjectData,onSuccess?: () => void, onError?: () => void) => {
    router.put(`/student/update-project/${projectId}`,{
        onSuccess:() => {
            if (onSuccess) onSuccess();
        },
        onError: (errors) => {
            if (onError) onError();
        }
    })
}
  
