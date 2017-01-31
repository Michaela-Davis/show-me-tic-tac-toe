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


TicTacToeGame.prototype.lineCountSet = function (rowCols) {
  var resultSet = {}, counts = [0, 0, 0], thisCell, lastBlank = [];
  rowCols.forEach(function(rowCol) {
    console.log(rowCol);
    thisCell = this.board[rowCol[0]],[rowCol[1]];
    if (typeof thisCell === "undefined") {
      lastBlank = rowCol;
      counts[2]++;
    } else if (thisCell % 2 === 0) {
      counts[0]++;
    } else {
      counts[1]++;
    }
  });
  resultSet.counts = counts;
  resultSet.lastBlank = lastBlank;
  return resultSet;
};


TicTacToeGame.prototype.generateLines = function () {
  var row, col, line, lines = [];

  // Each row is a line
  for (row = 0; row < this.boardRows; row++) {
    line = [];
    for (col = 0; col < this.boardCols; col++) {
      line.push([row, col]);
    }
    lines.push(line);
  }

  // Each col is a line
  for (col = 0; col < this.boardCols; col++) {
    line = [];
    for (row = 0; row < this.boardRows; row++) {
      line.push([row, col]);
    }
    lines.push(line);
  }

  // Two diagonals assuming square board
  line = [];
  for (row = 0; row < this.boardRows; row++) {
    col = row;
    line.push([row, col]);
  }
  lines.push(row);

  line = [];
  col = this.boardCols;
  for (row = 0; row < this.boardRows; row++) {
    col--;
    line.push([row, col]);
  }
  lines.push(row);

  return lines;
}


TicTacToeGame.prototype.showThinking = function() {
  var lineCountSets = [];
  var lines = this.generateLines();
  lines.forEach(function(line) {
    lineCountSets.push(this.lineCountSet(line));
  });

  return lineCountSets;
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
    } // End for col
    displayBoard[row] = rowExternal;
  } // End for row
  return displayBoard;
}


var testGame = new TicTacToeGame();
testGame.recordMove(1,1);
testGame.recordMove(2,2);
testGame.recordMove(3,3);
console.log(testGame.lineCountSet([[0,0],[1,1], [2,2]]));

  /////////////////////
 // Front End Section
/////////////////////

$(document).ready(function() {


}); // End document ready
