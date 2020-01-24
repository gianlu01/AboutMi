import React from 'react';
import HomePage from './HomePage.js';
import Header from './Header.js';


class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          components: "main"
        }
      }



    render() {

      const hompage = <HomePage />;
      const header = <Header />;

      switch (this.state.components){
        case "main":
          return(<React.Fragment>{hompage}{header }</React.Fragment>);
          break;
      }

    }
}


export default Main;
