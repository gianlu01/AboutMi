import React from 'react';
import Modal from 'react-bootstrap/Modal';

class ReviewModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      commento: "",
      valutazione: 0
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
        }
        return text;
      });
    });
    return t;
  };

  render() {
    console.log(this.props)
    return (

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
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div style={{
              minWidth: '350px'
            }}>
              <div style={{
                display: 'block',
                maxWidth: '350%'
              }}>
                <label style={{
                  display: 'block',
                  margin: '0 0 .5rem 0',
                  color: '#777',
                  fontSize: '1.1rem',
                  fontWeight: '400'
                }}>Recensioni dei Clienti</label>
                <div style={{
                  width: '100%',
                  lineHeight: '3em',
                  overflow: 'auto',
                  padding: '5px',
                  maxHeight: '300px',
                }}>
                  {this.props.status && this.props.comments.comments.map((body, i) => (
                    <div key={i}>
                      <h1>{body.utente}</h1>
                      <p>{body.valutazione}</p>
                      <p>{body.commento}</p>
                    </div>
                  ))}
                </div>
              </div>
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
        <Modal.Footer>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            color: '#777'
          }}>Per pubblicare una recesione devi prima possedere un account!</div>
        </Modal.Footer>
      </Modal>

    );
  }

}
export default ReviewModal;
