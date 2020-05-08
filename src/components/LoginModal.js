import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class LoginModal extends React.Component {

  constructor(props){
    super(props);
  }

  /*login = (rotta: string, content: string) => {
    const t = fetch(/login, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: content
      })
    }).then(response => {
      response.text().then((text: string) => {
        console.log(text);
        return text;
      });
    });
    return t;
  };


  <div className="modal-wrapper">
          <div className="modal">
            <label>Nome utente: </label>
            <input placeholder="Scrivi il tuo nome utente"></input>
            <label>Password: </label>
            <input placeholder="Scrivi qui la tua password"></input>
              <div className="btn-wrapper">
                <div className="btn">Accedi</div>
                <div className="btn-text">Registrati</div>
              </div>
          </div>
        </div>

*/
  render() {
    console.log('render')
    return ( 
      
        <Modal
        {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Centered Modal</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
       
    );
  }

}
export default LoginModal;
