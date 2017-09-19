import React, { Component } from 'react';
import './TicTacToe.css'


/*
 * Changes from original tutorial
 *  - Here we import Component, so we can replace
 *    class Square extends React.Component
 *    with
 *    class Square extends Component
 */
class Square extends Component {
  render() {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }

}

class Board extends Component {
  renderSquare(i) {
    return <Square value={this.props.squareValues[i]} onClick={() => this.props.onClick(i)} index={i} />;
  }

  render() {
    const status = this.props.status;

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
  constructor(props) {
    super(props);
    this.state = {
      moveHistory: [['', '' ,'',
                    '', '', '',
                    '', '', '']],
      boardState: ['', '' ,'',
                    '', '', '',
                    '', '', ''],
      nextPlayer: 'X',
      status: 'Next Player: X'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    let moveList = this.state.moveHistory.map((move, moveIndex) => {
      let moveDescription;
      if(moveIndex === 0) {
        moveDescription = 'Game Start';
      }
      else {
        moveDescription = `Move #${moveIndex}`;
      }

      return (
        <li key={move}>
          <a href="#" onClick={() => this.goToPrev(moveIndex)}>{moveDescription}</a>
        </li>
        );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board onClick={i => this.handleClick(i)} squareValues={this.state.boardState} status={this.state.status} />
        </div>
        <div className="game-info">
          <ol>{moveList}</ol>
        </div>
      </div>
    );
  }

  handleClick(i) {
    if(this.state.boardState[i] !== '' || this.state.status.startsWith('W')) // Checks for illegal move or if game has been won
      return;

    let newBoardState = this.state.boardState.map((value, index) => {
      if(index === i) {
        value = this.state.nextPlayer;
      }
      return value;
    });

    let newMoveHistory = this.state.moveHistory.slice();
    newMoveHistory.push(newBoardState);    

    let newStatus = this.findWinner(newBoardState);

    this.setState({
      moveHistory: newMoveHistory,
      boardState: newBoardState,
      nextPlayer: this.state.nextPlayer === 'X' ? 'O' : 'X',
      status: newStatus
    });
  }

  goToPrev(moveIndex) {
    let oldMoveHistory = this.state.moveHistory.slice(0, moveIndex + 1);
    let oldBoardState = oldMoveHistory[moveIndex];
    let oldNextPlayer = moveIndex % 2 === 0 ? 'X' : 'O';
    let oldStatus = `Next Player: ${oldNextPlayer}`;

    this.setState({
      moveHistory: oldMoveHistory,
      boardState: oldBoardState,
      nextPlayer: oldNextPlayer,
      status: oldStatus
    });
  }

  findWinner(board) {
    let winningStates = [
      // Row Victories
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      //Column Victories
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      //Diagonal Victories
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]]
    ];

    for(let i = 0; i < winningStates.length; ++i) {
      if(winningStates[i][0] !== '' && winningStates[i][0] === winningStates[i][1] && winningStates[i][0] === winningStates[i][2]) {
        return `Winner: ${this.state.nextPlayer}`;
      }
    }
    return `Next Player: ${this.state.nextPlayer === 'X' ? 'O' : 'X'}`;
  }
}

export default Game;
