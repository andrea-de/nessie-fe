const API_BASE_URL = 'http://localhost:8080';

const fetchWithAuth = (url, options) => {
    const token = localStorage.getItem('authToken');
    const headers = { ...options.headers, Authorization: `Bearer ${token}` };

    return fetch(url, { ...options, headers });
};

const postWithAuth = async (url, options, body) => {
    const token = localStorage.getItem('authToken');
    const headers = { ...options.headers, Authorization: `Bearer ${token}` };

    return await fetch(url, { ...options, headers, body: JSON.stringify(body) });
};

export const getPolygons = async () => {
    const response = await fetch(`${API_BASE_URL}/api/polygon/all`);
    return response.json();
};

export const createPolygon = async (polygon) => {
    console.log('polygon: ', polygon);
    const response = await fetch(`${API_BASE_URL}/api/polygon/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(polygon),
    });
    return response;
}

export const updatePolygon = async () => {
    const response = await postWithAuth(`${API_BASE_URL}/api/polygon/###`);
    return response;
}