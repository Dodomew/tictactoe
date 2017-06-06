/*

- Write the `populate` function to populate the table according to the game state.
- Write the `nextPlayer` function to determine which player should go next based on the state of the game, assuming that "x" always goes first. Return "x" or "o".
- Write the `findWinner` function to determine whether there is a winner in the current game. Return "x" or "o" if there is a winner, and `null` if there is not.
- Imagine a 4 x 4 board where a player wins by connecting three positions -- how would your solutions change?
- How would your solutions change to adapt to arbitrary board sizes and arbitrary requirements for the number of positions that must connect?
  For example, consider an 8x8 board where four of a player's pieces must connect.

*/

'use strict';

(function() // avoid global vars
{
  class Tile
  {
    constructor(i, j, tileContainer)
    {
      this.i = i;
      this.j = j;

      this.outerDiv = document.createElement("div");
      this.outerDivId = "tile-parent-" + i + "-" + j;
      this.outerDivClass = "tile";

      this.innerDiv = document.createElement("div");
      this.innerDivId = "tile-child-" + i + "-" + j;

      this.userInput = UserInput.EMPTY;

      // Set attributes

      this.outerDiv.className = this.outerDivClass;
      this.outerDiv.id = this.outerDivId;

      this.innerDiv.id = this.innerDivId;

      this.outerDiv.appendChild(this.innerDiv);
      tileContainer.appendChild(this.outerDiv);
    }
  }

  var amountOfTiles = 9;
  var numberOfColumns = 3;
  var numberOfRows = 3;
  var gameMessageText = document.getElementById("game-message");
  var gameMessageSheep = document.getElementById("game-message-sheep");

  var retryButton = document.getElementById("js-retry-button");
  retryButton.addEventListener('click', tryAgain, false);

  var GameState =
  {
    IN_PROGRESS : 0,
    BLACK_SHEEP_WINS : 1,
    WHITE_SHEEP_WINS : 2,
    DRAW : 3,
  };

  var PlayerTurn =
  {
    BLACK_SHEEP_TURN : 0,
    WHITE_SHEEP_TURN : 1,
  }

  var UserInput =
  {
    EMPTY : 0,
    BLACK_SHEEP : 1,
    WHITE_SHEEP : 2,
  };

  var gameState = GameState.IN_PROGRESS;
  var playerTurn = PlayerTurn.BLACK_SHEEP_TURN;
  var gridOfTiles = create2DGrid();

  function objectFinder(event)
  {
    let e = window.event || event;
    let targetId = e.srcElement.id;

    let targetTile = whichTileWasClicked(gridOfTiles, targetId);

    if(targetTile.userInput == UserInput.EMPTY && gameState == GameState.IN_PROGRESS)
    {
      checkWhoIsNext(targetTile);
    }
  }

  function tryAgain()
  {
    retryButton.classList.add("js-disabled-button");
    gameMessageText.innerHTML = " starts.";
    gameMessageSheep.className = "tile-x-gamemessage";
    gameState = GameState.IN_PROGRESS;
    playerTurn = PlayerTurn.BLACK_SHEEP_TURN;
    gridOfTiles = create2DGrid();
  }

  function checkWhoIsNext(targetTile)
  {
    if(targetTile.userInput == 0)
    {
      var randomTransformDegrees = getRandomInt(0,35);

      if(playerTurn == PlayerTurn.BLACK_SHEEP_TURN)
      {
        playerXTurn(targetTile, randomTransformDegrees);
      }
      else
      {
        playerOTurn(targetTile, randomTransformDegrees);
      }
      retryButton.classList.remove("js-disabled-button");
      whoIsWinner();
    }
  }

  function whoIsWinner()
  {
    let winnerTiles;
    let resultHorizontalWinner = isHorizontalWinner();
    let resultVerticalWinner = isVerticalWinner();
    let resultDiagonalOneWinner = isDiagonalWinner();
    let resultGameDraw = isGameDraw();

    if(resultHorizontalWinner.length > 0)
    {
      winnerTiles = resultHorizontalWinner;
    }
    else if (resultVerticalWinner.length > 0)
    {
      winnerTiles = resultVerticalWinner;
    }
    else if (resultDiagonalOneWinner.length > 0)
    {
      winnerTiles = resultDiagonalOneWinner;
    }
    else
    {
      winnerTiles = [];
    }

    if(resultGameDraw == true)
    {
      gameState = GameState.DRAW;
      gameMessageText.innerHTML = "This game ended in a draw!";
    }

    if(winnerTiles.length > 0)
    {
      playerIsVictorious(winnerTiles);
    }

    nextPlayer();

  }

  function playerIsVictorious(winningTiles)
  {
    document.removeEventListener('click', objectFinder, true);

    if(playerTurn == PlayerTurn.BLACK_SHEEP_TURN)
    {
      gameState = GameState.BLACK_SHEEP_WINS;
      gameMessageSheep.className = " tile-x-gamemessage";
      gameMessageText.innerHTML = " has won!";
    }
    else
    {
      gameState = GameState.WHITE_SHEEP_WINS;
      gameMessageSheep.className = " tile-o-gamemessage";
      gameMessageText.innerHTML = " has won!";
    }

    for (let i = 0; i < winningTiles.length; i++)
    {
      winningTiles[i].innerDiv.className += " winning";
    }
  }

  function isHorizontalWinner()
  {
    let winningTiles = [];

    for (let i = 0; i < numberOfRows; i++)
    {
      winningTiles = [];
      let tileToCompareTo = gridOfTiles[i][0];

      if(tileToCompareTo.userInput != UserInput.EMPTY)
      {
        for (let j = 0; j < numberOfColumns; j++)
        {
          let tileToBeCompared = gridOfTiles[i][j];

          if(tileToCompareTo.userInput == tileToBeCompared.userInput)
          {
            winningTiles.push(tileToBeCompared);

            if(winningTiles.length == numberOfColumns)
            {
              return winningTiles;
            }
          }
        }
      }
    }
    return [];
  }

  function isVerticalWinner()
  {
    let winningTiles = [];

    for (let i = 0; i < numberOfColumns; i++)
    {
      winningTiles = [];
      let tileToCompareTo = gridOfTiles[0][i];

      if(tileToCompareTo.userInput != UserInput.EMPTY)
      {
        for (let j = 0; j < numberOfRows; j++)
        {
          let tileToBeCompared = gridOfTiles[j][i];

          if(tileToCompareTo.userInput == tileToBeCompared.userInput)
          {
            winningTiles.push(tileToBeCompared);

            if(winningTiles.length == numberOfColumns)
            {
              return winningTiles;
            }
          }
        }
      }
    }
    return [];
  }

  function isDiagonalWinner()
  {
    let winningTilesDiagonal = [];
    let winningTilesDiagonalMirrored = [];

    let tileToCompareTo = gridOfTiles[0][0];
    let tileToCompareToMirrored = gridOfTiles[0][numberOfRows - 1];

    let i;
    let j;

    for (i = 0, j = numberOfRows - 1; i < numberOfColumns; i++, j--)
    {
      let tileToBeCompared = gridOfTiles[i][i];
      let tileToBeComparedMirrored = gridOfTiles[i][j];

      if(tileToCompareTo.userInput == tileToBeCompared.userInput && tileToBeCompared.userInput != UserInput.EMPTY)
      {
        winningTilesDiagonal.push(tileToBeCompared);
      }

      if(tileToCompareToMirrored.userInput == tileToBeComparedMirrored.userInput && tileToBeComparedMirrored.userInput != UserInput.EMPTY)
      {
        winningTilesDiagonalMirrored.push(tileToBeComparedMirrored);
      }

      if(winningTilesDiagonal.length == numberOfColumns)
      {
        return winningTilesDiagonal;
      }
      else if (winningTilesDiagonalMirrored.length == numberOfColumns)
      {
        return winningTilesDiagonalMirrored;
      }
    }
    return [];
  }

  function isGameDraw()
  {
    for (let i = 0; i < numberOfRows; i++)
    {
      for (let j = 0; j < numberOfColumns; j++)
      {
        if(gridOfTiles[i][j].userInput == UserInput.EMPTY)
        {
          return false;
        }
      }
    }
    return true;
  }

  function playerXTurn(targetTile, randomTransformDegrees)
  {
    let innerDivOfTile = targetTile.innerDiv;
    scaleIn(innerDivOfTile);
    innerDivOfTile.className += "tile-x";
    innerDivOfTile.style.transform = "rotate(" + randomTransformDegrees +"deg)";

    targetTile.userInput = UserInput.BLACK_SHEEP;

    gameMessageText.innerHTML = "is now up.";
    gameMessageSheep.className = " tile-o-gamemessage";

    //nextPlayer();
  }

  function playerOTurn(targetTile,randomTransformDegrees)
  {
    let innerDivOfTile = targetTile.innerDiv;
    scaleIn(innerDivOfTile);
    innerDivOfTile.className += "tile-o";
    innerDivOfTile.style.transform = "rotate(" + randomTransformDegrees +"deg)";

    targetTile.userInput = UserInput.WHITE_SHEEP;

    gameMessageText.innerHTML = "is now up.";
    gameMessageSheep.className = " tile-x-gamemessage";

    //nextPlayer();
  }

  function nextPlayer()
  {
    if(playerTurn == PlayerTurn.BLACK_SHEEP_TURN)
    {
      playerTurn = PlayerTurn.WHITE_SHEEP_TURN;
    }
    else
    {
      playerTurn = PlayerTurn.BLACK_SHEEP_TURN;
    }
  }

  function scaleIn(clickedElement)
  {
    setTimeout(function timerForScaleIn()
    {
      clickedElement.className += " scaled";
    },
    randomIntFromInterval(10, 50));
  }

  function randomIntFromInterval(min,max)
  {
      return Math.floor(Math.random()*(max-min+1)+min);
  }

  function getRandomInt(min, max)
  {
    return Math.floor(Math.random() * (max - min) * 10);
  }

  function create2DGrid()
  {
    let grid = [];
    let tileContainer = document.getElementById("tile-container");
    tileContainer.innerHTML = ""; // for reset game
    tileContainer.addEventListener('click', objectFinder, false);

    for (let i = 0; i < numberOfRows; i++)
    {
      let row = [];

      for (let j = 0; j < numberOfColumns; j++)
      {
        let newTile = new Tile(i, j, tileContainer);

        row.push(newTile);
      }
      grid.push(row);
    }
    return grid;
  }

  function whichTileWasClicked(grid, clickedId)
  {
    for (let i = 0; i < grid.length; i++)
    {
      for (let j = 0; j < grid.length; j++)
      {
        if(clickedId == grid[i][j].outerDiv.id)
        {
          let clickedTile = grid[i][j];
          return clickedTile;
        }
      }
    }
  }

})
();
