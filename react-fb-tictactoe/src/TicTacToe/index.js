import React, { Component } from 'react';
import './TicTacToe.css'

//Component Function
function Square(props) {
    let style = {color: 'black'};
    if (props.highlight === true) {
        style.color = 'red';
    }
    return (
        <button className="square" onClick={props.onClick} style={props.highlight ? style : null}>
            {props.value}
        </button>
    );
}

class Board extends Component {
    renderSquare(i) {
        let highlight = false;
        if (this.props.winLine !== undefined && this.props.winLine.includes(i))
        {
            highlight = true;
        }
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                highlight={highlight}
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

class Game extends Component {
  constructor() {
    super();
    this.state = {
        history: [
            {
            squares:Array(9).fill(null),
            }
        ],
        stepNumber: 0,
        xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares).winner!==null || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
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
    const {winner, winLine} = calculateWinner(current.squares);    // ES6 Destructuring 

    let status;
    if (winner) {
        console.log("There's a winner.")
        status = 'Winner: ' + winner;
    } else {
        console.log("No winner.")
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    //Moves List
    const moves = history.map((step, move) => {
        const desc = move ?
            'Move #' + move :
            'Game start';
        return (
            <li key={move}>
                <a href="#" onClick={ () => this.jumpTo(move) }>                {/* A JSX comment */}
                    { move === this.state.stepNumber ? <b>{desc}</b> : desc }    {/* Make the current move bold */}
                </a>
            </li>
        );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            winLine = {winLine}
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

export default Game;

function calculateWinner(squares) {
    //Combinations of winning moves
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
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) 
        {
            return {
                winner: squares[a],     // X or O char
                winLine: lines[i]       // Line to highlight
            }
        }
    }
    return {
        winner: null,     // X or O char
        winLine: undefined,
    }
}
