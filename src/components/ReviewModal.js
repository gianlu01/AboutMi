import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Toast from 'react-bootstrap/Toast';

class ReviewModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      commento: "",
      valutazione: 0,
      toastNotification: false
    }
  }

  addValutation = () => {
    console.log("starred")
    const t = fetch("/add/valutation", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        nomelocale: this.props.placename,
        commento: this.state.commento,
        valutazione: this.state.valutazione,
        utente: this.props.user
      })
    }).then(response => {
      response.text().then((text) => {
        if (text === "200"){
          alert("Commento pubblicato con successo");
          console.log("toast")
          this.setState({toastNotification: true})
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
                      <Card>
                        <Card.Header as="h5">{body.utente}</Card.Header>
                        <Card.Body>
                          <Card.Title>{body.valutazione}</Card.Title>
                          <Card.Text>
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
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    color: '#777',
                    paddingBottom: '20px'
                  }}>QUA VA INSERITA LA VALUTAZIONE (0-10)</div>
                  <label style={{
                    display: 'block',
                    margin: '0 0 .5rem 0',
                    color: '#777',
                    fontSize: '1.1rem',
                    fontWeight: '400'
                  }}>Scrivi la tua recensione: </label>
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
                    fontSize: '.9rem'
                  }} placeholder="Scrivi qui la tua recensione" onChange={e => this.setState({ commento: e.target.value })}></textarea>
                  <div className="custom-btn" onClick={() => this.addValutation()}>Pubblica Recensione</div>
                </div>
              </div>
            </div>
          </Modal.Body>}
          { !this.props.canComment &&
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
            <div className="custom-btn" onClick={() => { this.props.router("");}}>Accedi o Registrati</div>
          </Modal.Footer>}
        </Modal>
        </div>  
    );
  }

}
export default ReviewModal;
