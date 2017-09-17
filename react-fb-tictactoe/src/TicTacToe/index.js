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

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let rows = [];
    for(let i = 0; i < 3; i++) {
      let columns = [];
      for(let j = 0; j < 3; j++) {
        columns.push(this.renderSquare(i * 3 + j))
      }
      rows.push(<div className="board-row">{columns}</div>)
    }
    return (<div>{rows}</div>);
  }
}


class Game extends Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        index: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      reversedOrder: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        index: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  handleSort() {
    this.setState({
      reversedOrder: !this.state.reversedOrder,
    })
  }


  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    

    const moves = history.map((step, move) => {
      const desc = move ?
        move + '. Move ' + getCoordinates(step.index) :
        'Game start';
      const currentMoveClass = step == current ? 'current-move' : null;
      return (
        <li key={move} className={currentMoveClass}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
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
          <ul>
            {this.state.reversedOrder ? moves.reverse() : moves}
          </ul>
          <button onClick={() => this.handleSort()}>Sort moves</button>
        </div>
      </div>
    );
  }
}

export default Game;


function getCoordinates(index) {
  let x = index % 3;
  let y = Math.floor(index / 3);
  return `(${x}, ${y})`;
}


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
