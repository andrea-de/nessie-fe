const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const signin = async (email, password) => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}/api/user/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
    });
    return response
};

export const signup = async (email, password, isAdmin) => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}/api/user/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password, role: isAdmin ? 'authorized' : 'normal' }),
    });
    return response
};