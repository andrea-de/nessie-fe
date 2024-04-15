import React, { createContext, useState, useEffect } from 'react';
import { Provider } from './Context';
import Map from './components/map/Map';
import Header from './components/header/Header';
import Interface from './components/Interface';
import './App.css';
import './dark.css';

function App() {
  return (
    <>
      <Provider>
        <main>
          <div className='header'>
            <Header />
          </div>
          <div className="content">
            <Interface />
            <div className="mapContainer">
              <Map />
            </div>
          </div>
        </main>
      </Provider>
    </>
  )
}

export default App;
