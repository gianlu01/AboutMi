import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import StarRatings from 'react-star-ratings';


const starIcon = "m61 61v-24c0-.066-.007-.131-.02-.196l-1.98-9.903v-5.901h-2v5.901l-1.98 9.902c-.013.066-.02.131-.02.197v3.074l-4-5.167v-10.907h2v-2h-2v-5c0-.066-.007-.131-.02-.196l-1.98-9.903v-5.901h-2v5.901l-1.98 9.902c-.013.066-.02.131-.02.197v5h-2v-5c0-.066-.007-.131-.02-.196l-1.98-9.903v-5.901h-2v5.901l-1.98 9.902c-.003.013-.002.027-.004.041l-4.224-5.457c-.379-.489-1.203-.489-1.582 0l-4.224 5.457c-.002-.013-.001-.027-.004-.041l-1.982-9.902v-5.901h-2v5.901l-1.98 9.902c-.013.066-.02.131-.02.197v5h-2v-5c0-.066-.007-.131-.02-.196l-1.98-9.903v-5.901h-2v5.901l-1.98 9.902c-.013.066-.02.131-.02.197v5h-2v2h2v10.908l-4 5.167v-3.075c0-.066-.007-.131-.02-.196l-1.98-9.903v-5.901h-2v5.901l-1.98 9.902c-.013.066-.02.131-.02.197v24h-2v2h3 4 6 4 4 4 12 4 4 4 6 4 3v-2zm-2-8h-2v-9h2zm-2 2h2v2h-2zm1-22.901 1 5v4.901h-2v-4.901zm-3 11.243v17.658h-4v-22.824zm-14 9.658h-2v-29h2zm-2 2h2v2h-2zm4-27.158 2 2.583v30.575h-2zm4 27.158h2v2h-2zm2-2h-2v-29h2zm-2-35.901 1-5 1 5v4.901h-2zm-2 6.901v3.158l-2-2.583v-.575zm-5-11.901 1 5v4.901h-2v-4.901zm-8 1.534 5 6.459v1.908h-2v2h2v37h-2v-11c0-1.654-1.346-3-3-3s-3 1.346-3 3v11h-2v-37h2v-2h-2v-1.908zm1 47.367h-2v-11c0-.551.448-1 1-1s1 .449 1 1zm-18-6h2v2h-2zm4-24.574 2-2.583v33.157h-2zm6 22.574h-2v-29h2zm-2 2h2v2h-2zm0-37.901 1-5 1 5v4.901h-2zm-2 6.901v.574l-2 2.583v-3.157zm-6-6.901 1-5 1 5v4.901h-2zm2 6.901v29h-2v-29zm-4 14.176v22.824h-4v-17.658zm-6 14.824h-2v-9h2zm0 2v2h-2v-2zm-1-22.901 1 5v4.901h-2v-4.901zm-1 28.901v-2h2v2zm10 0v-2h2v2zm8 0v-2h2v2zm16 0v-2h2v2zm8 0v-2h2v2zm10 0v-2h2v2z";

class ReviewModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      commento: "",
      valutazione: 0,
      toastNotification: false,
      rating: 0
    }
  }


  changeRating = (newRating) => {
    this.setState({
      rating: newRating
    });
  }

  addValutation = () => {
    console.log("starred")
    this.props.showReviewToast(true);
    const t = fetch("/add/valutation", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        nomelocale: this.props.placename,
        commento: this.state.commento,
        valutazione: this.state.rating,
        utente: this.props.user
      })
    }).then(response => {
      response.text().then((text) => {
        if (text === "200") {
          alert("Commento pubblicato con successo");
          console.log("toast")
          this.setState({ toastNotification: true })
        }
        return text;
      });
    });
    return t;
  };

  render() {
    console.log(this.props)
    return (
      <div>
        {/*
          this.state.toastNotification && 
          <div style={{ position: 'absolute',minHeight: '100px', zIndex: '9999'}}>
            <Toast
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}>
              <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                <strong className="mr-auto">Bootstrap</strong>
                <small>just now</small>
              </Toast.Header>
              <Toast.Body>See? Just like this.</Toast.Body>
            </Toast>
          </div> */}
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
        >

          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter"
              style={{
                fontSize: '1.1rem',
                fontWeight: '900',
                color: '#777'
              }}>
              {this.props.placename}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{
              display: 'block',
              width: '100%'
            }}>
              <label style={{
                display: 'block',
                margin: '0 0 .5rem 0',
                color: '#777',
                fontSize: '1.1rem',
                fontWeight: '400',
                width: '100%'
              }}>Recensioni dei Clienti</label>
              <div className="review-container">
                {this.props.status && this.props.comments.comments.map((body, i) => (
                  <Card style={{
                    marginBottom:"10px"
                  }}>
                    <Card.Header as="h5">{body.utente}</Card.Header>
                    <Card.Body>
                      <StarRatings
                        rating={body.valutazione}
                        starDimension="35px"
                        starSpacing="15px"
                        svgIconPath= {starIcon}
                        svgIconViewBox="0 0 65 65"
                      />
                      <Card.Text
                        style={{
                          marginTop:"10px"
                        }}
                      >
                        {body.commento}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          </Modal.Body>
          {this.props.canComment && <Modal.Body>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              flexDirection: 'column'
            }}>
              <div style={{
              }}>
                <div style={{
                  display: 'block',
                  width: '100%'
                }}>
                  <label style={{
                    display: 'block',
                    margin: '20px 0 20px 0',
                    color: '#777',
                    fontSize: '1.1rem',
                    fontWeight: '400'
                  }}>Scrivi la tua recensione: </label>
                  <StarRatings
                    rating={this.state.rating}
                    starHoverColor="#004ffc"
                    starRatedColor="#1541ab"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name='rating'
                    svgIconPath= {starIcon}
                    svgIconViewBox="0 0 65 65"
                  />
                  <textarea style={{
                    width: '100%',
                    maxHeight: '250px',
                    minHeight: '50px',
                    margin: '0 0 1.5rem 0',
                    padding: '15px',
                    border: 'none',
                    borderRadius: '8px',
                    outline: 'none',
                    caretColor: '#004ffc',
                    background: '#f1f1f1',
                    fontSize: '.9rem',
                    marginTop: "20px"
                  }} placeholder="Scrivi qui la tua recensione" onChange={e => this.setState({ commento: e.target.value })}></textarea>
                  <div className="custom-btn" onClick={() => this.addValutation()}>Pubblica Recensione</div>
                </div>
              </div>
            </div>
          </Modal.Body>}
          {!this.props.canComment &&
            <Modal.Footer style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '100%',
                color: '#777',
                fontWeight: '900'
              }}>Per pubblicare una recesione devi prima possedere un account!</div>
              <div className="custom-btn" onClick={() => { this.props.router(""); }}>Accedi o Registrati</div>
            </Modal.Footer>}
        </Modal>
      </div>
    );
  }

}
export default ReviewModal;
