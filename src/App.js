import React from 'react';
import './App.css';
import Header from './components/Header'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  render(){
    return (
      <>
        <Header/>
        <ToyContainer />
      </>
    );
  }

}

export default App;
