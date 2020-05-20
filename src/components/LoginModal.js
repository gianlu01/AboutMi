import React from 'react';
import Modal from 'react-bootstrap/Modal';

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
        if (text === "200"){
          document.getElementById("login-error").innerHTML = "Login Effettuato con successo!"
          this.props.login(true, content);
          this.props.router("maps");
        }else{
          document.getElementById("login-error").innerHTML = "Controlla il tuo username o la tua password quindi, riprova."
        }
        return text;
      });
    });
    return t;
  };


  render() {
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
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div style={{
              minWidth: '350px'
            }}>
              <div style={{
                display: 'block',
                maxWidth: '350px'
                }}>
                <label style={{
                  display: 'block',
                  margin: '0 0 .5rem 0',
                  color: '#777',
                  fontSize: '1.1rem',
                  fontWeight: '400'
                }}>Nome utente: </label>
                <input style={{
                  width: '100%',
                  margin: '0 0 1.5rem 0',
                  padding: '15px',
                  border: 'none',
                  borderRadius: '8px',
                  outline: 'none',
                  caretColor: '#004ffc',
                  background: '#f1f1f1',
                  fontSize: '.9rem'
                  }} placeholder="Scrivi il tuo nome utente" onChange={e=>this.setState({username: e.target.value})}></input>
              </div>
              <div style={{
                display: 'block',
                maxWidth: '350px'
                }}>
                <label style={{
                  display: 'block',
                  margin: '0 0 .5rem 0',
                  color: '#777',
                  fontSize: '1.1rem',
                  fontWeight: '400'
                }}>Password: </label>
                <input style={{
                  width: '100%',
                  margin: '0 0 1.5rem 0',
                  padding: '15px',
                  border: 'none',
                  borderRadius: '8px',
                  outline: 'none',
                  caretColor: '#004ffc',
                  background: '#f1f1f1',
                  fontSize: '.9rem'
                  }} placeholder="Scrivi qui la tua password" type="password" onChange={e=>this.setState({password: e.target.value})}></input>
              </div>
            </div>
            <div style={{
              width: '100%',
              height: '100%',
              padding: '0 50px 0 50px'
            }}>
              <p id="login-error" style={{fontWeight: '900', color: '#777'}}>
                Compila i seguenti campi per accedere al sito e poter commentare. 
                Effettuando il Login accederai direttamente alla mappa!</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="custom-btn" onClick={()=>{
            this.login(this.state.username, this.state.password);
          }}>Accedi</div>
          <div className="custom-btn" onClick={()=>{
            this.props.router("signup");
          }}>Registrati</div>
        </Modal.Footer>
      </Modal>

    );
  }

}
export default LoginModal;
