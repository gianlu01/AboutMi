import React from "react";
import ReactDOM from "react-dom";
import ReactMapboxGl, {
  Layer,
  Marker,
  Feature,
  GeoJSONLayer
} from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import * as turf from '@turf/turf';
import Data from '../data/Data.geojson'
//accessToken: 'pk.eyJ1IjoiZ2lhbmx1MDEiLCJhIjoiY2s1ejQ0a2gyMDY5NjNtcWp5cGF4Y21wMiJ9.S2-22wqQvv8B0aiya-Mh7A';
//site URL: mapbox://styles/gianlu01/ck5z9olku3d2r1jov9drsa1uu
//geoJson URL: http://dati.comune.milano.it/dataset/ds252-economia-locali-pubblico-spettacolo/resource/e5e1c5ed-03b9-415e-9880-a2c163e4973f/view/76fa6876-f208-440f-a57c-6b3d71e52278

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZ2lhbmx1MDEiLCJhIjoiY2s1ejQ0a2gyMDY5NjNtcWp5cGF4Y21wMiJ9.S2-22wqQvv8B0aiya-Mh7A"
});

class Maps extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stato: false,
      markers: Data
    }
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

    const onDrawCreate = ({features}) => {
      console.log("data ==  "+Data)
      var result = turf.pointsWithinPolygon(Data, this.drawControl.draw.getAll());
      console.log(result)
      if (result.features.length <= 0) {
        alert("Locals not founds")
      } else {
        this.setState({
          stato: true,
          markers:result
        });
        console.log(this.state.markers)
        //MM();
      }
    };

    const onDrawUpdate = ({ features}) => {
            //onDrawCreate(features);
        };

    return (
      <div>
        <Map style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
          containerStyle={{
            height: "100vh",
            width: "100%"
          }}
          center={
          [9.19, 45.466944]
          } >
              //@TODO pasto sai cosa devi fare ahahaha
          <div style={{
            textAlign: 'center'
          }} >
            <input type='text'
              placeholder='ahhhhhhhhh'
              style={{
                position: 'absolute'
                    }} >
            </input>
          </div>
            <GeoJSONLayer
              data={'https://dati.comune.milano.it/dataset/ds252-economia-locali-pubblico-spettacolo/resource/e5e1c5ed-03b9-415e-9880-a2c163e4973f/view/76fa6876-f208-440f-a57c-6b3d71e52278'}
              symbolLayout={{
                'text-field': "A"
                }}
              >
            </GeoJSONLayer>
            <DrawControl
              onDrawCreate={onDrawCreate}
              onDrawUpdate={onDrawUpdate}
              controls={controls}
              ref={(drawControl) => { this.drawControl = drawControl; }}
            />
        </Map>
      </div>
    );
  }
}
export default Maps;



            /*
{if (markerState.state){
                    <Marker
                      coordinates={[-0.2416815, 51.5285582]}
                      anchor="bottom">
                    </Marker>
                    //onClick={this.onMarkerClick.bind(this, feature.geometry.coordinates)}>
                  }}*/
