import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import MainGUI from './components/MainGUI/MainGUI';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <MainGUI />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;