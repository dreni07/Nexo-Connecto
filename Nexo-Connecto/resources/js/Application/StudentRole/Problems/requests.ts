import { router } from '@inertiajs/react';

export const searchProblems = (query: string, categoryId: number | null, onFinish?: () => void) => {
    router.get(
        '/student/problems',
        { 
            search: query,
            category_id: categoryId 
        },
        {
            preserveState: true,
            replace: true,
            only: ['problems'],
            showProgress: false,
            onFinish: onFinish,
        }
    );
};

