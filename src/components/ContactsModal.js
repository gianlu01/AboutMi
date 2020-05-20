import React from 'react';
import Modal from 'react-bootstrap/Modal';

class ContatcsModal extends React.Component {

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
                Contatti
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
                    Se vuoi contattare gli sviluppatori per segnalarci un errore, richiedere una collaborazione o contribuire allo sviluppo del sito non esistare a contattarci.
                    Qua sotto trovi le email degli sviluppatori alle quali puoi scrivere:<br></br><br></br>
                    <ul>
                      <li>Michele Banfi <br></br><a href="mailto:banfi.michele@studenti.salesianisesto.it" >banfi.michele@studenti.salesianisesto.it</a></li>
                      <li>Gianluca Parpanesi <br></br><a href="mailto:parpanesi.gianluca@studenti.salesianisesto.it" >parpanesi.gianluca@studenti.salesianisesto.it</a></li>
                      <li>Ernesto Pastori <br></br><a href="mailto:pastori.ernesto@studenti.salesianisesto.it" >pastori.ernesto@studenti.salesianisesto.it</a></li>
                    </ul>
                </label>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    );
  }

}
export default ContatcsModal;
