import React from "react";
import ReactDOM from "react-dom";
import ReactMapboxGl, {Layer, Marker, Feature} from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import * as turf from '@turf/turf';

//accessToken: 'pk.eyJ1IjoiZ2lhbmx1MDEiLCJhIjoiY2s1ejQ0a2gyMDY5NjNtcWp5cGF4Y21wMiJ9.S2-22wqQvv8B0aiya-Mh7A';
//site URL: mapbox://styles/gianlu01/ck5z9olku3d2r1jov9drsa1uu

const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoiZ2lhbmx1MDEiLCJhIjoiY2s1ejQ0a2gyMDY5NjNtcWp5cGF4Y21wMiJ9.S2-22wqQvv8B0aiya-Mh7A"
});

class Maps extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        stato: false,
        markers: []
      }
    }



    render (){

      var points = turf.points([
          [9.19,45.466944],
          [9.1792887,45.4704962]
      ]);

      const controls = {
        polygon: true,
        trash: true,
        point: false,
        line_string: false,
        combine_features:false,
        uncombine_features:false
      }

      const MM=()=>{
        if(this.state.stato){
          console.log(this.state.markers)
        return(
          <Layer
                type="symbol"
                id="marker"
                layout={{ "icon-image": "marker-15" }}>
                <Feature coordinates={[
                  this.state.markers[0].geometry.coordinates[0],
                  this.state.markers[0].geometry.coordinates[1]
                ]}/>}
              </Layer>
        );
      }
      }
        const onDrawCreate = ({ features }) => {
            var poly = features[0].geometry.coordinates;
            poly = turf.polygon(poly);
            var result = turf.pointsWithinPolygon(points, poly);
            //se trovo i locali
            if (result.features.length <= 0) {
                alert("Locals not founds")
            }else{
              console.log(result)
              this.setState({stato: true});
              this.setState({markers: result.features});
            }
          };

          const onDrawUpdate = ({ features }) => {
            console.log(features);
          };

      return(
        <div>
          <Map
            style=  "mapbox://styles/mapbox/streets-v9" // eslint-disable-line
            containerStyle={{
              height: "100vh",
              width: "100%"
            }}
            center={[9.19,45.466944]}
            >
            //@TODO pasto sai cosa devi fare ahahaha
            <div style={{textAlign: 'center'}}>
              <input type='text' placeholder='ahhhhhhhhh' style={{position: 'absolute'}}></input>
              </div>
              <DrawControl
                onDrawCreate={onDrawCreate}
                onDrawUpdate={onDrawUpdate}
                controls={controls}
              />
              {MM()}
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
