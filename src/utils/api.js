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

        let data;
        try {
            data = await response.json();
        } catch (error) {
            // Si la respuesta no es JSON, leer como texto
            data = await response.text();
        }

        if (!response.ok) {
            console.error('Response error data:', data);
            throw new Error(data.error || `Error: ${response.status} - ${response.statusText}`);
        }

        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};
