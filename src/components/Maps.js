import React from 'react';

/*import {Map, GoogleApiWrapper} from 'google-maps-react';*/
import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

class Maps extends React.Component {



    constructor(props) {
        super(props);

        this.state = {
            MilanCenterLongitude: 45.464239,
            MilanCenterLatitude: 9.190464
        }
    }

    /*
    benf AIzaSyA9B_7XajHjzmvysfrrCm5xQ4_44NF500Q
    */


    render() {
        return (
          <div>
          <Map view={{center: [0,0], zoom: 2}}>
          </Map>
  </div>
        );
    }

}
export default Maps;
