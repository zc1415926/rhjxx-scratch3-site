import React, { Component } from 'react';

//import Counter from './containers/Counter/Counter';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import MainGUI from './containers/MainGUI';
//import GradesClassesManager from './containers/GradeClassManager/GradeClassManager';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        {/* <Counter /> */}
        <MainGUI />
        {/* <GradesClassesManager /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
