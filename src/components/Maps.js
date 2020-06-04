import React from "react";
import ReactMapboxGl, {
  Layer,
  Feature,
  Popup
} from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import * as turf from '@turf/turf';
import mIcon from '../icons/marker.svg';
import ReviewModal from './ReviewModal.js';
import StarRatings from 'react-star-ratings';
import Toast from 'react-bootstrap/Toast';
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
const starIcon = "m61 61v-24c0-.066-.007-.131-.02-.196l-1.98-9.903v-5.901h-2v5.901l-1.98 9.902c-.013.066-.02.131-.02.197v3.074l-4-5.167v-10.907h2v-2h-2v-5c0-.066-.007-.131-.02-.196l-1.98-9.903v-5.901h-2v5.901l-1.98 9.902c-.013.066-.02.131-.02.197v5h-2v-5c0-.066-.007-.131-.02-.196l-1.98-9.903v-5.901h-2v5.901l-1.98 9.902c-.003.013-.002.027-.004.041l-4.224-5.457c-.379-.489-1.203-.489-1.582 0l-4.224 5.457c-.002-.013-.001-.027-.004-.041l-1.982-9.902v-5.901h-2v5.901l-1.98 9.902c-.013.066-.02.131-.02.197v5h-2v-5c0-.066-.007-.131-.02-.196l-1.98-9.903v-5.901h-2v5.901l-1.98 9.902c-.013.066-.02.131-.02.197v5h-2v2h2v10.908l-4 5.167v-3.075c0-.066-.007-.131-.02-.196l-1.98-9.903v-5.901h-2v5.901l-1.98 9.902c-.013.066-.02.131-.02.197v24h-2v2h3 4 6 4 4 4 12 4 4 4 6 4 3v-2zm-2-8h-2v-9h2zm-2 2h2v2h-2zm1-22.901 1 5v4.901h-2v-4.901zm-3 11.243v17.658h-4v-22.824zm-14 9.658h-2v-29h2zm-2 2h2v2h-2zm4-27.158 2 2.583v30.575h-2zm4 27.158h2v2h-2zm2-2h-2v-29h2zm-2-35.901 1-5 1 5v4.901h-2zm-2 6.901v3.158l-2-2.583v-.575zm-5-11.901 1 5v4.901h-2v-4.901zm-8 1.534 5 6.459v1.908h-2v2h2v37h-2v-11c0-1.654-1.346-3-3-3s-3 1.346-3 3v11h-2v-37h2v-2h-2v-1.908zm1 47.367h-2v-11c0-.551.448-1 1-1s1 .449 1 1zm-18-6h2v2h-2zm4-24.574 2-2.583v33.157h-2zm6 22.574h-2v-29h2zm-2 2h2v2h-2zm0-37.901 1-5 1 5v4.901h-2zm-2 6.901v.574l-2 2.583v-3.157zm-6-6.901 1-5 1 5v4.901h-2zm2 6.901v29h-2v-29zm-4 14.176v22.824h-4v-17.658zm-6 14.824h-2v-9h2zm0 2v2h-2v-2zm-1-22.901 1 5v4.901h-2v-4.901zm-1 28.901v-2h2v2zm10 0v-2h2v2zm8 0v-2h2v2zm16 0v-2h2v2zm8 0v-2h2v2zm10 0v-2h2v2z";

