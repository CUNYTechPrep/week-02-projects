import React, { Component } from 'react';
import './TicTacToe.css'


/*
 * Changes from original tutorial
 *  - Here we import Component, so we can replace
 *    class Square extends React.Component
 *    with
 *    class Square extends Component
 */
function Square(props) {
  // Note that onClick={props.onClick()} would not work because it would call 
  // props.onClick immediately instead of passing it down.
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
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
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // Return early and ignore the click if someone has already won the game 
    // or if a square is already filled.
    if(calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,  // determine which player's turn based on the step
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // Map through the history to create an array of <li>
    // map callback function has the following parameter (currentValue, index, array)
    // therefore, step is the each object (with squares property) in the history array,
    // and move is the array index of that object.
    const moves = history.map((step, move) => {
      const desc = move ? 'Move #' + move : 'Game Start';
      // Using array index as key silences the unique key warning, but it is not recommended.
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if(winner) {
      status = 'Winner: ' + winner;
    }
    else {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
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

function calculateWinner(squares) {
  // Each line represent a possible location to check for a winner.
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    // Destructuring assignment, equivalent to declaring variables a, b, and c, and then
    // assigning them values from lines[i]
    const [a, b, c] = lines[i];

    // First check if the leftmost value is a null or not, then compare it to the rest.
    // True if they're all the same, which means we have a winner.
    if ( squares[a] && (squares[a] === squares[b]) && (squares[a] === squares[c]) ) {
      return squares[a];   // return the value on the winning line, either X or O
    }
  }
  
  return null;
}

export default Game;
