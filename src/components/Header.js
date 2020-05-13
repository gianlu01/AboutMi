import React from 'react';
import Nav from './Nav.js';
import LoginModal from './LoginModal.js';
import Maps from './Maps.js';
import Signup from './Signup.js';

class Header extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      components: "header"
    }
  }



  render() {

    const maps = (<Maps />);
    const header = (<header>
        <Nav router={this.props.router}/>
        <div className="cover">
          <div className="container">
            <div className="flex-wrapper">
              <div className="text-wrapper">
                <span className="brand">ABOUTMI</span>
                <h1 className="h1-title-dark">Esplora Milano tra Bar, Pub, Ristoranti e Discoteche.</h1>
                <div className="custom-btn">Visita il sito</div>
              </div>
              <div className="card-wrapper">
                <div className="card">
                  <p>Scopri gli eventi più adatti a te nella tua zona!</p>
                  <div className="custom-btn" onClick={() => {this.props.router("maps");}}>Vedi mappa</div>
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

    switch (this.state.components) {
      case "header":
        return(header);
        break;
      case "maps":
        return(maps);
        break;
      default:
        return(header);
        break;
    }
  }

}
export default Header;
