import React from 'react';
import HomePage from './HomePage.js';
import Header from './Header.js';
import Maps from './Maps.js';
import Signup from './Signup.js';


class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      components: "main",
      logged: false,
      user: ""
    }
  }

  /*
        componentWillMount (){
          document.addEventListener('mousedown', ,false);
        }
  
        componentWillUnmount (){
          document.removeEventListener('mousedown', , false);
        }
  
        handleOutsideClick = e =>{
          if(this.node.container(e.target))
        }
  
  */

  //Cambia lo stato daglia altri componenti
  router = (route) => {
    this.setState({ components: route });
  }

  login = (status, user) => {
    this.setState({ logged: status, user: user });
  }

  render() {
    const hompage = <HomePage router={this.router} />;
    const header = <Header router={this.router} login={this.login} />;
    const maps = <Maps router={this.router} status={this.state.logged} user={this.state.user} />;
    const signup = <Signup router={this.router} />;


    switch (this.state.components) {
      case "main":
        return (<React.Fragment>{header}{hompage}</React.Fragment>);
      case "maps":
        return (<React.Fragment>{maps}</React.Fragment>);
      case "signup":
        return (<React.Fragment>{signup}</React.Fragment>);
      default:
        return (<React.Fragment>{header}{hompage}</React.Fragment>);
    }

  }
}


export default Main;
