import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import ReactMapGL from 'react-map-gl';
import { Editor, EditorModes } from 'react-map-gl-draw';

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
  }*/
  const MODES = [
  { id: EditorModes.EDITING, text: 'Select and Edit Feature'},
  { id: EditorModes.DRAW_POINT, text: 'Draw Point'},
  { id: EditorModes.DRAW_PATH, text: 'Draw Polyline'},
  { id: EditorModes.DRAW_POLYGON, text: 'Draw Polygon'},
  { id: EditorModes.DRAW_RECTANGLE, text: 'Draw Rectangle'}
];

const DEFAULT_VIEWPORT = {
  width: '100vh',
  height: '100%',
  longitude: 9.19,
  latitude: 45.466944,
  zoom: 11
};

class Maps extends React.Component {
  state = {
    // map
    viewport: DEFAULT_VIEWPORT,
    // editor
    selectedMode: EditorModes.DRAW_POLYGON
  };

  _switchMode = evt => {
    const selectedMode = evt.target.id;
    this.setState({
     selectedMode: selectedMode === this.state.selectedMode ? null : selectedMode
    });
  };

  _renderToolbar = () => {
    return (
      <div style={{position: 'absolute', top: 0, right: 0, maxWidth: '320px'}}>
        <select onChange={this._switchMode}>
          <option value="">--Please choose a mode--</option>
          {MODES.map(mode => <option value={mode.id}>{mode.text}</option>)}
        </select>
      </div>
    );
  };
  _onViewportChange = viewport => {
        this.setState({viewport});
    };

  render() {
    const { viewport, selectedMode } = this.state;
    return (
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        mapboxApiAccessToken={'pk.eyJ1IjoiZ2lhbmx1MDEiLCJhIjoiY2s1ejQ0a2gyMDY5NjNtcWp5cGF4Y21wMiJ9.S2-22wqQvv8B0aiya-Mh7A'}
        mapStyle={'mapbox://styles/gianlu01/ck5z9olku3d2r1jov9drsa1uu'  }
        onViewportChange={this._onViewportChange}
        onSelect={console.log("a")}
      >
        <Editor
          clickRadius={12}
          mode={selectedMode}
        />
        {this._renderToolbar()}
      </ReactMapGL>
    );
  }
}
export default Maps;
