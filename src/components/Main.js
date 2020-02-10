import React from 'react';
import HomePage from './HomePage.js';
import Header from './Header.js';
import Maps from './Maps.js';


class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          components: "main"
        }
      }
      router = (route) => {
        this.setState({components: route});
      }

    render() {
      const hompage = <HomePage router={this.router} />;
      const header = <Header router={this.router}/>;
      const maps = <Maps router={this.router}/>;

      switch (this.state.components){
        case "main":
          return(<React.Fragment>{header}{hompage}</React.Fragment>);
          break;
        case "maps":
          return(<React.Fragment>{maps}</React.Fragment>);
          break;
      }

    }
}


export default Main;
