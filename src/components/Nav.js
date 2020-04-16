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
            <img className="nav-image" src={logo} alt="Logo AboutMI" />
          </div>
          <div className="menu-icon">
            <span className="bar one"></span>
            <span className="bar two"></span>
            <span className="bar three"></span>
          </div>
          <ul className="nav-items">
            <li><a className="nav-link" onClick={() => {}}>Cosa facciamo</a></li>
            <li><a className="nav-link" onClick={() => {}}>Contatti</a></li>
            <li><a className="nav-link" onClick={() => {}}>Lavora con noi </a></li>
            <li><a className="nav-link btn-login" onClick={()=> {}}>Login</a></li>
          </ul>
        </div>
      </nav >
    );
  }
}

export default Nav;
