import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class wwwuModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
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
                    color:'#777'
                }}>
                Lavora con Noi
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
                maxWidth: '100%'
                }}>
                <label style={{
                  display: 'block',
                  margin: '0 0 .5rem 0',
                  color: '#777',
                  fontSize: '1.1rem',
                  fontWeight: '400'
                }}>
                    Lavorare con noi significa poter collaborare allo sviluppo del sito in modo da perfezionarlo sempre di più offrendo inoltre un'esperienza 
                    migliore a tutti gli utenti ma soprattutto ai cittadini Milanesi.
                </label>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="custom-btn" onClick={this.props.contatti}>Contattaci</div>
        </Modal.Footer>
      </Modal>

    );
  }

}
export default wwwuModal;
