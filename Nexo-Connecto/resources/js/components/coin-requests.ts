const getCsrfToken = () => {
    return (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';
};

export const fetchCoinTypes = async () => {
    try {
        const response = await fetch('/coins');
        if (!response.ok) {
            throw new Error('Failed to fetch coins');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching coins:', error);
        return [];
    }
};

export const fetchUserCoins = async () => {
    try {
        const response = await fetch('/user/coins');
        if (!response.ok) {
            throw new Error('Failed to fetch user coins');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user coins:', error);
        return [];
    }
};

export const markIntroAsSeen = async () => {
    try {
        const response = await fetch('/coins/mark-intro-seen', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': getCsrfToken(),
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error('Failed to mark intro as seen');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error marking intro as seen:', error);
        return { success: false };
    }
};

