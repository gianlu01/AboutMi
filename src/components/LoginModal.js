  import React from 'react';

class LoginModal extends React.Component {

  /*login = (rotta: string, content: string) => {
    const t = fetch(/login, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: content
      })
    }).then(response => {
      response.text().then((text: string) => {
        console.log(text);
        return text;
      });
    });
    return t;
  };
*/
  render() {
    return (
        <div className="modal-wrapper">
          <div className="modal">
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
