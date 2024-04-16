import React, { useState, useEffect, useContext, useRef } from 'react';

import Polygons from './polygon/Polygons.jsx';
import PolygonCreate from './polygon/PolygonCreate.jsx';
import AuthForm from './authform/AuthForm.jsx';
import { Context } from '../Context';
import './Interface.css';
import './Forms.css';

const DEBUG = process.env.REACT_APP_DEBUG == 'TRUE' ?? false;

const Interface = () => {
    const { user, showAuthForm, setShowAuthForm } = useContext(Context);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const divRef = useRef(null);

    const create = () => {
        if (user != null) {
            setShowCreateForm(true)
        } else {
            divRef.current.scroll({
                top: 0,
                behavior: "smooth"
            });
            setShowAuthForm(true)
        }
    }

    // useEffect(() => {
    //     if (DEBUG) setShowCreateForm(true)
    // }, []);

    return (
        <div className="interface" ref={divRef}>
            {showAuthForm && (
                <AuthForm onClose={() => setShowAuthForm(false)} />
            )}


            {showCreateForm ? (
                <PolygonCreate onClose={() => setShowCreateForm(false)} />
            ) :
                <>
                    <Polygons />
                    <button onClick={() => create()}>Report Sighting</button>
                </>

            }

        </div>
    );
};

export default Interface;