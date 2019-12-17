import React from 'react';
import Header from './components/Header.js';
import './main.css';


class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      newVisitor:true
      
    };
  }

  

  render() {
    return (
     <Header />
    );
  }
}

export default App;
