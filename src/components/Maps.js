import React from 'react';
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlSourceOSM from "ol/source/OSM";
import * as olProj from 'ol/proj';
import {transform} from 'ol/proj';


class Maps extends React.Component {
  constructor(props) {
      super(props);

      // Milano: 1023068.820178505, 5694894.828017104
      //OSMStandard

      this.state = {
        center: [1023068.820178505, 5694894.828017104],
        zoom: 13
      }

      //const Milan = new transform ([45.466944, 9.19], 'ESPG:4326', 'ESPG:4357');

      
      this.olmap = new OlMap({
        target: null,
        layers: [
          new OlLayerTile({
            source: new OlSourceOSM(),
          })
        ],
        view: new OlView({
          center: this.state.center,
          zoom: this.state.zoom,
          maxZoom: 18,
          minZoom: 11
        })
      });

      this.olmap.on('click', function(evento){
          console.log(evento.coordinate);
      })
    }

    updateMap() {
      this.olmap.getView().setCenter(this.state.center);
      this.olmap.getView().setZoom(this.state.zoom);
    }

    componentDidMount() {
      this.olmap.setTarget("map");

      // Listen to map changes
      this.olmap.on("moveend", () => {
        let center = this.olmap.getView().getCenter();
        let zoom = this.olmap.getView().getZoom();
        this.setState({ center, zoom });
      });
    }

    shouldComponentUpdate(nextProps, nextState) {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      if (center === nextState.center && zoom === nextState.zoom) return false;
      return true;
    }
    
// <button onClick={e => this.updateMap    ()}>setState on click</button>

    render() {
      this.updateMap(); // Update map on render?
      return (
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      );
    }
  }
export default Maps;
