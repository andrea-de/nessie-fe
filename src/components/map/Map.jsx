import React, { useEffect, useState, useContext, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { Context } from '../../Context.js';
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const REACT_APP_MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = () => {

    const { user, polygons, setPolygons, selectedPolygon, setSelectedPolygon, drawingMode, setDrawingMode } = useContext(Context);

    // Needed for closure issue
    // const selection = useRef(selectedPolygon);
    const drawRef = useRef(null);
    const userRef = useRef(user);
    useEffect(() => { userRef.current = user }, [user]);

    const [map, setMap] = useState(null); // Mapbox map

    const featureEvent = (e) => {
        const pending = e.type == 'draw.create' ? 'create' : e.type == 'draw.update' ? 'update' : null;
        if (!e.features.length) setSelectedPolygon(null);
        else setSelectedPolygon({
            ...e.features[0].properties,
            coordinates: e.features[0].geometry.coordinates[0],
            pending: pending, // Used to determine if the polygon has been created or updated
        });
    };

    const mapSelection = (e) => {
        // if polygon selected
        if (e.features.length > 0) {
            const polygon = e.features[0];
            if (selectedPolygon?.pending && (selectedPolygon.id != polygon.properties.id)) setSelectedPolygon(null); // reset before changing selection
            setSelectedPolygon({ ...polygon.properties, coordinates: polygon.geometry.coordinates[0] });
            // and not a user
            if (!userRef.current ||
                // or not creator or authorized user
                (userRef.current.role != 'authorized' &&
                    userRef.current.id.toString() != e.features[0].properties.created_by)
            ) drawRef.current.changeMode('simple_select'); // undo selection
        } else if (selectedPolygon && selectedPolygon.pending) setSelectedPolygon(null); // reset before changing selection
        console.log('selectedPolygon: ', selectedPolygon);
        console.log('selectedPolygon?.pending: ', selectedPolygon?.pending);
    }

    const zoomToCoordinates = (coordinates) => {
        if (map) {
            const bounds = new mapboxgl.LngLatBounds();
            coordinates.forEach((coord) => {
                bounds.extend(coord);
            });
            map.fitBounds(bounds, { padding: 50 });
        }
    };

    const createMapboxFeature = (polygon) => {
        const mapBoxFeature = {
            type: 'Feature',
            properties: {
                id: polygon.id,
                name: polygon.name,
                description: polygon.description,
                status: polygon.status,
                created_by: polygon.created_by,
                // modifiedDate: polygon.modified_date,
            },
            geometry: {
                type: 'Polygon',
                coordinates: [polygon.coordinates],
            },
            id: polygon.id
        }
        return mapBoxFeature;
    }

    useEffect(() => {
        mapboxgl.accessToken = REACT_APP_MAPBOX_TOKEN

        const map = new mapboxgl.Map({
            container: 'map',
            // style: mapStyle,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-4.5, 57.28],
            zoom: 10,
            minZoom: 5,
            maxZoom: 15,
            maxBounds: [
                [-5.05, 56.8], // Southwest coordinates
                [-4.05, 57.75]  // Northeast coordinates
            ]
        });

        map.on('draw.create', featureEvent);
        map.on('draw.update', featureEvent);
        // map.on('draw.selectionchange', featureEvent); // 
        map.on('draw.selectionchange', mapSelection);
        // map.on('draw.modechange', (e) => {});


        const drawInstance = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: false,
                trash: false,
            },
        });

        map.addControl(drawInstance);
        // setDraw(drawInstance);
        drawRef.current = drawInstance;
        setMap(map);

        return () => map.remove();
    }, []);

    // On polygon state chance
    useEffect(() => {
        if (polygons && polygons.length && drawRef.current) {
            const featureCollection = polygons.map(polygon => createMapboxFeature(polygon));
            drawRef.current.set({ type: 'FeatureCollection', features: featureCollection });
            return;
        }
    }, [polygons, drawRef.current]);

    // On selected polygon change
    const [lastSelectedId, setLastSelectedId] = useState(null);
    useEffect(() => {
        // console.log('selectedPolygon: ', selectedPolygon);
        if (selectedPolygon?.coordinates && selectedPolygon.id != lastSelectedId) {
            // console.log('hit');
            zoomToCoordinates(selectedPolygon.coordinates);
        }
        setLastSelectedId(selectedPolygon?.id)
    }, [selectedPolygon]);

    // On drawing mode change
    useEffect(() => {
        if (drawRef.current) {
            if (drawingMode) drawRef.current.changeMode('draw_polygon');
            else drawRef.current.changeMode('simple_select');
        }
    }, [drawingMode, drawRef.current]);

    // useEffect(() => {
    // Update polygon with coordinates and feature with new properties
    // if (pending) {
    //     console.log('trigger');
    //     setSelectedPolygon({
    //         ...selectedPolygon,
    //         coordinates: pending.geometry.coordinates[0],
    //         status: 'pending',
    //     })
    // }
    // }, [pending]);

    return (
        <div style={{ position: 'relative', height: "100%" }}>
            <div id="map" className={`${drawingMode ? 'drawingMode' : ''}`}></div>
        </div>
    );
};

export default Map;


// const mapStyle = {
//     version: 8,
//     name: 'Basic Style',
//     sources: {
//         'mapbox-streets': {
//             type: 'vector',
//             url: 'mapbox://mapbox.mapbox-streets-v8'
//         }
//     },
//     layers: [
//         {
//             id: 'water',
//             type: 'fill',
//             source: 'mapbox-streets',
//             'source-layer': 'water',
//             paint: {
//                 'fill-color': '#0088ff' // Blue water
//             }
//         },
//         {
//             id: 'land',
//             type: 'fill',
//             source: 'mapbox-streets',
//             'source-layer': 'land',
//             paint: {
//                 'fill-color': '#f0f0f0' // Light gray land
//             }
//         },


//     ]
// }