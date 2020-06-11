import React from 'react';
import logo from '../icons/logo.png';
import LoginModal from './LoginModal.js';
import WwuModal from './wwuModal.js';
import ContactsModal from './ContactsModal.js';
import CosaFacciamoModal from './CosaFacciamoModal.js';

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        components: "main",
        showLoginModal: false,
        showWWUModal: false,
        showContactsModal: false,
        showCosaFacciamoModal: false
    }
  }


  render() {

    const showLoginModal = () => {
      this.setState({showLoginModal: true});
    }

    const showWWUModal = () => {
      this.setState({showWWUModal: true});
    }

    const showContactsModal = () => {
      this.setState({showContactsModal: true});
    }

    const showCosaFacciamoModal = () => {
      this.setState({showCosaFacciamoModal: true});
    }

    return(
      <div>
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
              <li><a className="nav-link" onClick={showCosaFacciamoModal} href="#1">Cosa facciamo</a></li>
              <li><a className="nav-link" onClick={showContactsModal} href="#2">Contatti</a></li>
              <li><a className="nav-link" onClick={showWWUModal} href="#3">Lavora con noi </a></li>
              <li><a className="nav-link btn-login" onClick={showLoginModal} href="#4">Login</a></li>
            </ul>

            <CosaFacciamoModal show={this.state.showCosaFacciamoModal} onHide={()=>this.setState({showCosaFacciamoModal: false})} ></CosaFacciamoModal>
            <ContactsModal show={this.state.showContactsModal} onHide={()=>this.setState({showContactsModal: false})} ></ContactsModal>
            <WwuModal show={this.state.showWWUModal} onHide={()=>this.setState({showWWUModal: false})} contatti={showContactsModal}></WwuModal>
            <LoginModal show={this.state.showLoginModal} onHide={()=>this.setState({showLoginModal: false})} router={this.props.router} login={this.props.login} user={this.props.user}></LoginModal>

          </div>
        </nav >
      </div>
      );
  }
  }

export default Nav;
