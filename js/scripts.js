  ////////////////////
 // Back End Section
////////////////////
function TicTacToeGame() {
  this.boardRows = 3;
  this.boardCols = 3;
  this.moveCount = 0;
  this.board = [
    [],
    [],
    []
  ]
}

TicTacToeGame.prototype.showThinking = function() {

}

TicTacToeGame.prototype.recordMove = function(row, col) {
  this.board[row - 1][col - 1] = this.moveCount;
  this.moveCount++;
}

TicTacToeGame.prototype.showBoard = function() {
  var rowColInternal, rowColExternal, rowExternal, displayBoard = [];
  for (var row = 1; row <= this.boardRows; row++) {
    rowExternal = [];
    for (var col = 1; col <= this.boardCols; col++) {
      rowColInternal = this.board[row - 1][col - 1];
      if (typeof rowColInternal === "undefined") {
        rowColExternal = "";
      } else {
        if (rowColInternal % 2 === 0) {
          rowColExternal = "X";
        } else {
          rowColExternal = "O";
        }
      }
      rowExternal[col] = rowColExternal;
    } // End for j
    displayBoard[row] = rowExternal;
  } // End for i
  return displayBoard;
}


var testGame = new TicTacToeGame();
testGame.recordMove(1,1);
testGame.recordMove(2,2);
testGame.recordMove(3,3);
console.log(testGame.showBoard());

  /////////////////////
 // Front End Section
/////////////////////

$(document).ready(function() {


}); // End document ready
