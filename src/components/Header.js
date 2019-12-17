import React from 'react';
import Nav from './Nav.js';

class Header extends React.Component {

  render() {
    return (
      <header>
        <Nav />
        <div className="cover">
          <div className="container">
            <div className="flex-wrapper">
              <div className="text-wrapper">
                <span className="brand">ABOUTMI</span>
                <h1>Esplora Milano tra Bar, Pub, Ristoranti e Discoteche.</h1>
                <div className="btn">Visita il sito</div>
              </div>
              <div className="card-wrapper">
                <div className="card">
                  <p>Scopri gli eventi più adatti a te nella tua zona!</p>
                  <div className="btn" onClick={() => {

                    //Link alla pagine della mappa

                  }}>Vedi mappa</div>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-wrapper">
            <div className="scroll-btn">
              <div className="line-wrapper">
                <spna className="line"></spna>
              </div>
              <span>Scroll</span>
              <span>down</span>
            </div>
          </div>
        </div>
      </header>
    );
  }

}
export default Header;
