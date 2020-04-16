import React from 'react';
import logo from '../icons/logo.png';
import Header from './Header.js';

class Signup extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      component: "signup"
    };
  }
  render() {
    return (
        <main>
            <section>
                <div className="container">
                <span className="brand">Vantaggi che ricevi</span>
                    <div className="column">  
                        <h3>Recensire</h3>
                    </div>
                    <div className="column">
                        <h3>Commentare</h3>
                    </div>
                    <div className="column">
                        <h3>Valutare</h3>
                    </div>
                    <div className="column">
                        <h3>Contribuire</h3>
                    </div>
                </div>
            </section>
            <section>

            </section>
        </main>
    );
  }
}

export default Signup;