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


TicTacToeGame.prototype.lineCountSet = function (lineRowCols) {
  var resultSet = {}, counts = [0, 0, 0], thisCell, lastBlank = [];
  var row, col, nextRowCol;
  for (nextRowCol = 0; nextRowCol < lineRowCols.length; nextRowCol++) {
    row = lineRowCols[nextRowCol][0];
    col = lineRowCols[nextRowCol][1];
    thisCell = this.board[row][col];
    if (typeof thisCell === "undefined") {
      lastBlank = [row, col];
      counts[2]++;
    } else if (thisCell % 2 === 0) {
      counts[0]++;
    } else {
      counts[1]++;
    }
  }

  resultSet.counts = counts;
  resultSet.lastBlank = lastBlank;
  // return resultSet;
  return counts;
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
  lines.push(line);

  line = [];
  col = this.boardCols;
  for (row = 0; row < this.boardRows; row++) {
    col--;
    line.push([row, col]);
  }
  lines.push(line);

  return lines;
}


TicTacToeGame.prototype.lineInternalToExternal = function (linerowCols) {
  var externalRowCols = [];
  linerowCols.forEach(function (rowCol) {
    externalRowCols.push([rowCol[0] + 1, rowCol[1] + 1]);
  });
  return externalRowCols;
};


TicTacToeGame.prototype.showThinking = function() {
  var result = {};
  var winners = [];
  var lineCountSets = [];
  var lines = this.generateLines();
  var thisGame = this;
  lines.forEach(function(line) {
    lineCountSets.push(thisGame.lineCountSet(line));
  });

  lineCountSets.forEach(function (lineCounts, lineIndex) {
    if (lineCounts[0] === 3) {
      winners.push(
        {
          xOrO: "X",
          lineRowCols: thisGame.lineInternalToExternal(lines[lineIndex])
        }
      )
    }
    if (lineCounts[1] === 3) {
      winners.push(
        {
          xOrO: "O",
          lineRowCols: thisGame.lineInternalToExternal(lines[lineIndex])
        }
      )
    }
  });
  result.winners = winners;
  return result;
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
    } // End for col
    displayBoard[row] = rowExternal;
  } // End for row
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

    var result = gameBoard.showThinking();
    console.log(result);

    // Did I win?

  });



}); // End document ready
