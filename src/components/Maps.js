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
import ReviewModal from './ReviewModal.js';
//import Dati from '../data/Dati.json'
//accessToken: 'pk.eyJ1IjoiZ2lhbmx1MDEiLCJhIjoiY2s1ejQ0a2gyMDY5NjNtcWp5cGF4Y21wMiJ9.S2-22wqQvv8B0aiya-Mh7A';
//site URL: mapbox://styles/gianlu01/ck5z9olku3d2r1jov9drsa1uu
//geoJson URL: http://dati.comune.milano.it/dataset/ds252-economia-locali-pubblico-spettacolo/resource/e5e1c5ed-03b9-415e-9880-a2c163e4973f/view/76fa6876-f208-440f-a57c-6b3d71e52278

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZ2lhbmx1MDEiLCJhIjoiY2s1ejQ0a2gyMDY5NjNtcWp5cGF4Y21wMiJ9.S2-22wqQvv8B0aiya-Mh7A",
  minZoom: 11,
  maxZoom: 17
});
const layout = { "icon-image": "icon" }
const image = new Image(20, 20);
image.src = mIcon;
const images = ["icon", image];

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
        coordinates: [],
        proprietaLocale: [],
      },
      zoom: [11],
      autocomplete: [],
      geoLocation: [],
      valutations: [0],
      commentsAvaible: false
    }
  }

  search = (insegna) => {
    fetch("/search/name", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: insegna
      })
    }).then(response => {
      response.json().then((text) => {
       this.setState({
         valutations: text
       });
        return text;
      });
    });
  };

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

    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ geoLocation: [position.coords.longitude, position.coords.latitude] });
    });

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
    };

    const onDrawDelete = ({ feature }) => {
      this.setState({
        stato: false,
        popup: { status: false },
        markers: this.state.appoggio
      });
    }

    const onDrawUpdate = ({ features }) => {
      this.setState({
        stato: false,
        popup: { status: false },
        markers: this.state.appoggio
      })
      onDrawCreate({ features })
    }

    const markerClicked = (point) => {
      this.search(point.properties.insegna);
      this.setState({
        mapCenter: point.geometry.coordinates,
        zoom: [16],
        popup: {
          status: true,
          coordinates: point.geometry.coordinates,
          proprietaLocale: point.properties,
        }
      });
      document.getElementById('search').value = '';
    }

    const autocomplete = (e) => {
      var c = [];
      this.state.appoggio.features.map(itemPlace => {
        if (itemPlace.properties.insegna.toUpperCase().substring(0, e.target.value.length) == e.target.value.toUpperCase()) {
          c.push(itemPlace);
        }
      })
      if (e.target.value == '') {
        this.setState({ autocomplete: [] })
      } else {
        this.setState({
          autocomplete: c
        });
      }
    }

    const showModal = () => {
      this.setState({show: true, commentsAvaible: true});
    }

    const hideModal = () => {
      this.setState({showModal: false});
    }


    return (
      <div>

        <Map style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100%"
          }}
          center={this.state.mapCenter}
          zoom={this.state.zoom}>
          <Layer type="symbol" id="marker" layout={layout} images={images} >
            {this.state.stato && (
              this.state.markers.features.map(point => (
                <Feature style={{ cursor: 'pointer' }}
                  coordinates={point.geometry.coordinates}
                  onClick={() => { markerClicked(point) }}
                />
              )
              )
            )}
          </Layer>

          {/*geolocalizzazione

          <Layer type="symbol" id="marker" layout={layout} images={images} >
            <Feature style={{ cursor: 'pointer' }} coordinates={this.state.geoLocation}/>  
          </Layer> 

          */}

          <DrawControl
            onDrawCreate={onDrawCreate}
            onDrawDelete={onDrawDelete}
            onDrawUpdate={onDrawUpdate}
            controls={controls}
            ref={(drawControl) => { this.drawControl = drawControl; }}
          />
          {this.state.popup.status && (
            <Popup coordinates={this.state.popup.coordinates}>
              <div className="custom-popup">
                <div className="popup-title">{this.state.popup.proprietaLocale.insegna}</div>
                <div>{this.state.popup.proprietaLocale.DescrizioneVia}</div>
                <div>Civico: {this.state.popup.proprietaLocale.Civico}</div>
                <div>Tipo Locale: {this.state.popup.proprietaLocale.tipo_locale}
                    - {this.state.popup.proprietaLocale.tipo_struttura}</div>
                <div>Zona: {this.state.popup.proprietaLocale.MUNICIPIO}</div>
                <div className="button-wrapper">
                  <div className="custom-btn" onClick={showModal}> Visualizza Recensioni</div>
                  <div className="custom-btn" onClick={() => { this.setState({ popup: { status: false } }) }}> Chiudi</div>
                </div>
              </div>
              <ReviewModal 
                show={this.state.show} 
                onHide={()=>this.setState({show: false})} 
                router={this.props.router} 
                placeName={this.state.popup.proprietaLocale.insegna}
                comments={this.state.valutations}
                status={this.state.commentsAvaible}
                canComment={this.props.status}
                user={this.props.user}
                ></ReviewModal>
            </Popup>)}

          <div className="go-back-container">
            <div className="custom-btn" onClick={() => { this.props.router(""); }}>Torna indietro</div>
          </div>

          <div className="zoom-btn-container">
            <div className="custom-btn" onClick={() => {
              var a = this.state.zoom[0];
              if (a < 17) {
                a++;
                this.setState({ zoom: [a] });
                console.log(this.state.zoom[0]);
              } else {
                console.log("ZOOM MASSIMO RAGGIUNTO");
              }
            }}>+</div>
            <div className="custom-btn" onClick={() => {
              var a = this.state.zoom[0];
              if (a > 11) {
                a--;
                this.setState({ zoom: [a] });
                console.log(this.state.zoom[0]);
              } else {
                console.log("ZOOM MINIMO RAGGIUNTO");
              }
            }}>-</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div className="search-bar-container">
              <input className="search-bar" placeholder='Search Places' id="search" onChange={e => {
                autocomplete(e);
              }}></input>
              <div className="result-setz">
                {this.state.autocomplete.map(a => (
                  <div style={{ padding: '1px', cursor: 'pointer', backgroundColor: '#fff', borderBottom: '1px solid #d4d4d4' }} onClick={e => {
                    document.getElementById('search').value = a.properties.insegna;
                    this.setState({
                      mapCenter: a.geometry.coordinates,
                      autocomplete: [],
                      stato: true,
                      markers: {
                        type: "FeatureCollection",
                        features: [a]
                      }
                    })
                    markerClicked(a);
                  }}>{a.properties.insegna}</div>
                ))}
              </div>
            </div>
          </div>
        </Map>
      </div>
    );
  }
}
export default Maps;