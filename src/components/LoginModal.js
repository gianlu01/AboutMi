import React from 'react';

class LoginModal extends React.Component {

    render() {

        var uscita = document.getElementsByClassName("close")[0];

        uscita.onclick = function(){
            modal.style.display="none";
        }

        function EventoUscita(){
            modal.style.display="none";
        }

    //Aggiunta span per uscire dal Modal
    return (
        <div className="modal-wrapper">
          <div onmousedown="EventoUscita()" className="modal">
          <span class="close">&times</span> 
            <label>Nome utente: </label>
            <input placeholder="Scrivi il tuo nome utente"></input>
            <label>Password: </label>
            <input placeholder="Scrivi qui la tua password"></input>
              <div className="btn-wrapper">
                <div className="btn">Accedi</div>
                <div className="btn-text">Registrati</div>
              </div>
          </div>
        </div>
    );
  }

}
export default LoginModal;
