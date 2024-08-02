export const fetchData = async (endpoint, options = {}) => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const headers = {
        ...options.headers,
    };

    // No establecer Content-Type si se está enviando FormData
    if (!(options.body instanceof FormData) && options.method !== 'DELETE') {
        headers['Content-Type'] = 'application/json';
    }

    try {
        const response = await fetch(`${url}${endpoint}`, {
            ...options,
            headers,
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `Error: ${response.status} - ${response.statusText}`);
        }
        return data;
    } catch (error) {
        console.error('Fetch error', error);
        throw error;
    }
};
