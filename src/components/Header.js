import React from 'react';
import Nav from './Nav.js';
import LoginModal from './LoginModal.js';
import Maps from './Maps.js';

class Header extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      showMaps: false
    }
  }



  render() {

    const header = 
    
    (<header>
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
                <div className="btn" onClick = { () => {
                  this.setState({ showMaps: true});
                }}
                >Vedi mappa</div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-wrapper">
          <div className="scroll-btn">
            <div className="line-wrapper">
              <span className="line"></span>
            </div>
            <span>Scroll</span>
            <span>down</span>
          </div>
        </div>
      </div>
      <LoginModal />
    </header>);

    const maps = (<Maps />);

    return ( this.state.showMaps ? maps : header);
  }

}
export default Header;
