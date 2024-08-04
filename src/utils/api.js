export const fetchData = async (endpoint, options = {}) => {
    const url = import.meta.env.VITE_BACKEND_URL; // Asegúrate de que esta variable de entorno esté configurada correctamente

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

        // Respuesta como texto si no es JSON
        let data;
        try {
            data = await response.json();
        } catch {
            data = await response.text();
        }

        if (!response.ok) {
            throw new Error(data.error || `Error: ${response.status} - ${response.statusText}`);
        }

        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};
