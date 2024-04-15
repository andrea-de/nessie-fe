const STORAGE_KEY = 'mapPolygons'; // Key for storing polygons in LocalStorage

export const loadPolygons = () => {
    try {
        return sampleCollection
        const storedData = localStorage.getItem(STORAGE_KEY);
        return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
        console.error('Error loading polygons:', error);
        return [];
    }
};

export const savePolygons = (polygons) => {
    try {
        // console.log('saving')
        // localStorage.setItem(STORAGE_KEY, JSON.stringify(polygons));
    } catch (error) {
        console.error('Error saving polygons:', error);
    }
};

const sampleCollection = [
    {
        type: 'Feature',
        properties: {
            id: 1,
            name: 'Polygon 1',
            description: 'This is the first polygon',
            status: 'Active',
        },
        geometry: {
            type: 'Polygon',
            coordinates: [
                [
                    [-4.48, 57.3],
                    [-4.45, 57.3],
                    [-4.45, 57.29],
                    [-4.48, 57.29],
                    [-4.48, 57.3],
                ],
            ],
        }
    },
    {
        type: 'Feature',
        properties: {
            id: 2,
            name: 'Polygon 2',
            description: 'This is the first polygon',
            status: 'Active',
        },
        geometry: {
            type: 'Polygon',
            coordinates: [
                [
                    [-4.43, 57.306],
                    [-4.44, 57.32],
                    [-4.45, 57.31],
                    [-4.43, 57.306]
                ],
            ],
        }
    }
]