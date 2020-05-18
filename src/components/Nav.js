import React, { useState } from 'react';
import logo from '../icons/logo.png';
import LoginModal from './LoginModal.js';
import WwuModal from './wwuModal.js';
import ContactsModal from './ContactsModal.js';
import CosaFacciamoModal from './CosaFacciamoModal.js';
import Header from './Header.js';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';

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
              <li><a className="nav-link" onClick={showCosaFacciamoModal}>Cosa facciamo</a></li>
              <li><a className="nav-link" onClick={showContactsModal}>Contatti</a></li>
              <li><a className="nav-link" onClick={showWWUModal}>Lavora con noi </a></li>
              <li><a className="nav-link btn-login" onClick={showLoginModal}>Login</a></li>
            </ul>

            <CosaFacciamoModal show={this.state.showCosaFacciamoModal} onHide={()=>this.setState({showCosaFacciamoModal: false})} ></CosaFacciamoModal>
            <ContactsModal show={this.state.showContactsModal} onHide={()=>this.setState({showContactsModal: false})} ></ContactsModal>
            <WwuModal show={this.state.showWWUModal} onHide={()=>this.setState({showWWUModal: false})} contatti={showContactsModal}></WwuModal>
            <LoginModal show={this.state.showLoginModal} onHide={()=>this.setState({showLoginModal: false})} router={this.props.router} ></LoginModal>

          </div>
        </nav >
      {/*
        <Modal show={this.state.show} onHide={hideModal}>
          <ModalHeader closeButton>
            <ModalTitle>
              Login Modal
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p> Prova Modal </p>
          </ModalBody>
        </Modal> 
        
        */}
      </div>
      );
  }
  }

export default Nav;
