import React, { useContext } from 'react';
import { Context } from '../../Context';
import './Polygons.css';

const Polygons = () => {
    const { polygons, selectedPolygonID, setSelectedPolygonID } = useContext(Context);

    const handlePolygonClick = (polygonId) => {
        if (selectedPolygonID === polygonId) {
            setSelectedPolygonID(null);
            return;
        }
        setSelectedPolygonID(polygonId);
    };

    return (
        <div className='sightings'>
            <h3>Sightings:</h3>
            <ul>
                {JSON.stringify(polygons) != '{}' &&
                    polygons.map((polygon, index) => (
                        <li
                            key={index}
                            data-polygon-id={polygon.id}
                            onClick={() => handlePolygonClick(polygon.id)}
                            className={polygon.status}
                        >
                            <div className="polygonItem">
                                <span>{polygon.name}</span>
                            </div>
                            {selectedPolygonID && selectedPolygonID === polygon.id && (
                                <div className="expanded">
                                    <hr />
                                    <div><span>Status:</span> <span>{polygon.status}</span></div>
                                    <div><span>Notes:</span> <p className='notes'>{polygon.notes}</p></div>
                                    {true && (
                                        <form className="polygonEdit" onSubmit={()=>{}}>
                                            <hr />
                                            <h4>Authorized Edit</h4>
                                            <div>
                                                <label htmlFor="note">Add Note:</label>
                                                <textarea
                                                    id="note"
                                                    value={''}
                                                    onChange={(e) => {}}
                                                />
                                            </div>
                                            <div className="editStatus">
                                                <div>
                                                    <label htmlFor="status">Status:</label>
                                                    <select name="status" id="status">
                                                        <option value="active">Volvo</option>
                                                        <option value="investigating">Saab</option>
                                                        <option value="archived">Mercedes</option>
                                                    </select>
                                                </div>
                                                <button type="submit">Submit</button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            )}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Polygons; 