import React, { createContext, useState, useContext, useEffect } from 'react';
import { Context } from '../../Context';
import { signin, signup } from '../../services/auth';
import './AuthForm.css'; // Import the CSS file

const AuthForm = ({ onClose }) => {
    const { showAuthForm, setShowAuthForm, setUser, setJwt } = useContext(Context);

    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [email, setEmail] = useState('auth@aol.com');
    // const [password, setPassword] = useState('auth123');
    const [isAdmin, setIsAdmin] = useState(false); // Superuser priviledges for editing polygons' data
    const [error, setError] = useState(null); // Error message to display
    const [signedUp, setSignedUp] = useState(false); // Success message to display

    const setCheckError = (error) => {
        if (error == 'duplicate key value violates unique constraint "users_email_key"') {
            setError('Email in use.');
        } else {
            setError(error);
        }
    }

    useEffect(() => {
        setError(null);
        setSignedUp(null); // Reset success message when switching back to registration 
    }, [isSignUpMode])


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (error) {
            const el = document.getElementsByClassName('error')[0];
            if (el) {
                el.classList.add('shake');
                setTimeout(() => el.classList.remove('shake'), 500);
            }
            return
        }
        setSignedUp(null);
        try {
            if (isSignUpMode) {
                console.log('isAdmin: ', isAdmin);
                const response = await signup(email, password, isAdmin);
                if (!response.ok) setCheckError((await response.json()).error);
                else {
                    setIsSignUpMode(false); // This order matters
                    setSignedUp(true);
                }
            } else {
                const response = await signin(email, password);
                if (!response.ok) setCheckError((await response.json()).error);
                else {
                    const body = await response.json();
                    setUser({
                        email: body.email,
                        role: body.role,
                        id: body.id
                    })
                    setJwt(body.jwt)
                    setShowAuthForm(false)
                }
            }
        } catch (error) {
            console.log('error: ', error);
            setError(error || isSignUpMode ? "Sign Up failed" : "Login failed");
        }
    };



    return (
        <form className="authForm" onSubmit={handleSubmit} onChange={() => setError(null)}>
            <div className="formCancel">
                <button onClick={onClose}>X</button>
            </div>
            <h2>{isSignUpMode ? 'Sign Up' : 'Sign In'}</h2>
            <div>
                {signedUp && <p className="success">You're signed up!</p>}
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {isSignUpMode && (
                <div className="isAdmin">
                    <label htmlFor="isAdmin">Admin:</label>
                    <input
                        type="checkbox"
                        id="isAdmin"
                        checked={isAdmin}
                        onChange={() => setIsAdmin(!isAdmin)}
                    />
                </div>
            )}
            <div>
                {error && <p className="error">{error}</p>}
            </div>
            <div className="buttons">
                <button type="button" onClick={() => setIsSignUpMode(!isSignUpMode)}>
                    {isSignUpMode ? 'Sign In' : 'Sign Up'}
                </button>
                <button type="submit">{isSignUpMode ? 'Sign Up' : 'Sign In'}</button>
            </div>
        </form>
    );
};

export default AuthForm;