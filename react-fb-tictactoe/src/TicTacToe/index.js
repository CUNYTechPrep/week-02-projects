import React, { Component } from 'react';
import './TicTacToe.css'
import AI from './AI.js'


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
      {typeof props.value == 'number'? null : props.value }
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
		var i=0;
    	this.state = {
      		history: [
 			{
        		squares: Array.from(Array(10).keys())
        		//squares: Array(9).fill(null)
        	}
      		],
      		stepNumber: 0,
      		xIsNext: true,
	  		AIswitch: false,
			ai: null,
    	};
		this.handleAIChange = this.handleAIChange.bind(this);
  	}

  	handleClick(i) {
    	const history = this.state.history.slice(0, this.state.stepNumber + 1);
    	const current = history[history.length - 1];
    	const squares = current.squares.slice();
    	if (calculateWinner(squares) || typeof squares[i] != 'number') {return;}
		if(this.state.ai != null){
			squares[i] = "X";
			var best = this.state.ai.findBestMove(squares);
			squares[best] = "O";
		}
		else{
    		squares[i] = this.state.xIsNext ? "X" : "O";
    	}
		this.setState({
      		history: history.concat([
        	{
        		squares: squares
        	}
      		]),
      		stepNumber: history.length,
      		xIsNext: !this.state.xIsNext,
    	});

  	}

	jumpTo(step) {
    	this.setState({
      		stepNumber: step,
      		xIsNext: (step % 2) === 0
    	});
  	}
 	
	handleAIChange() {
    	this.setState({
			AIswitch: !this.state.AIswitch,
		});
		this.state.ai = !this.state.AIswitch ? new AI() : null;
	}

  	render() {
    	const history = this.state.history;
    	const current = history[this.state.stepNumber];
    	const winner = calculateWinner(current.squares);
		const ai=1;
    	const moves = history.map((step, move) => {
      		const desc = move ? "Move #" + move : "Game start";
      		return (
        		<li key={move}>
          		<a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        		</li>
      		);
    	});

    	let status;
    	if (winner) {
      		status = "Winner: " + winner;
    	} else if(!this.state.AIswitch) {
      		status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    	}
			
    	return (
		<div>
			<div className="game">
			  <div className="game-board">
				<Board
				  squares={current.squares}
				  onClick={i => this.handleClick(i)}
				/>
			  </div>
			  <div className="game-info">
				<div className="AI">
					<h2> Turn On AI ? </h2>
					<br></br>
			 		<div className="switch-container">
					 	<label> 
						  	<input ref="switch" checked={this.state.AIswitch} onChange={ this.handleAIChange } className="switch" type="checkbox" />
						  <div>
							  <span><g className="icon icon-toolbar grid-view"></g></span>
							  <span><g className="icon icon-toolbar ticket-view"></g></span>
							  <div></div>
						  </div>
					  </label>
				</div>
		  </div>

				  <div className="game-info-text">
					  <div>{status}</div>
					   <ol>{moves}</ol>
				  </div>
			  </div>
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
      return squares[a];
    }
  }
  return null;
}

// ========================================

export default Game;
