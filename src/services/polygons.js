const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

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
    const response = await fetch(`${REACT_APP_BACKEND_URL}/api/polygon/all`);
    return response.json();
};

export const createPolygon = async (polygon) => {
    console.log('polygon: ', polygon);
    const response = await fetch(`${REACT_APP_BACKEND_URL}/api/polygon/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(polygon),
    });
    return response;
}

export const updatePolygon = async () => {
    const response = await postWithAuth(`${REACT_APP_BACKEND_URL}/api/polygon/###`);
    return response;
}