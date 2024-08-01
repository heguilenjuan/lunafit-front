//utils/api.js

export const fetchData = async (endpoint, options = {}) => {
    const url = import.meta.env.VITE_BACKEND_URL;
    try {
        const response = await fetch(`${url}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            }
        });
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || `Error: ${response.status} - ${response.statusText}`)
        }
        return data;

    } catch (error) {
        console.error('Fetch error', error);
        throw error;
    }

}