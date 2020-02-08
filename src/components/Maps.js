import React from "react";
import ReactDOM from "react-dom";
import ReactMapboxGl, {
  Layer,
  Marker,
  Feature,
  GeoJSONLayer,
  Cluster
} from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import * as turf from '@turf/turf';
import mIcon from '../icons/marker.svg';
//import Dati from '../data/Dati.json'
//accessToken: 'pk.eyJ1IjoiZ2lhbmx1MDEiLCJhIjoiY2s1ejQ0a2gyMDY5NjNtcWp5cGF4Y21wMiJ9.S2-22wqQvv8B0aiya-Mh7A';
//site URL: mapbox://styles/gianlu01/ck5z9olku3d2r1jov9drsa1uu
//geoJson URL: http://dati.comune.milano.it/dataset/ds252-economia-locali-pubblico-spettacolo/resource/e5e1c5ed-03b9-415e-9880-a2c163e4973f/view/76fa6876-f208-440f-a57c-6b3d71e52278

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZ2lhbmx1MDEiLCJhIjoiY2s1ejQ0a2gyMDY5NjNtcWp5cGF4Y21wMiJ9.S2-22wqQvv8B0aiya-Mh7A",
  minZoom: 8,
  maxZoom: 17
});

class Maps extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stato: false,
      markers: {},
      appoggio: {},
      mapCenter: [9.19, 45.466944]
    }
  }

  componentDidMount() {
    fetch('https://michelebanfi.github.io/datasethosting/economia_locale_pubblico_spettacolo.geojson', {
      method: "GET"
    }).then(response => {
      return (response.text())
    }).then(a => {
      this.setState({
        markers: JSON.parse(a),
        appoggio: JSON.parse(a)
      });
    })
  }

  render() {
    const controls = {
      polygon: true,
      trash: true,
      point: false,
      line_string: false,
      combine_features: false,
      uncombine_features: false
    }

    const onDrawCreate = ({ features }) => {
      var c = this.state.markers;
      for (var u = 0; u < c.features.length; u++) {
        if (c.features[u].geometry.coordinates.length == 0) c.features.splice(u, 1);
      }
      var result = turf.pointsWithinPolygon(c, this.drawControl.draw.getAll());
      if (result.features.length <= 0) {
        alert("Locals not founds")
      } else {
        this.setState({
          stato: true,
          markers: result
        });
      }
    };

    const onDrawDelete = ({ feature }) => {
      this.setState({
        stato: false,
        markers: this.state.appoggio
      });
    }

    /*
    <GeoJSONLayer
      data={'https://michelebanfi.github.io/datasethosting/economia_locale_pubblico_spettacolo.geojson'}
      symbolLayout={{
        'text-field': "A"
        }}
      ></GeoJSONLayer>
      this.state.markers.features.map(point=>(
        <Marker
          coordinates={point.coordinates}
        >
        </Marker>
      ))
*/

    const MM = () => {
      if (this.state.stato) {
        return this.state.markers.features.map(point => (
          <Marker
            coordinates={point.geometry.coordinates}
            anchor="bottom"
          >
            <button>
              <img src={mIcon} style={{ width: '10%', height: '10%' }} />
            </button>
          </Marker>
        ))
        //S Map.flyTo({center: [0, 0], zoom: 9});
      }
    }

    return (
      <div>
        <Map style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
          containerStyle={{
            height: "100vh",
            width: "100%"
          }}
          center={this.state.mapCenter}>
          {MM()}
          <DrawControl
            onDrawCreate={onDrawCreate}
            onDrawDelete={onDrawDelete}
            controls={controls}
            ref={(drawControl) => { this.drawControl = drawControl; }}
          />
        </Map>
      </div>
    );
  }
}
export default Maps;
