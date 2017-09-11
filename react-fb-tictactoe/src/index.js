import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

class Square extends React.Component {
    render() {
      return (
        <button
          className="square"
          onClick={this.props.buttonClicked}
        >{this.props.value}</button>
      );
    }
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square 
          value={this.props.squares[i]}
          buttonClicked={() => this.props.buttonClicked(i)} 
        />
      );
    }
  
    render() {
      let squares = [];
      for (let i = 0; i < 3; i++) {
        let row = [];
        for (let j = 0; j < 3; j++) {
          row.push(this.renderSquare(i*3+j));
        }
        squares.push(<div className="board-row">{row}</div>);
      }
      return (
        <div>
          {squares}
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor() {
      super();
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        token: 'X',
        currTurn: 0,
        winner: null,
      };
    }
  
    onButtonClick(i) {
      const nextTurn = this.state.currTurn + 1;
      const history = this.state.history.slice(0, nextTurn);
      const squares = history[history.length-1].squares.slice();
  
      if (squares[i] || this.state.winner) {
        return; 
      }
  
      squares[i] = this.state.token;
  
      this.setState({
        history: history.concat(
          [{
            squares: squares,
          }]),
        token: ((nextTurn)%2 === 0) ? 'X' : 'O',
        winner: returnWinner(squares),
        currTurn: nextTurn,
      });
    }
  
    jumpToMove(move) {
      this.setState
      ({
        currTurn: move,
        token: (move%2 === 0) ? 'X' : 'O',
        winner: returnWinner(this.state.history[move].squares),
      })
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.currTurn];
      const moves = history.map((step, move) => {
        const desc = move ? "move #" + move : "Game Start";
        return (
          <li>
            <a href="#" onClick={() => this.jumpToMove(move)}>{desc}</a>
          </li>
        );
      })

      const status = (this.state.winner) ? 'Winner: ' + this.state.winner : 'Next player: ' + this.state.token;

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              buttonClicked={(i) => this.onButtonClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  function returnWinner(squares) {
    const winningSets = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2]
    ];
  
    for (let i = 0; i < winningSets.length; i++) {
      const row = winningSets[i];
      if (squares[row[0]] && squares[row[0]] === squares[row[1]] && squares[row[1]] === squares[row[2]]) {
        return squares[row[0]];
      }
    }
  
    return null;
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );