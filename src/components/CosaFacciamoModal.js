import React from 'react';
import Modal from 'react-bootstrap/Modal';

class CosaFacciamoModal extends React.Component {

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
                    Cosa Facciamo
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
                    Siamo tre ragazzi di 18 anni che per progetto di fine anno hanno deciso di sviluppare un sito che permetta la ricerca di locali nella metropoli 
                    meneghina aiutando i cittadini Milanesi, ma non solo, nella ricerca di essi. Le tecnolgie utilizzate in questo sito sono: <br></br>
                    <ul>
                        <li>Node JS</li>
                        <li>React JS</li>
                        <li>SCSS</li>
                        <li>Mongo DB Compass</li>
                        <li>Amazon AWS</li>
                    </ul>
                    Grazie all'utilizzo di esse siamo riusciti a sviluppare questo sito per poterlo esporre al nostro orale di maturità. Inoltre grazie ad esso speriamo 
                    di poter aiutare tanti cittandini Milanesi, tanti giovani e magari anche tanti turisti in cerca di buon cibo, drink e divertimento!
                </label>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    );
  }

}
export default CosaFacciamoModal;
