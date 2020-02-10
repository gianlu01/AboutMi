import React from 'react';
import logo from '../icons/logo.png';


class Nav extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showModal: false
    };
  }





  render() {
    return (
        <nav>
          <div className="nav-container">
            <div className="nav-logo">
              <img className="logo-img" src={logo} alt="Logo AboutMI" />
            </div>
            <ul className="nav-items">
              <li className="nav-link"><a>Cosa Facciamo</a></li>
              <li className="nav-link"><a>Contatti</a></li>
              <li className="nav-link"><a>Lavora con noi</a></li>
              <li className="nav-link"><a className="btn-login">Login</a></li>
            </ul>
          </div>
        </nav>
    );
  }
}

export default Nav;
