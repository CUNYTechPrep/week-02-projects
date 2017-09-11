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
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),                     //Fill array of 9 with null, rep the 9 squares
      xIsNext: true,
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();         //copy the squares array
    if(calculateWinner(squares) || squares[i]) {        //Ignore click if someone has already won the game
      return ;
    }  
    squares[i] = this.state.xIsNext ? 'X' : 'O';        //set state depending on if it's X's turn or not 
    this.setState({
      squares: squares,                                 //set current state of the array of squares
      xIsNext: !this.state.xIsNext,                     //Flip the turn
    });                  
  }

  renderSquare(i) {
    return <Square 
              value={this.state.squares[i]}             //param: value of square
              onClick={() => this.handleClick(i)}/>;    //param: onClick's handler
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if(winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
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

class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* todo */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;

//Helper function to check if anyone has won the game
function calculateWinner(squares) {
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
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
