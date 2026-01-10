
export const getGithubLanguagesApiUrl = (githubUrl: string): string => {
    const parts = githubUrl.split('/');

    const owner = parts[3];
    const repo = parts[4];

    const baseUrl = "https://api.github.com/repos/";
    
    return `${baseUrl}${owner}/${repo}/languages`;
};

export interface LanguageStack {
    name: string;
    percentage: number;
    bytes: number;
}

export const fetchGithubTechStack = async (githubUrl: string): Promise<LanguageStack[]> => {
    try {
        const response = await fetch('/student/fetch-github-stack', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
            },
            body: JSON.stringify({ github_url: githubUrl })
        });
        
        if (!response.ok) throw new Error('Failed to fetch languages');
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching tech stack:', error);
        return [];
    }
};

