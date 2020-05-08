import React, { useState } from 'react';
import logo from '../icons/logo.png';
import Header from './Header.js';
import Modal from 'react-bootstrap/Modal';
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
<<<<<<< HEAD
  render() {
    return (
      <nav>
        <div className="nav-container">
          <div className="nav-logo">
            <img className="nav-image" src={logo} alt="Logo AboutMI" />
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
=======


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
              <li><a className="nav-link" onClick={() => {this.props.router("signup");}}>Lavora con noi </a></li>
              <li><a className="nav-link btn-login" onClick={showModal}>Login</a></li>
            </ul>
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
>>>>>>> 7b53f23c207975598172962ecec41b540fa4977c
  }

export default Nav;
