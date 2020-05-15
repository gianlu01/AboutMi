import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class LoginModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  login = (content, psw) => {
    const t = fetch("/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username: content,
        password: psw
      })
    }).then(response => {
      response.text().then((text) => {
        console.log(text);
        return text;
      });
    });
    return t;
  };

  /*
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
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"> Login </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="label-group">
            <label className="custom-label">Nome utente: </label>
            <input className="custom-input" placeholder="Scrivi il tuo nome utente" onChange={e=>this.setState({username: e.target.value})}></input>
          </div>
          <div>
            <label className="custom-label">Password: </label>
            <input className="custom-input" placeholder="Scrivi qui la tua password" onChange={e=>this.setState({password: e.target.value})}></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="custom-btn" onClick={()=>{
            this.login(this.state.username, this.state.password);
          }}>Accedi</div>
          <div className="custom-btn">Registrati</div>
          {/*<div className="custom-btn" onClick={this.props.onHide}>Torna indietro</div>*/}
        </Modal.Footer>
      </Modal>

    );
  }

}
export default LoginModal;
