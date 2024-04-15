import React, { createContext, useState, useEffect } from 'react';
import { getPolygons } from './services/polygons';

const Context = createContext({
    user: null,
    setUser: () => { },
    isLoggedIn: false,
    setIsLoggedIn: () => { },
    jwt: null,
    setJwt: () => { },
    polygons: [],
    setPolygons: () => { },
    selectedPolygonID: {},
    setSelectedPolygonID: () => { },
    selectedPolygon: {},
    setSelectedPolygon: () => { },
    drawingMode: false,
    setDrawingMode: () => { },
    showAuthForm: false,
    setShowAuthForm: () => { },
});

const Provider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const [user, setUser] = useState({email: "donnie@element.com", role: "authorized", id: 1});
    const [jwt, setJwt] = useState(null);
    const [polygons, setPolygons] = useState([]);
    const [selectedPolygonID, setSelectedPolygonID] = useState(null);
    const [selectedPolygon, setSelectedPolygon] = useState({});
    const [drawingMode, setDrawingMode] = useState(false);
    const [showAuthForm, setShowAuthForm] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchMapData = async () => {
            try {
                const data = await getPolygons();
                setPolygons(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchMapData();
    }, []);

    return (
        <Context.Provider value={{
            user,
            setUser: (newUser) => setUser(newUser),
            jwt,
            setJwt: (newJWT) => setJwt(newJWT),
            polygons,
            setPolygons: (newPolygons) => setPolygons(newPolygons),
            selectedPolygonID,
            setSelectedPolygonID: (newPolygon) => setSelectedPolygonID(newPolygon),
            selectedPolygon,
            setSelectedPolygon: (polygon) => setSelectedPolygon(polygon),
            drawingMode,
            setDrawingMode: (bool) => setDrawingMode(bool),
            showAuthForm,
            setShowAuthForm: (newState) => setShowAuthForm(newState),
            isLoggedIn,
            setIsLoggedIn: (newState) => setIsLoggedIn(newState)
        }}>
            {children}
        </Context.Provider>
    );
};

export { Context, Provider }; 