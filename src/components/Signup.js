import React from 'react';
import Toast from 'react-bootstrap/Toast';

class Signup extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      component: "signup",
      nome: "",
      cognome: "",
      username: "",
      email: "",
      password: "",
      zona: "",
      successToast: false,
      errorToast: false
    };
  }

  register = (content, psw) => {
    const t = fetch("/register", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        nome: this.state.nome,
        cognome: this.state.cognome,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        zona: this.state.zona,
      })
    }).then(response => {
      response.text().then((text) => {
        if(text==='200'){
          this.setState({successToast: true})
        } else {
          this.setState({errorToast: true})
        }
        return text;
      });
    });
    return t;
  };

  render() {
    return (
        <main id="signup">
            <section className="signup-explain">
            <div className="container-title">
              <div className="custom-btn" onClick={() => {this.props.router("");}}>Torna indietro</div>
              <h1 className="title">Vantaggi che ricevi</h1>
            </div>
                <div className="container">
                    <div className="column"> 
                      <h3>Recensire</h3>    
                      <p>Grazie all'utilizzo di un account potrai recensire tutti i posti che visiterai dando la tua opinione agli altri utenti!</p>
                    </div>
                    <div className="column">
                      <h3>Valutare</h3>
                      <p>Valutando un locale darai la possibilità ad esso di migliorare ed essere scoperto da altre persone.</p>
                    </div>
                    <div className="column">
                      <h3>Contribuire</h3>
                      <p>Interagendo con il nostro sito darai la possibilità ai locali meneghini di migliorarsi creando l'ambiente perfetto per te e per gli altri.</p>
                    </div>
                </div>
              </section>
              <section className="signup-form">
              <div className="container">
                <p>Registarsi è semplice e gratuito, ti basta solo Nome, Cognome, Username e Email!</p>
                <input placeholder="Nome" onChange={e => {this.setState({nome: e.target.value})}}></input>
                <input placeholder="Cognome" onChange={e => {this.setState({cognome: e.target.value})}}></input>
                <input placeholder="Username" onChange={e => {this.setState({username: e.target.value})}}></input>
                <input placeholder="Email" onChange={e => {this.setState({email: e.target.value})}}></input>
                <input type="password" placeholder="Password" onChange={e => {this.setState({password: e.target.value})}}></input>
                <input placeholder="Zona di Milano" onChange={e => {this.setState({zona: e.target.value})}}></input>
                <div className="custom-btn" onClick={()=> this.register()}>Registrati</div>
              </div>
              </section>

              {this.state.successToast && 
                <Toast style={{
                  position: "absolute",
                  zIndex: "9999",
                  margin: "20px",
                  bottom: 0
                }}
                  onClose={() => this.setState({ successToast: false })} show={this.state.successToast} delay={30000} autohide
                >
                  <Toast.Header>
                    <strong className="mr-auto">Perfetto!</strong>
                  </Toast.Header>
                  <Toast.Body>Hai completato la registrazione, ora puoi tornare alla HomePage ed effettuare il Login!</Toast.Body>
                  <Toast.Body><div className="custom-btn" onClick={() => {this.props.router("");}}>Torna indietro</div></Toast.Body>
                </Toast>
              }

              {this.state.errorToast && 
                <Toast style={{
                  position: "absolute",
                  zIndex: "9999",
                  margin: "20px",
                  bottom: 0
                }}
                  onClose={() => this.setState({ errorToast: false })} show={this.state.errorToast} delay={10000} autohide
                >
                  <Toast.Header>
                    <strong className="mr-auto">Attenzione!</strong>
                  </Toast.Header>
                  <Toast.Body>Errore durante la registrazione. Esiste già un utente con questa <strong>email</strong> o con questo 
                  <strong> username</strong>!</Toast.Body>
                </Toast>
              }

        </main>
    );
  }
}

export default Signup;