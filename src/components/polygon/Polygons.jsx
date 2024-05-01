import React, { useContext } from 'react';
import { Context } from '../../Context';
import { updatePolygon } from '../../services/polygons';
import './Polygons.css';

const DEBUG = process.env.REACT_APP_DEBUG === 'TRUE' ?? false;

const Polygons = () => {
    const { polygons, setPolygons, selectedPolygon, setSelectedPolygon, user } = useContext(Context);

    const handleSave = async (e) => {
        e.preventDefault();
        const response = await updatePolygon(selectedPolygon);
        if (!response.ok) {
            // Add some success toast
            console.log((await response.json()).error);
        }
        else {
            // console.log("success");
            // Add some fail toast
        }
        setSelectedPolygon(null)
    }

    const handleCancel = async (e) => {
        e.preventDefault();
        setPolygons(polygons)
        setSelectedPolygon(null)
    }

    return (
        <div className='sightings'>
            <h3>Sightings:</h3>
            <ul>
                {polygons && JSON.stringify(polygons) !== '{}' &&
                    polygons.map((polygon, index) => (
                        <li
                            key={index}
                            data-polygon-id={polygon.id}
                            className={polygon.status}
                        >
                            <div
                                className="polygonItem"
                                // onClick={() => handlePolygonClick(polygon.id)}
                                onClick={() => setSelectedPolygon(polygon)}
                            >
                                <span>{polygon.name}</span>
                                {(user && user?.id == polygon.created_by) && <em className="createdBy">Your Submision</em>}
                            </div>
                            {selectedPolygon && selectedPolygon.id === polygon.id && (
                                <div className="expanded">
                                    {/* {(DEBUG === true) && (<>{JSON.stringify(selectedPolygon)}</>)} */}
                                    {(user == null || user?.role !== 'authorized') && (
                                        <>
                                            <hr />
                                            <div><span>Status:</span> <span>{polygon.status}</span></div>
                                        </>
                                    )}
                                    {/* <div><span>Notes:</span> <p className='notes' dangerouslySetInnerHTML={{ __html: polygon.notes.replace(/\n/g, '<br />') }} /></div> */}
                                    {user && user.role === 'authorized' && (
                                        <>
                                            <hr />
                                            <form className="polygonEdit">
                                                {/* <hr /> */}
                                                {/* <h4>Authorized Edit</h4> */}
                                                {/* <div>
                                                <label htmlFor="note">Add Note:</label>
                                                <textarea
                                                    id="note"
                                                    onClick={(e) => { e.preventDefault() }}
                                                    onChange={(e) => { setSelectedPolygon({ ...selectedPolygon, addNote: selectedPolygon.notes + '\n' + e.target.value, pending: 'update' }) }}
                                                >
                                                </textarea>
                                            </div> */}
                                                <div className="editStatus">
                                                    <div>
                                                        <label htmlFor="status">Status:</label>
                                                        <select
                                                            name="status"
                                                            id="status"
                                                            value={polygon.status}
                                                            onChange={(e) => { setSelectedPolygon({ ...selectedPolygon, pending: 'update', status: e.target.value }) }}
                                                        >
                                                            <option value="active">Active</option>
                                                            <option value="investigating">Investigating</option>
                                                            <option value="archived">Archived</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </form>
                                        </>
                                    )}
                                    {selectedPolygon.pending === 'update' &&
                                        (user?.role === 'authorized' || user?.id == polygon.created_by) &&
                                        (
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <button
                                                    style={{ backgroundColor: 'firebrick' }}
                                                    onClick={handleCancel}
                                                    disabled={selectedPolygon.pending !== 'update' ?? true}>
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleSave}
                                                    disabled={selectedPolygon.pending !== 'update' ?? true}>
                                                    Save
                                                </button>
                                            </div>
                                        )}
                                </div>
                            )}
                        </li>
                    ))
                }
            </ul>
            <>
                <span style={{ marginRight: '10px' }}>Hide Archived</span>
                <input type="checkbox" onClick={(e) => { e.target.checked === true ? setPolygons(polygons.filter(polygon => polygon.status !== 'archived')) : setPolygons(null) }} />
            </>
        </div>
    )
}

export default Polygons; 