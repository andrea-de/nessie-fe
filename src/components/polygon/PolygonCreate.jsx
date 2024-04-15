import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context.js';
import './PolygonCreate.css';
import { createPolygon } from '../../services/polygons';

const PolygonCreate = ({ onClose }) => {
    const { drawingMode, setDrawingMode, selectedPolygon, setSelectedPolygon } = useContext(Context);

    const [name, setName] = useState('a');
    const [note, setNote] = useState('b');
    const [error, setError] = useState(null); // Error message to display
    const [newPolygon, setNewPolygon] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log('newPolygon: ', newPolygon);
        // return;
        const response = await createPolygon(newPolygon);
        if (!response.ok) setError((await response.json()).error);
        else onClose();
    };

    useEffect(() => {
        const newPolygon = {
            name: name,
            notes: note,
            // coordinates: [
            //     [-4.933594281824213, 57.27963203762246],
            //     [-4.824676650782067, 57.257915746433014],
            //     [-4.845098706602954, 57.29287636616823],
            //     [-4.933594281824213, 57.27963203762246]
            // ]
            // created_by: 
        }
        setNewPolygon(newPolygon);
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
        console.log('selectedPolygon.coordinates: ', selectedPolygon.coordinates);
        const polygon = newPolygon
        polygon.coordinates = selectedPolygon.coordinates;
        setNewPolygon(polygon)

    }, [selectedPolygon])

    useEffect(() => {
        console.log('newPolygon: ', newPolygon);
    }, [newPolygon])

    return (
        <form className="polygonCreate" onSubmit={handleSubmit}>
            <p>
                {/* {selectedPolygon && JSON.stringify(selectedPolygon) != '{}'( */}
                {newPolygon && (
                    <>
                        {newPolygon.name ?? ''}
                        {newPolygon.notes ?? ''}
                        {newPolygon.coordinates ?? ''}
                    </>
                )}
            </p>
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
                <button type="submit" disabled={!newPolygon}>Save</button>
            </div>
        </form>
    );
}

export default PolygonCreate; 