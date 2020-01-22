import React from 'react';
import logo from '../icons/logo.png';


class Nav extends React.Component {

  constructor(props){
    super(props);

    /*Lo stato è un oggetto e
      permette di modificare lo stato delle
      variabili al suo interno potendo anche
      fornzare il re-render della pagina (this.setState())
    */
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
          <ul className="nav-items">
            <li><a className="nav-link" onClick={() => {

              //FUNZIONE COSA FACCIAMO, LINK A FONDO PAGINA

            }}>Cosa facciamo</a></li>

            <li><a className="nav-link" onClick={() => {

              //MODAL CONTATTI

            }}>Contatti</a></li>

            <li><a className="nav-link" onClick={() => {

              //MODAL LAVORA CON NOI

            }}>Lavora con noi </a></li>

            <li><a className="nav-link btn-login" onClick={()=> {

              //FUNZIONE DI LOGIN
              const modal = document.querySelector('.modal-wrapper');
              modal.classList.add('d-flex');

            }}>Login</a></li>
          </ul>
        </div>
      </nav >
    );
  }
}

export default Nav;
