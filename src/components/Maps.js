import React from 'react';

class Maps extends React.Component {

    

    constructor(props) {
        super(props);

        this.state = {
            MilanCenterLongitude: 0,
            MilanCenterLatitude: 0,
        }
    }

    /*
    GOOGLE MAPS KEY: AIzaSyAkIIny_Su6sONvSIcxWXDQf-vsRtFkgsQ
    */

    /*
    <iframe width="600" height="450" frameborder="0" style="border:0"
            src="https://www.google.com/maps/embed/v1/undefined?origin=45.464158,9.190135&key=AIzaSyD9txqoQcldz6dlRlGxeDCDQUPBYz51lZM" allowfullscreen>
            </iframe>
            */

    render() {
        return (
            <div>
                <h1>PROVA</h1>
                <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAkIIny_Su6sONvSIcxWXDQf-vsRtFkgsQ&q=Eiffel+Tower,Paris+France"></iframe>
            </div> 
        );
    }

}
export default Maps;
