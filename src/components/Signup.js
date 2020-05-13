import React from 'react';

class Signup extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      component: "signup"
    };
  }

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
                      <p>Interagendo con il nostro sito darai la possibilità ai locali meneghini di milgiorarsi creando l'ambiente perfetto per te e per gli altri.</p>
                    </div>
                </div>
              </section>
              <section className="signup-form">
              <div className="container">
                <p>Registarsi è semplice e gratuito, ti basta solo Nome, Cognome e Email!</p>
                <input placeholder="Nome"></input>
                <input placeholder="Cognome"></input>
                <input placeholder="Email"></input>
                <input placeholder="Password"></input>
                <input placeholder="Zona di Milano"></input>
                <div className="custom-btn">Registrati</div>
              </div>
              </section>
        </main>
    );
  }
}

export default Signup;