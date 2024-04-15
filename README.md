# Mapbox User and Polygon Frontend (React)

This React application provides a user-friendly interface for interacting with a Mapbox map, drawing and visualizing polygons, and user management.

This Application Depends on the Backend and Database configuration described [here](https://github.com/andrea-de/nessie-be)

### Key Features

#### User Management:
- User registration and login forms.
- Stores and handles JWT tokens for API authentication.
- UI for Polygon Data:
    - Display the name, notes, and status of a selected polygon.
    - Controls to change the status or delete a polygon (if authorized).

#### Mapbox Integration:

- Renders a Mapbox map
- Loads polygon data from the backend API.
- Displays polygons on the map.

- Utilize Mapbox Draw for users to create new polygons.
- Allow select of existing polygons for editing.
- Send updated coordinates and metadata to the backend.

## Requirements

1. Mapbox access token.
    - REACT_APP_MAPBOX_TOKEN
    - REACT_APP_BACKEND_URL

2. Supabase Database
    - [Schemas]()

3. Running [Backend service](https://github.com/andrea-de/nessie-be)

## Usage

1. Public
    - Navigate map
    - See information about drawn polygons
    - Register new user
    - Log in

2. Normal User
    - Public (See Above)
    - Create polygon
    - Edit previous created polygon  in active state

3. Superuser
    - Normal User (See Above)
    - Edit polygon 

## Additional Notes
Link to [Node Backend](https://github.com/andrea-de/nessie-be) 

### TODO

Implement input validation.
Consider a state management library (e.g., Redux) for larger applications.