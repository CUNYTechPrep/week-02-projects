/*jshint esversion: 6*/

import React, { Component } from 'react';
import './TicTacToe.css'

class Square extends Component {
  render() {
    return (
      <button className='square' style={this.props.style} onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends Component {

  renderSquare(i) {
    let style;
    if (this.props.winMvs)
      this.props.winMvs.includes(i)? style={'color':'blue'} : style={};
    return <Square
              style={style}
              value={this.props.squares[i]}
              onClick={() => this.props.onClick(i)}/>;
            }

  render() {
    let board = [];
    for (var i = 0; i < 3; i++) {
        let row = [];
        for (var j = 0; j < 3; j++)
          row.push(this.renderSquare(3*i+j))

        board.push(
          <div className="board-row">
            {row}
          </div>
        );
    }
    return (<div>{board}</div>);
  }
}


class Game extends Component {

  constructor(){
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext : true,
      numOfMoves: 0,
      stepNumber: 0,
    };
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (squares[i] || calculateWinner(squares) )
      return;

    this.state.xIsNext? squares[i] = 'X' : squares[i] = 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext : !this.state.xIsNext,
      stepNumber: history.length,
    });
  }


  jumpTo(step){
    this.setState({
      stepNumber : step,
      xIsNext : (step % 2 === 0),
    });
  }

  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    let status = 'Next player: ' + (this.state.xIsNext? 'X': 'O');
    let winner = calculateWinner(current.squares);
    if (winner){
      var winningMoves = calculateWinner(current.squares)[1];
      console.log(winningMoves);
      winner = calculateWinner(current.squares)[0]
      status = 'Winner is: ' + winner;
    }
    else if (this.state.stepNumber === 9 )
      status = 'Game Over';

      const moves = history.map( (step, move) => {
      const desc = move ?
         'Move #' + move :
         'Game start';

        // Highlight current move
        let style = {};
        if (move === this.state.stepNumber)
          style = {'fontWeight': 'bold'};

       return (
         <li style={style} key={move}>
           <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
         </li>
       );
     });


    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
            onClick={(i) => this.handleClick(i)} winMvs={winningMoves} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>
            {moves}
          </ol>
        </div>
      </div>
    );
  }
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
      return [squares[a], [a,b,c]];
    }
  }
  return null;
}

export default Game;
