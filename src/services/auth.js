const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const signin = async (email, password) => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}/api/user/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
    });
    return response

    
    if (!response.ok) {
        const errorData = await response.json();
        console.log('errorData: ', errorData);
        throw new Error(errorData || 'Login failed');
    }
    // if (!response.ok) {
    //     const errorData = await response.json();
    //     if (errorData.error && errorData.error == 'duplicate key value violates unique constraint "users_email_key"')
    //         throw new Error('Email in use.');
    //     // else if (errorData.error && errorData.error == '')
    //     console.log('errorData: ', errorData);
    //     throw new Error(errorData.error || 'Login failed');
    // }


    const data = await response.json();
    return data;
};

export const signup = async (email, password, isAdmin) => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}/api/user/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password, role: isAdmin ? 'authorized' : 'normal' }),
    });
    return response

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData || 'Sign Up failed');
    }

    const data = await response.json();
    return data;
};