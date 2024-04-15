import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context.js';
import './PolygonCreate.css';
import { createPolygon } from '../../services/polygons';

const DEBUG = process.env.REACT_APP_DEBUG == 'TRUE' ?? false;

const PolygonCreate = ({ onClose }) => {
    const { drawingMode, setDrawingMode, selectedPolygon, setSelectedPolygon, user } = useContext(Context);

    const [name, setName] = useState('');
    const [note, setNote] = useState('');
    const [error, setError] = useState(null); // Error message to display
    const [newPolygon, setNewPolygon] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await createPolygon(newPolygon);
        if (!response.ok) setError((await response.json()).error);
        else {
            setSelectedPolygon(null)
            onClose();
        }
    };

    useEffect(() => {
        const newPolygon = {
            name: name,
            notes: note,
            created_by: user.id ?? '',
        }
        setNewPolygon(newPolygon);
        if (DEBUG) {
            setName('Test sighting');
            setNote('This is nothing');
        }
    
    }, []);

    useEffect(() => {
        if (!newPolygon) return;
        const polygon = newPolygon
        polygon.name = name
        polygon.notes = note
        setNewPolygon(polygon)

    }, [name, note])

    useEffect(() => {
        if (!newPolygon || !selectedPolygon) return;
        setNewPolygon({ ...newPolygon, coordinates: selectedPolygon.coordinates });
    }, [selectedPolygon])

    return (
        <form className="polygonCreate" onSubmit={handleSubmit}>
            {DEBUG && newPolygon && (<>{JSON.stringify(newPolygon)}</>)}
            <h2>
                New Sighting
            </h2>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="note">Note:</label>
                <textarea
                    id="note"
                    onChange={(e) => setNote(e.target.value)}
                />
            </div>
            <div className="buttons">
                <button type="button" onClick={onClose}>Cancel</button>
                {newPolygon && !newPolygon.coordinates && !drawingMode && (
                    <button type="button" className="draw" onClick={() => setDrawingMode(true)}>Draw</button>
                )}
                <button type="submit" disabled={
                    (!newPolygon || !newPolygon.coordinates || !newPolygon.name || !newPolygon.notes)
                }>Save</button>
            </div>
        </form>
    );
}

export default PolygonCreate; 