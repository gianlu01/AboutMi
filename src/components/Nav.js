import React from 'react';
import logo from '../icons/logo.png';


function Login(){
  alert("Schiacciato il login");
}

function Nav() {
  return (
    <nav>
        <div className="nav-container">
        <div className="nav-logo">
            <img className="nav-image" src={logo} alt="Logo AboutMI" />
        </div>
        <ul className="nav-items">
            <li><a href="" className="nav-link">Cosa facciamo</a></li>
            <li><a href="" className="nav-link">Contatti</a></li>
            <li><a href="" className="nav-link">Lavora con noi</a></li>
            <li><a href="" className="nav-link btn-login" onClick={Login()}>Login</a></li>
        </ul>
        </div>
    </nav>
  );
}

export default Nav;
