import React from 'react';
import logo from '../icons/logo.png';
import Header from './Header.js';
import Modal from './LoginModal.js';

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        components: "main",
        showModal: true
    }
  }

  render() {


    console.log(this.props);

    const modal = <Modal />;
    const nav = 
    (<nav>
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
          <li><a className="nav-link" onClick={() => {this.props.router("signup");}}>Lavora con noi </a></li>
          <li><a className="nav-link btn-login" onClick={()=> {}}>Login</a></li>
        </ul>
      </div>
    </nav >
  )    

    switch (this.state.component) {
      case "nav":
        return (nav);
        break;
      case "modal":
        return(modal);
        break;
      default:
        return (nav);
    }

 
  }
  }

export default Nav;