class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stato: false,
      rating: 0,
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
      commentsAvaible: false,
      reviewToast: false,
      NoLocalToast: false
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
        if (text != null) {
          this.setState({
            valutations: text,
            commentsAvaible: true
          });
          this.avarage();
        } else {
          this.setState({
            commentsAvaible: false
          });
        }
        return text;
      });
    });
  };

  avarage = () => {
    var c = 0;
    this.state.valutations.comments.map(item => {
      c += item.valutazione;
    })
    this.setState({ rating: (c / this.state.valutations.comments.length) });
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
        if (c.features[u].geometry.coordinates.length === 0) c.features.splice(u, 1);
      }
      var result = turf.pointsWithinPolygon(c, this.drawControl.draw.getAll());
      if (result.features.length <= 0) {
        this.setState({NoLocalToast: true});
      } else {
        this.setState({
          stato: true,
          markers: result,
          NoLocalToast: false
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
        if (itemPlace.properties.insegna.toUpperCase().substring(0, e.target.value.length) === e.target.value.toUpperCase()) {
          c.push(itemPlace);
        }
      })
      if (e.target.value === '') {
        this.setState({ autocomplete: [] })
      } else {
        this.setState({
          autocomplete: c
        });
      }
    }

    const showModal = (value) => {
      this.setState({ show: value });
    }

    const ShowReviewToast = () => {
      this.setState({ reviewToast: true });
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
              this.state.markers.features.map((point, i) => (
                <Feature style={{ cursor: 'pointer' }}
                  coordinates={point.geometry.coordinates}
                  onClick={() => { markerClicked(point) }}
                  key={i}
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
                <StarRatings
                  rating={this.state.rating}
                  starDimension="35px"
                  starSpacing="5px"
                  svgIconPath={starIcon}
                  svgIconViewBox="0 0 65 65"
                />
                <div className="button-wrapper">
                  <div className="custom-btn" onClick={showModal}> Visualizza Recensioni</div>
                  <div className="custom-btn" onClick={() => { this.setState({ popup: { status: false } }) }}> Chiudi</div>
                </div>
              </div>
              <ReviewModal
                router={this.props.router}
                show={this.state.show}
                onHide={() => this.setState({ show: false })}
                router={this.props.router}
                placename={this.state.popup.proprietaLocale.insegna}
                comments={this.state.valutations}
                status={this.state.commentsAvaible}
                canComment={this.props.status}
                user={this.props.user}
                showReviewToast={ShowReviewToast}
              ></ReviewModal>
            </Popup>)}

          {this.state.reviewToast &&
            <Toast style={{
              position: "absolute",
              zIndex: "9999",
              margin: "20px",
              bottom: 0
            }}

              onClose={() => this.setState({ reviewToast: false })} show={this.state.reviewToast} delay={5000} autohide

            >
              <Toast.Header>
                <strong className="mr-auto">Perfetto</strong>
              </Toast.Header>
              <Toast.Body>Il tuo commento è stato pubblicato con successo! Grazie della recensione.</Toast.Body>
            </Toast>
          }

          {this.state.NoLocalToast &&
            <Toast style={{
              position: "absolute",
              zIndex: "9999",
              margin: "20px",
              bottom: 0
            }}
              onClose={() => this.setState({ NoLocalToast: false })} show={this.state.NoLocalToast} delay={5000} autohide
            >
              <Toast.Header>
                <strong className="mr-auto">Attenzione!</strong>
              </Toast.Header>
              <Toast.Body>Non siamo riusciti a trovare un locale nell'area da te selezionata!</Toast.Body>
            </Toast>
          }

          <div className="go-back-container">
            <div className="custom-btn" onClick={() => { this.props.router(""); }}>Torna indietro</div>
          </div>

          <div className="welcome-text-container">
            {!this.props.status && <div className="custom-btn" onClick={() => { this.props.router(""); }}>Accedi</div>}
            {this.props.status && <div className="welcome-text">Bentornato, {this.props.user}</div>}
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
              <input className="search-bar" autocomplete="off" placeholder='Search Places' id="search" onChange={e => {
                autocomplete(e);
              }}></input>
              <div className="result-set">
                {this.state.autocomplete.map((a, i) => (
                  <div key={i} style={{ 
                    padding: '1px', 
                    cursor: 'pointer', 
                    backgroundColor: '#fff', 
                    borderBottom: '1px solid #d4d4d4' }} onClick={
                      e => {
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