import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import ReactMapGL from 'react-map-gl';

//accessToken: 'pk.eyJ1IjoiZ2lhbmx1MDEiLCJhIjoiY2s1ejQ0a2gyMDY5NjNtcWp5cGF4Y21wMiJ9.S2-22wqQvv8B0aiya-Mh7A';
//site URL: mapbox://styles/gianlu01/ck5z9olku3d2r1jov9drsa1uu

export default function Maps(){
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 45.466944,
    longitude: 9.19,
    zoom: 11
  });

      //const Milan = transform([45.466944, 9.19], 'ESPG:4326', 'ESPG:4357');
      return (
        <div>
        <ReactMapGL
        {...viewport}
        onViewportChange={setViewport}
        mapboxApiAccessToken={'pk.eyJ1IjoiZ2lhbmx1MDEiLCJhIjoiY2s1ejQ0a2gyMDY5NjNtcWp5cGF4Y21wMiJ9.S2-22wqQvv8B0aiya-Mh7A'}
        mapStyle={'mapbox://styles/gianlu01/ck5z9olku3d2r1jov9drsa1uu'  }
        >
        <div>
          <input placeholder="Cerca un locale"></input>
        </div>
        </ReactMapGL>
        </div>
      );
  }
