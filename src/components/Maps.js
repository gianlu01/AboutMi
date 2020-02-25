import React from "react";
import ReactMapboxGl, {
  Marker,
  Layer,
  Feature,
  Popup
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
  minZoom: 11,
  maxZoom: 17,
  dragRotate: false,
  touchZoomRotate: false
});
const layout={'icon-image':'icon'}
const image= new Image(20,20);
image.src=mIcon;
const images=['icon', image];
class Maps extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stato: false,
      markers: {},
      appoggio: {},
      mapCenter: [9.19, 45.466944],
      popup: {
        status: false,
        coordinates: []
      },
      zoom: [8],
      geoLocation: navigator.geolocation.getCurrentPosition(posizione => { return ([posizione.coords.latitude, posizione.coords.longitude]) })
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
        alert("Nessun locale trovato")
      } else {
        this.setState({
          stato: true,
          markers: result
        });
      }
      this.drawControl.draw.delete(this.drawControl.draw.getAll().features[0].id);
    };

    const onDrawDelete = ({ feature }) => {
      this.setState({
        stato: false,
        markers: this.state.appoggio
      });
    }

    function renderPopup(point) {
      return (
        console.log(point.properties.insegna.toUpperCase())
      );
    }
    /*
    {point.properties.insegna.toUpperCase()}*/
    const MM = () => {
      if (this.state.stato) {
        return this.state.markers.features.map(point=>(
          <Feature
            coordinates={point.geometry.coordinates}
            onClick={()=>{markerClicked(point.geometry.coordinates)}}
          />
        )
      )
      }
    }

    const markerClicked =(coo)=>{
      this.setState({
        mapCenter: coo,
        zoom: [16],
        popup: {
          status: true,
          coordinates: coo
        }
      });
    }

    return (
      <div>
        <Map style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
          containerStyle={{
            height: "100vh",
            width: "100%"
          }}
          center={this.state.mapCenter}
          zoom={this.state.zoom}>
          <Layer type="symbol" id="marker" layout={layout} images={images} >
            {MM()}
          </Layer>
          <DrawControl
            onDrawCreate={onDrawCreate}
            onDrawDelete={onDrawDelete}
            boxSelect={false}
            controls={controls}
            ref={(drawControl) => { this.drawControl = drawControl; }}
          />
          {this.state.popup.status && (
            <Popup coordinates={this.state.popup.coordinates}>

            </Popup>)}
        </Map>
      </div>
    );
  }
}
export default Maps;

/*{this.state.stato && (
  this.state.markers.features.map(point=>(
    <Feature
      coordinates={point.geometry.coordinates}
      onClick={()=>{markerClicked(point.geometry.coordinates)}}
    />
  )
)
)}*/
