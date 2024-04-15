import React, { useEffect, useState, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { Context } from '../../Context.js';
// import { loadPolygons, savePolygons as savePolygon } from '../../polygonDB.js'
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const REACT_APP_MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = () => {

    const { polygons, setPolygons, selectedPolygonID, setSelectedPolygonID, selectedPolygon, setSelectedPolygon, drawingMode, setDrawingMode } = useContext(Context);

    const [drawnPolygons, setDrawnPolygons] = useState([]); // Mapbox features
    const [map, setMap] = useState(null); // Mapbox map
    const [draw, setDraw] = useState(null); // Mapbox draw

    const [pending, setPending] = useState(null); // Mapbox draw

    const createPolygon = (e, p) => {
        setSelectedPolygon({
            ...selectedPolygon,
            coordinates: e.features[0].geometry.coordinates[0]
        });
    }

    const updateFeature = (e) => {
        setSelectedPolygon({
            ...selectedPolygon,
            coordinates: e.features[0].geometry.coordinates[0]
        });
    };

    useEffect(() => {
        mapboxgl.accessToken = REACT_APP_MAPBOX_TOKEN

        const map = new mapboxgl.Map({
            container: 'map',
            // style: mapStyle,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-4.5, 57.28],
            zoom: 10,
            minZoom: 5,  // Minimum allowed zoom level
            maxZoom: 15,  // Maximum allowed zoom level
            maxBounds: [
                [-5.05, 56.8], // Southwest coordinates
                [-4.05, 57.75]  // Northeast coordinates
            ]
        });

        map.on('draw.create', updateFeature);
        map.on('draw.update', updateFeature);

        map.on('draw.modechange', (e) => {
            // console.log('e.mode: ', e.mode);
            // if (e.mode == 'simple_select') {
            // setDrawingMode(false);
            // }
        });

        map.on('draw.selectionchange', (e) => {
            // Check Permission and remove selection
            // setDrawingMode(false);
            // drawInstance.changeMode('simple_select');
            if (e.features.length > 0) {
                const selectedFeatureId = e.features[0].properties.id;
                setSelectedPolygonID(selectedFeatureId);
            }
        });

        const drawInstance = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: false,
                trash: false,
            },
        });

        map.addControl(drawInstance);
        setDraw(drawInstance);

        setMap(map);

        return () => map.remove();
    }, []);

    const createMapboxFeature = (polygon) => {
        const mapBoxFeature = {
            type: 'Feature',
            properties: {
                id: polygon.id,
                name: polygon.name,
                description: polygon.description,
                status: polygon.status,
                createdBy: polygon.created_by,
                modifiedDate: polygon.modified_date,
            },
            geometry: {
                type: 'Polygon',
                coordinates: [polygon.coordinates],
            }
        }
        return mapBoxFeature;
    }

    // On polygon state chance
    useEffect(() => {
        if (polygons.length && draw) {
            polygons.forEach((polygon) => {
                // Create Mapbox feature
                const mapBoxFeature = createMapboxFeature(polygon);
                // Check existing features
                const existingFeature = drawnPolygons.find((feature) => feature.properties.id === polygon.id);
                // Add to Drawn polygons if not existing
                if (!existingFeature) setDrawnPolygons((prev) => [...prev, mapBoxFeature]);

                // Replace if existing but not updated
                else {
                    if (existingFeature.properties.modifiedDate !== polygon.modified_date)
                        setDrawnPolygons((prev) => prev.map((feature) => feature.properties.id === polygon.id ? mapBoxFeature : feature));
                }
            })
        }
    }, [polygons, draw]);

    // On mapbox polygons change
    useEffect(() => {
        if (draw && drawnPolygons.length) {
            // TODO: Remove and Add instead of removeAll and addAll
            draw.deleteAll();
            drawnPolygons.forEach((polygon) => draw.add(polygon));
        }
    }, [drawnPolygons]);


    const zoomToCoordinates = (coordinates) => {
        if (map) {
            const bounds = new mapboxgl.LngLatBounds();
            coordinates.forEach((coord) => {
                bounds.extend(coord);
            });
            map.fitBounds(bounds, { padding: 50 });
        }
    };

    // On selected polygon change
    useEffect(() => {
        if (selectedPolygonID) {
            const zoomTo = drawnPolygons.filter((polygon) => polygon.properties.id === selectedPolygonID)[0]
            const coors = zoomTo.geometry.coordinates[0];
            zoomToCoordinates(coors);
        }
    }, [selectedPolygonID]);

    // useEffect(() => {
    // if (draw) {
    //     if (JSON.stringify(selectedPolygon) === '{}') {
    //         console.log('hit');
    //         draw.changeMode('simple_select');
    //     }
    //     else {
    //         draw.changeMode('simple_select');
    //     }
    // }
    // }, [drawingMode, selectedPolygon, selectedPolygonID, draw]);

    // On drawing mode change
    useEffect(() => {
        if (draw) {
            if (drawingMode) draw.changeMode('draw_polygon');
            else draw.changeMode('simple_select');
        }
    }, [drawingMode, draw]);

    // useEffect(() => {
    //     console.log('selectedPolygon: ', selectedPolygon);
    // }, [selectedPolygon]);

    useEffect(() => {
        // Update polygon with coordinates and feature with new properties
        if (pending) {
            console.log('trigger');
            setSelectedPolygon({
                ...selectedPolygon,
                coordinates: pending.geometry.coordinates[0],
                status: 'pending',
            })
        }
    }, [pending]);

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