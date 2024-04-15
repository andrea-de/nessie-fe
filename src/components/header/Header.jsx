import React from 'react';
import Profile from './Profile';
import './Header.css';


const Header = ({ onClick }) => {

    return (
        <header>
            <h1>Nessie</h1>
            <Profile />
        </header>

    )

};

export default Header;
