import React, { useState } from 'react';
import logo from '../icons/logo.png';
import Modal from './LoginModal.js';
import Header from './Header.js';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        components: "main",
        show: false
    }
  }


  render() {

    const showModal = () => {
      this.setState({show: true});
    }

    const hideModal = () => {
      this.setState({showModal: false});
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
              <li><a className="nav-link" onClick={() => {}}>Cosa facciamo</a></li>
              <li><a className="nav-link" onClick={() => {}}>Contatti</a></li>
              <li><a className="nav-link" onClick={()=>{}}>Lavora con noi </a></li>
              <li><a className="nav-link btn-login" onClick={showModal}>Login</a></li>
            </ul>
            <Modal show={this.state.show} onHide={()=>this.setState({show: false})} router={this.props.router} ></Modal>
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
