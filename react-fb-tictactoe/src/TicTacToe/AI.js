//https://codepen.io/abdolsa/pen/mABGoz?editors=1011
class AI {
	findBestMove(board) {
	var huPlayer = "X";
	var aiPlayer = "O";
	// keep track of function calls
	var fc = 0;
	// finding the ultimate play on the game that favors the computer
	var bestSpot = minimax(board, aiPlayer);
	console.log("index: " + bestSpot.index);
	console.log("function calls: " + fc);
	return bestSpot.index;

	function minimax(newBoard, player){
  		fc++;
  		var availSpots = emptyIndexies(newBoard);
  		// checks for the terminal states such as win, lose, and tie and returning a value accordingly
  		if (winning(newBoard, huPlayer)){
    		return {score:-10};
  		}
		else if (winning(newBoard, aiPlayer)){
    		return {score:10};
		}
  		else if (availSpots.length === 0){
  			return {score:0};
  		}
  		var moves = [];
  		// loop through available spots
  		for (var i = 0; i < availSpots.length; i++){
    		/* create an object for each and store the index 
		 	 * of that spot that was stored as a number in the object's index key
		 	*/
    		var move = {};
  			move.index = newBoard[availSpots[i]];
    		// set the empty spot to the current player
    		newBoard[availSpots[i]] = player;
    		//if collect the score resulted from calling minimax on the opponent of the current player
    		if(player == aiPlayer){
      			var result = minimax(newBoard, huPlayer);
      			move.score = result.score;
    		}else{
      			var result = minimax(newBoard, aiPlayer);
      			move.score = result.score;
    		}
    		//reset the spot to empty
    		newBoard[availSpots[i]] = move.index;
    		moves.push(move);
  		}
		// if it is the computer's turn loop over the moves and choose the move with the highest score
  		var bestMove = 9999;
  		if(player === aiPlayer){
    		var bestScore = -10000;
    		for(var i = 0; i < moves.length; i++){
      			if(moves[i].score > bestScore){
        			bestScore = moves[i].score;
        			bestMove = i;
      			}
    		}
  		}else{
			// else loop over the moves and choose the move with the lowest score
   			var bestScore = 10000;
    		for(var i = 0; i < moves.length; i++){
      			if(moves[i].score < bestScore){
        			bestScore = moves[i].score;
        			bestMove = i;
      			}
    		}
  		}
		// return the chosen move (object) from the array to the higher depth
  		return moves[bestMove];
		}
	}
}

function emptyIndexies(board){
  return  board.filter(s => s != "O" && s != "X");
}

function winning(board, player){
 if (
        (board[0] === player && board[1] === player && board[2] === player) ||
        (board[3] === player && board[4] === player && board[5] === player) ||
        (board[6] === player && board[7] === player && board[8] === player) ||
        (board[0] === player && board[3] === player && board[6] === player) ||
        (board[1] === player && board[4] === player && board[7] === player) ||
        (board[2] === player && board[5] === player && board[8] === player) ||
        (board[0] === player && board[4] === player && board[8] === player) ||
        (board[2] === player && board[4] === player && board[6] === player)
        ) {
        return true;
    } else {
        return false;
    }
}

export default AI;
