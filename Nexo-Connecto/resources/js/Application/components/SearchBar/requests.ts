const getCsrfToken = (): { header: string; token: string } => {
    // 1. Try to get the plain token from the meta tag (X-CSRF-TOKEN)
    const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (metaToken) {
        return { header: 'X-CSRF-TOKEN', token: metaToken };
    }
    
    // 2. Fallback to the encrypted XSRF-TOKEN cookie (X-XSRF-TOKEN)
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'XSRF-TOKEN') {
            return { header: 'X-XSRF-TOKEN', token: decodeURIComponent(value) };
        }
    }
    
    return { header: 'X-CSRF-TOKEN', token: '' };
};

export const searchEntities = async (query: string, type: 'student' | 'company') => {
    try {
        const { header, token } = getCsrfToken();
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
            [header]: token
        };

        const response = await fetch(`/search?query=${encodeURIComponent(query)}&type=${type}`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            throw new Error('Search failed');
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Search error:', error);
        return [];
    }
};

