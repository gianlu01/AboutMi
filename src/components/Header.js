import React from 'react';
import Nav from './Nav.js';
import Maps from './Maps.js';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      components: "header"
    }
  }
  render() {

    const maps = (<Maps />);
    const header =

      (<header>

        <Nav />

        <div className="container">
          <div className="text-wrapper">
            <span className="brand">AbouMi</span>
            <h1 className="page-title">Esplora Milano tra bar, pub, ristoranti e discosteche.</h1>
            <div className="btn-primary">Visita il sito</div>
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

      </header>);

    switch (this.state.components) {
      case "header":
        return (header);
        break;
      case "maps":
        return (maps);
        break;
    }
  }

}
export default Header;
