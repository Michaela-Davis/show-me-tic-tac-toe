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
  if (typeof this.board[row - 1][col - 1] === "undefined") {
    this.board[row - 1][col - 1] = this.moveCount;
    this.moveCount++;
  }
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


  /////////////////////
 // Front End Section
/////////////////////

var gameBoard = new TicTacToeGame();
var nextPlay = "X";

function displayBoard(rowsCols) {
  for (var row = 1; row <= 3; row++) {
    for (var col = 1; col <= 3; col++) {
      $(".row" + row + ".col" + col).text(rowsCols[row][col]);
    }
  }
}


$(document).ready(function() {

  $(".square").click(function() {
    var row, col;
    for (var rowCol = 1; rowCol <= 3; rowCol++) {
      if ($(this).hasClass("row" + rowCol)) {
        row = rowCol;
      }
      if ($(this).hasClass("col" + rowCol)) {
        col = rowCol;
      }
    }

    gameBoard.recordMove(row, col);
    displayBoard(gameBoard.showBoard());

    // Did I win?

  });



}); // End document ready
