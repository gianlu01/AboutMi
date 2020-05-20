import React from 'react';
import Main from './components/Main.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/css/main.min.css';


class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      newVisitor:true

    };
  }



  render() {
    return (
     <Main />
    );
  }
}

export default App;
