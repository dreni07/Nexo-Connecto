export interface Category {
    id: number;
    category_name: string;
    category_description: string;
}

export interface Problem {
    id: number;
    problem_title: string;
    difficulty: 'easy' | 'medium' | 'hard';
    status: string;
    categories: Category[];
}

export interface Company {
    id: number;
    company_name: string;
    company_pictures: string[] | null;
}

export interface IndexProps {
    categories: Category[];
    problems: {
        data: Problem[];
        links: any[];
        current_page: number;
        last_page: number;
        total: number;
    };
    trendingCompanies: Company[];
    filters: {
        search?: string;
        category_id?: number;
    };
}

