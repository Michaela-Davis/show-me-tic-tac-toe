  ////////////////////
 // Back End Section
////////////////////
function TicTacToeGame() {
  this.externalMoveSymbols = ["X", "O"];
  this.boardRows = 3;
  this.boardCols = 3;
  this.lines = this.generateLines();
  this.refreshGame();
}


TicTacToeGame.prototype.refreshGame = function () {
  this.computerMoveSymbol = "";
  this.moveCount = 0;
  this.board = [[], [], []];
};


TicTacToeGame.prototype.startComputerPlay = function () {
  this.computerMoveIndex = this.moveCount % 2;
  this.computerMoveSymbol = this.externalMoveSymbols[this.computerMoveIndex];
};



TicTacToeGame.prototype.lineCountSet = function (lineRowCols) {
  var resultSet = {}, counts = [0, 0, 0], rowCols = [[],[],[]], thisCell;
  var row, col, nextRowCol;
  for (nextRowCol = 0; nextRowCol < lineRowCols.length; nextRowCol++) {
    row = lineRowCols[nextRowCol][0];
    col = lineRowCols[nextRowCol][1];
    thisCell = this.board[row][col];
    if (typeof thisCell === "undefined") {
      rowCols[2].push([row,col]);
      counts[2]++;
    } else if (thisCell % 2 === 0) {
      rowCols[0].push([row,col]);
      counts[0]++;
    } else {
      rowCols[1].push([row,col]);
      counts[1]++;
    }
  }

  resultSet.counts = counts;
  resultSet.rowCols = rowCols;
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


TicTacToeGame.prototype.generateLineCountSets = function () {
  var lineCountSets = [];
  var thisGame = this;
  this.lines.forEach(function(line) {
    lineCountSets.push(thisGame.lineCountSet(line));
  });
  return lineCountSets;
};


TicTacToeGame.prototype.calculateWinners = function () {
  var winners = [];
  var thisGame = this;
  var lineCountSets = this.generateLineCountSets();

  lineCountSets.forEach(function (lineCounts, lineIndex) {
    thisGame.externalMoveSymbols.forEach(function (externalMoveSymbol, externalSymbolIndex) {
      if (lineCounts.counts[externalSymbolIndex] === 3) {
        winners.push(
          {
            xOrO: externalMoveSymbol,
            lineRowCols: thisGame.lineInternalToExternal(thisGame.lines[lineIndex])
          }
        )
      }
    });
  });
  return winners;
};


TicTacToeGame.prototype.calculateWinningMoves = function (moveCount, myWin) {
  var winningMoves = [];
  var winningMoveCountIndex = moveCount % 2;
  var whoseMove;
  var lineCountSets = this.generateLineCountSets();
  var thisGame = this;

  if (myWin) {
    whoseMove = moveCount;
  } else {
    whoseMove = moveCount - 1;
  }
  if (whoseMove % 2) {
    xOrO = "O";
  } else {
    xOrO = "X";
  }

  lineCountSets.forEach(function (lineCountSet, lineIndex) {
    if (lineCountSet.counts[winningMoveCountIndex] === 2 && lineCountSet.counts[2] === 1) {
      winningMoves.push(
        {
          xOrO: xOrO,
          lineRowCols: thisGame.lineInternalToExternal(thisGame.lines[lineIndex]),
          blankRowCol: thisGame.lineInternalToExternal(lineCountSet.rowCols[2])[0],
          filledRowCols: thisGame.lineInternalToExternal(lineCountSet.rowCols[winningMoveCountIndex])
        }
      )
    }
  });

  return winningMoves;
};


TicTacToeGame.prototype.whoseNextMove = function (moveCount) {
  return this.externalMoveSymbols[moveCount % 2];
};


TicTacToeGame.prototype.calculateComputersMove = function () {
  result = {};
  result.computersOptionalRowCols = [[1,1], [2, 2], [3, 3]];
  result.computersChoiceRowCol = [2,2];
  return result;
};

TicTacToeGame.prototype.showThinking = function() {
  var result = {}, whoseNextMove = "";
  result.winners = this.calculateWinners();
  result.winningMoves = this.calculateWinningMoves(this.moveCount, true);
  result.defendingMoves = this.calculateWinningMoves(this.moveCount + 1, false);
  result.isADraw = (this.moveCount === (this.boardRows * this.boardCols) && !result.winners.length);
  if (!result.isADraw && !result.winners.length) {
    whoseNextMove = this.whoseNextMove(this.moveCount)
  }
  result.whoseNextMove = whoseNextMove;
  result.computerMoveSymbol = this.computerMoveSymbol;
  if (!result.isADraw && !result.winners.length && result.computerMoveSymbol && this.moveCount % 2 === this.computerMoveIndex) {
    result.computersMove = this.calculateComputersMove();
  }
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
var gameEnded = false;

function displayBoard(rowsCols) {
  for (var row = 1; row <= 3; row++) {
    for (var col = 1; col <= 3; col++) {
      $(".row" + row + ".col" + col).text(rowsCols[row][col]);
    }
  }
}


function showWinners(result) {

  result.winners.forEach(function(winner) {
    winner.lineRowCols.forEach(function(rowCol) {
      $(".row" + rowCol[0] + ".col" + rowCol[1]).addClass("isWinner");
    });
  });
} // end showWinners()

function showWinningLine(result) {
  $(".potWinLine").removeClass("potWinLine");
  $(".potWinMove").removeClass("potWinMove");
  result.winningMoves.forEach(function(winningMove) {
    winningMove.filledRowCols.forEach(function(rowCol) {
      $(".row" + rowCol[0] + ".col" + rowCol[1]).addClass("potWinLine");
    });
    $(".row" + winningMove.blankRowCol[0] + ".col" + winningMove.blankRowCol[1]).addClass("potWinMove");
  });
} // end showWinningMoves

function showDefendingLine(result) {
  $(".defLine").removeClass("defLine");
  $(".defMove").removeClass("defMove");
  if (!result.winningMoves.length) {
    result.defendingMoves.forEach(function(defendingMove) {
      defendingMove.filledRowCols.forEach(function(rowCol) {
        $(".row" + rowCol[0] + ".col" + rowCol[1]).addClass("defLine");
      });
      $(".row" + defendingMove.blankRowCol[0] + ".col" + defendingMove.blankRowCol[1]).addClass("defMove");
    });
  }
}


$(document).ready(function() {
  console.log(gameBoard.showThinking());

  $(".playComputer").click(function() {
    gameBoard.startComputerPlay();
    var result = gameBoard.showThinking();
    var rowCol = result.computersMove.computersChoiceRowCol;
    gameBoard.recordMove(rowCol[0], rowCol[1]);
    displayBoard(gameBoard.showBoard());
    var myDelete = "this line";
  });

  $(".square").click(function() {
    var row, col;

    if (!gameEnded) {
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

      if (result.isADraw === true) {
        $("#board").addClass("isADraw");
      }

      // if (result.isADraw) {
      console.log(result);

      showWinners(result);
      showWinningLine(result);
      showDefendingLine(result);

      // Stop if someone won
      if (result.winners.length) {
        $(".potWinLine").removeClass("potWinLine");
        $(".potWinMove").removeClass("potWinMove");
        $(".defLine").removeClass("defLine");
        $(".defMove").removeClass("defMove");
        gameEnded = true;
      }
    }
  });

  $(".newGame").click(function() {
    gameEnded = false;
    gameBoard.refreshGame();
    displayBoard(gameBoard.showBoard());
    $(".isWinner").removeClass("isWinner");
    $(".potWinLine").removeClass("potWinLine");
    $(".potWinMove").removeClass("potWinMove");
    $(".defLine").removeClass("defLine");
    $(".defMove").removeClass("defMove");
    $("#board").removeClass("isADraw");
  });

}); // End document ready
