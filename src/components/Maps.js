import React from "react";
import ReactDOM from "react-dom";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

//accessToken: 'pk.eyJ1IjoiZ2lhbmx1MDEiLCJhIjoiY2s1ejQ0a2gyMDY5NjNtcWp5cGF4Y21wMiJ9.S2-22wqQvv8B0aiya-Mh7A';
//site URL: mapbox://styles/gianlu01/ck5z9olku3d2r1jov9drsa1uu

/*export default function Maps(){
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 45.466944,
    longitude: 9.19,
    zoom: 11
  });

      //const Milan = transform([45.466944, 9.19], 'ESPG:4326', 'ESPG:4357'); 11
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
  const MODES = [
  { id: EditorModes.EDITING, text: 'Select and Edit Feature'},
  { id: EditorModes.DRAW_POINT, text: 'Draw Point'},
  { id: EditorModes.DRAW_PATH, text: 'Draw Polyline'},
  { id: EditorModes.DRAW_POLYGON, text: 'Draw Polygon'},
  { id: EditorModes.DRAW_RECTANGLE, text: 'Draw Rectangle'}
];
*/
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZ2lhbmx1MDEiLCJhIjoiY2s1ejQ0a2gyMDY5NjNtcWp5cGF4Y21wMiJ9.S2-22wqQvv8B0aiya-Mh7A"
});

export default function App() {
  const onDrawCreate = ({ features }) => {
    console.log(features);
  };

  const onDrawUpdate = ({ features }) => {
    console.log(features);
  };

  return (
    <div>
      <Map
        style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
        containerStyle={{
          height: "100vh",
          width: "100%"
        }}
        center={[9.19,45.466944]}
      >
        <DrawControl onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate} />
      </Map>
    </div>
  );
}
