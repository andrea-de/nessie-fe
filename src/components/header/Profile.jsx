import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../Context';
import ProfileIcon from './ProfileIcon.jsx';
import './Profile.css';

const Profile = () => {
    const { isLoggedIn, user, setUser, setJwt, showAuthForm, setShowAuthForm } = useContext(Context);
    const [dropdownActive, setDropdownActive] = useState(false);
    const [darkMode, setDarkMode] = useState(user && user.theme === 'dark');

    const toggleDropdown = () => {
        setDropdownActive(!dropdownActive);
    };

    const handleLogout = () => {
        setUser(null)
        setJwt(null)
        setDropdownActive(false);
    };

    useEffect(() => {
        document.body.classList.toggle('dark-mode');
    }, [darkMode])

    return (
        <div className="profile-container">
            {user ? (
                <>
                    {/* <ProfileIcon onClick={toggleDropdown} /> */}
                    <div className='profile-email' >{user.email}</div>
                    <ProfileIcon onClick={toggleDropdown} darkMode={darkMode} />
                    <div className={`dropdownContainer ${dropdownActive ? 'active' : ''}`}
                        onClick={()=>setDropdownActive(false)}>
                        <div className="dropdown">
                            {/* <div className="dropdown-item"></div> */}
                            {user.role === 'authorized' && <p style={{ margin: '5px 0 15px 5px', fontWeight: 'bold' }}>Superuser</p>}
                            <div className="dropdown-item" onClick={handleLogout}>Sign Out</div>
                            <div
                                className="dropdown-item"
                                onClick={() => setDarkMode(() => !darkMode)}
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            >
                                <span>Dark mode:</span>
                                <span style={{ fontSize: 'x-large', padding: '0 0 2px 10px' }}>
                                    {darkMode ? '\u263C' : '\u2600'}
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <button onClick={() => setShowAuthForm(true)}>Sign In</button>
            )}
        </div>
    );
}

export default Profile

