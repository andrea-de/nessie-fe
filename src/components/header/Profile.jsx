import React, { useContext, useState } from 'react';
import { Context } from '../../Context';
import ProfileIcon from './ProfileIcon.jsx';
import './Profile.css';

const Profile = () => {
    const { isLoggedIn, user, setUser, setJwt, showAuthForm, setShowAuthForm } = useContext(Context);
    const [dropdownActive, setDropdownActive] = useState(false);

    const toggleDropdown = () => {
        setDropdownActive(!dropdownActive);
    };

    const handleLogout = () => {
        setUser(null)
        setJwt(null)
        setDropdownActive(false);
    };

    return (
        <div className="profile-container">
            {user ? (
                <>
                    {/* <ProfileIcon onClick={toggleDropdown} /> */}
                    <div className='profile-email' >{user.email}</div>
                    <ProfileIcon onClick={toggleDropdown} />
                    <div className={`dropdownContainer ${dropdownActive ? 'active' : ''}`}
                        onClick={()=>setDropdownActive(false)}>
                        <div className="dropdown">
                            {/* <div className="dropdown-item">{user.role}</div> */}
                            {/* <div className="dropdown-item">Admin</div> */}
                            <div className="dropdown-item" onClick={handleLogout}>Sign Out</div>
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

