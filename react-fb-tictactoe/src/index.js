	import React from 'react';
	import ReactDOM from 'react-dom';
	import './index.css';
	import App from './App';
	import registerServiceWorker from './registerServiceWorker';

	ReactDOM.render(<App />, document.getElementById('root'));
	registerServiceWorker();

	/*class Square extends React.Component {

	render() {
	return (
	<button className="square" onClick={() => this.props.onClick()}>
	{this.props.value}
	</button>
	);
	}
	}*/
function Square(props){
	return(
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
	onClick={ () => this.props.onClick(i)}
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
	constructor(){
			super();
			this.state={
				history:[{
					squares:Array(9).fill(null),
				}],
				stepNumber:0,
				xIsNext:true,
				locationX:0,
				locationY:0,
				counter:0,
			};
		}
jumpTo(step){
			this.setState({
				stepNumber:step,
				xIsNext: (step %2) === 0,
			})
		}
handleClick(i) {
		const history=this.state.history.slice(0,this.state.stepNumber+1);
		const current= history[history.length-1]; 
		const squares=current.squares.slice();

	if(calculateWinner(squares)|| squares[i]){ 
	return;
	}
	squares[i]=this.state.xIsNext ? 'X' :'O';
	this.setState({
	history:history.concat([{  /*concat?*/
		squares: squares,
	}]),
	stepNumber: history.length,
	xIsNext: !this.state.xIsNext,
	});
     /*let newPlace=null;
  for (let key in squares) {
 	//console.log(key);
  //  console.log(squares[key]);
    if (squares[key]=="X" || squares[key] == "O") 
    {
       newPlace=key;
      console.log("the place with a new entry is " + newPlace);
      
      return;
  	}
  	}*/
			/*while(squares[counter]!==squares[i]){
			if(locationX+1===4){
				locationX=0;
			}
			locationX=(locationX+1)%4;
			locationY=p/3+1;
			counter++;}*/
	};
render() {
		const history=this.state.history;
		const current= history[this.state.stepNumber];
		const winner= calculateWinner(current.squares);

const moves=history.map((step,move)=> {  /*map?*/ /*move is a unque id for each step*/
		const desc= move?
		'Move #' + move: /*+'located ('+ locationX +','+ locationY+')'*/
		'Game start';
		return (
		<li key={move}>  
		<a href="#" onClick={() => this.jumpTo(move)}> 
		{desc}
		</a>
		</li>
		);
	});

		let status;
		if(winner){
			status='Winner: ' + winner;
		}
		else{
			status='Next player: ' + (this.state.xIsNext ? 'X':'O');
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
	  <div>{ status }</div>
	  <ol>{moves}</ol>
	</div>
	</div>
	);
	}
	}
function calculateWinner(squares){
	const lines=[
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6],
	];
	for(let i=0;i<lines.length;i++){
		const [a,b,c]= lines[i];
	if(squares[a]=== squares[b] && squares[a] === squares[c])
	{
		return squares[a];
	}
	}
	return null;
	}

	// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
	);