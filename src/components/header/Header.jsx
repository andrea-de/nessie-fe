import React from 'react';
import Profile from './Profile';
import './Header.css';


const Header = ({ onClick }) => {

    return (
        <header>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1>Nessie</h1>
                <span style={{ marginLeft: '30px' }}>For all the Loch Ness "Monster" Information</span>
            </div>
            <Profile />
        </header>

    )

};

export default Header;
