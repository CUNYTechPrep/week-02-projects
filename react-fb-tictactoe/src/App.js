import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TicTacToe from './TicTacToe'

/* Changes from original tutorial
 *  - Here we import the tic-tac-toe game from a module
 *    so we import the folder, and use the name
 *    TicTacToe instead of the generic Game
 *    (actually we can use any name we like
 *     such as import Foo from './TicTacToe')
 */

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
          <TicTacToe />
        </div>
      </div>
    );
  }
}

export default App;
