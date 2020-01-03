import React, { Component } from 'react';

//import Counter from './containers/Counter/Counter';
import './App.css';
import GradesClassesManager from './containers/GradeClassManager/GradeClassManager';

class App extends Component {
  render() {
    return (
      <div className="App">
       {/* <Counter /> */}
       <GradesClassesManager />
      </div>
    );
  }
}

export default App;
