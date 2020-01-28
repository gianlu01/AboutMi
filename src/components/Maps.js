import React from 'react';

/*import {Map, GoogleApiWrapper} from 'google-maps-react';*/

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
            <iframe
              width="100%"
              height="100%"
              frameborder="0" style="border:0"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA9B_7XajHjzmvysfrrCm5xQ4_44NF500Q
              &q=Space+Needle,Seattle+WA">
            </iframe>
            </div>
        );
    }

}
export default Maps;
