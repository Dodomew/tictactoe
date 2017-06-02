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
  var amountOfTiles = 9;
  var numberOfColumns = 3;
  var numberOfRows = 3;
  var tileArray = [];
  var gameMessage = document.getElementById("game-message");
  var gameMessageSheep = document.getElementById("game-message-sheep");

  var retryButton = document.getElementById("js-retry-button");
  retryButton.addEventListener('click', tryAgain, false);

  var GameState =
  {
    IN_PROGRESS : 0,
    X_WINS : 1,
    O_WINS : 2,
    DRAW : 3,
  };

  var PlayerTurn =
  {
    X_TURN : 0,
    O_TURN : 1,
  }

  var UserInput =
  {
    EMPTY : 0,
    BLACK_SHEEP : 1,
    WHITE_SHEEP : 2,
  };

  var gameState = GameState.IN_PROGRESS;
  var playerTurn = PlayerTurn.X_TURN;

  var gridOfTiles = create2DGrid();
  //createTile();
  //access2DArray();
  //createTiles();

/*
  function createTiles()
  {
    let tileContainer = document.getElementById("tile-container");
    tileContainer.innerHTML = ""; // for reset game
    tileContainer.addEventListener('click', objectFinder, false);

    for (let i = 0; i < amountOfTiles; i++)
    {
      let tile = document.createElement("div");
      tile.setAttribute("class", "tile");
      tile.setAttribute("id", "tile-parent-" + i);

      let tileInnerChild = document.createElement("div");
      tileInnerChild.setAttribute("id", "tile-child-" + i);

      let spanInnerChild = document.createElement("span");
      spanInnerChild.setAttribute("class", "tile-userinput");

      tile.appendChild(tileInnerChild);
      tileInnerChild.appendChild(spanInnerChild);

      tileContainer.appendChild(tile);
      tileArray.push(spanInnerChild);
    }
  }
*/
  function objectFinder(event)
  {
    let e = window.event || event;
    let targetId = e.srcElement.id;

    let targetTile = whichTileWasClicked(gridOfTiles, targetId);

    if(targetTile.userInput == UserInput.EMPTY && gameState == GameState.IN_PROGRESS)
    {
      //checkWhoIsNext(tileInnerElement, tileUserInput);
      checkWhoIsNext(targetTile);
    }
  }

  function tryAgain()
  {
    retryButton.classList.add("js-disabled-button");
    gameMessage.innerHTML = " starts.";
    gameMessageSheep.className = "tile-x-gamemessage";
    gameState = GameState.IN_PROGRESS;
    playerTurn = PlayerTurn.X_TURN;
    tileArray = []
    createTiles();
  }

  function checkWhoIsNext(targetTile)
  {
    if(targetTile.userInput == 0)
    {
      var randomTransformDegrees = getRandomInt(0,35);

      if(playerTurn == PlayerTurn.X_TURN)
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
    /*
    let resultVerticalWinner = isVerticalWinner();
    let resultDiagonalOneWinner = isDiagonalWinner(0, 4, 8);
    let resultDiagonalTwoWinner = isDiagonalWinner(2, 4, 6);
    let resultGameDraw = isGameDraw();
    */
    if(resultHorizontalWinner.length > 0)
    {
      winnerTiles = resultHorizontalWinner;
    }
    /*
    else if (resultVerticalWinner.length > 0)
    {
      winnerTiles = resultVerticalWinner;
    }
    else if (resultDiagonalOneWinner.length > 0)
    {
      winnerTiles = resultDiagonalOneWinner;
    }
    else if(resultDiagonalTwoWinner.length > 0)
    {
      winnerTiles = resultDiagonalTwoWinner;
    }
    */
    else
    {
      winnerTiles = [];
    }
    /*
    if(resultGameDraw == true)
    {
      gameState = GameState.DRAW;
      gameMessage.innerHTML = "This game ended in a draw!";
    }
    */
    if(winnerTiles.length > 0)
    {
      document.removeEventListener('click', objectFinder, true);

      if(playerTurn == PlayerTurn.X_TURN)
      {
        gameState = GameState.O_WINS;
        gameMessageSheep.className = " tile-o-gamemessage";
        gameMessage.innerHTML = " has won!";
      }
      else
      {
        gameState = GameState.X_WINS;
        gameMessageSheep.className = " tile-x-gamemessage";
        gameMessage.innerHTML = " has won!";
      }

      for (let i = 0; i < winnerTiles.length; i++)
      {
        winnerAnimateSheep(winnerTiles[i].innerDiv);
      }
    }
  }

  function isHorizontalWinner()
  {
    /*
    let winningTiles = [];
    // skip rows
    for (let i = 0; i < tileArray.length; i += 3)
    {
      let firstTileInput = tileArray[i + 0];
      let secondTileInput = tileArray[i + 1];
      let thirdTileInput = tileArray[i + 2];


      if(firstTileInput.innerHTML != "" || secondTileInput.innerHTML != "" || thirdTileInput.innerHTML != "")
      {
        if(firstTileInput.innerHTML === secondTileInput.innerHTML && secondTileInput.innerHTML === thirdTileInput.innerHTML)
        {
          winningTiles.push(firstTileInput, secondTileInput, thirdTileInput);
          return winningTiles;
        }
      }
    }
    return winningTiles;
    */

    let winningTiles = [];

    for (let i = 0; i < gridOfTiles.length; i++)
    {
      if(gridOfTiles[i][0].userInput != 0 || gridOfTiles[i][1].userInput != 0 || gridOfTiles[i][2].userInput != 0)
      {
        if(gridOfTiles[i][0].userInput === gridOfTiles[i][1].userInput && gridOfTiles[i][1].userInput === gridOfTiles[i][2].userInput)
        {
          winningTiles.push(gridOfTiles[i][0], gridOfTiles[i][1], gridOfTiles[i][2]);
          return winningTiles;
        }
      }
    }
    return winningTiles;
  }

  function checkWinnerHorizontal()
  {
    let winningTiles = [];

    for (let i = 0; i < gridOfTiles.length; i++)
    {
      if(gridOfTiles[i][0].userInput != 0 || gridOfTiles[i][1].userInput != 0 || gridOfTiles[i][2].userInput != 0)
      {
        if(gridOfTiles[i][0].userInput === gridOfTiles[i][1].userInput && gridOfTiles[i][1].userInput === gridOfTiles[i][2].userInput)
        {
          winningTiles.push(gridOfTiles[i][0], gridOfTiles[i][1], gridOfTiles[i][2]);
          return winningTiles;
        }
      }
    }
    return winningTiles;
  }

  function isVerticalWinner()
  {
    let winningTiles = [];
    // skip columns
    for (let i = 0; i < 3; i++)
    {
      let firstTileInput = tileArray[i + 0];
      let secondTileInput = tileArray[i + 3];
      let thirdTileInput = tileArray[i + 6];

      if(firstTileInput.innerHTML != "" || secondTileInput.innerHTML != "" || thirdTileInput.innerHTML != "")
      {
        if(firstTileInput.innerHTML === secondTileInput.innerHTML && secondTileInput.innerHTML === thirdTileInput.innerHTML)
        {
          winningTiles.push(firstTileInput, secondTileInput, thirdTileInput);
          return winningTiles;
        }
      }
    }
    return winningTiles;
  }

  function isDiagonalWinner(firstTileIndex, secondTileIndex, thirdTileIndex)
  {
    let winningTiles = [];
    let firstTileInput = tileArray[firstTileIndex];
    let secondTileInput = tileArray[secondTileIndex];
    let thirdTileInput = tileArray[thirdTileIndex];

    if(firstTileInput.innerHTML != "" || secondTileInput.innerHTML != "" || thirdTileInput.innerHTML != "")
    {
      let winningTiles = [];

      if(firstTileInput.innerHTML === secondTileInput.innerHTML && secondTileInput.innerHTML === thirdTileInput.innerHTML)
      {
        winningTiles.push(firstTileInput, secondTileInput, thirdTileInput);
        return winningTiles;
      }
    }
    return winningTiles;
  }

  function isGameDraw()
  {
    for (let i = 0; i < tileArray.length; i++)
    {
      if(tileArray[i].innerHTML == "")
      {
        return false;
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

    targetTile.userInput = 1;

    gameMessage.innerHTML = "is now up.";
    gameMessageSheep.className = " tile-o-gamemessage";

    playerTurn = PlayerTurn.O_TURN;
  }

  function playerOTurn(targetTile,randomTransformDegrees)
  {
    let innerDivOfTile = targetTile.innerDiv;
    scaleIn(innerDivOfTile);
    innerDivOfTile.className += "tile-o";
    innerDivOfTile.style.transform = "rotate(" + randomTransformDegrees +"deg)";

    targetTile.userInput = 2;

    gameMessage.innerHTML = "is now up.";
    gameMessageSheep.className = " tile-x-gamemessage";

    playerTurn = PlayerTurn.X_TURN;
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

  function winnerAnimateSheep(winningTile)
  {
    let parentTile = winningTile.parentNode;
    parentTile.className += " winning";
  }

  function create2DGrid()
  {
    let grid = [];
    let gridColumn = 3;
    let gridRow = 3;
    let tileContainer = document.getElementById("tile-container");
    tileContainer.innerHTML = ""; // for reset game
    tileContainer.addEventListener('click', objectFinder, false);

    for (let i = 0; i < gridRow; i++)
    {
      let row = [];

      for (let j = 0; j < gridColumn; j++)
      {
        let tile =
        {
          outerDiv : document.createElement("div"),
          outerDivId: "tile-parent-" + i + "-" + j,
          outerDivClass : "tile",
          innerDiv : document.createElement("div"),
          innerDivId : "tile-child-" + i + "-" + j,
          userInput : UserInput.EMPTY
        }

        tile.outerDiv.className = tile.outerDivClass;
        tile.outerDiv.id = tile.outerDivId;

        tile.innerDiv.id = tile.innerDivId;

        tile.userInput = UserInput.EMPTY;

        tile.outerDiv.appendChild(tile.innerDiv);
        tileContainer.appendChild(tile.outerDiv);

        row.push(tile);
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

/*
  function access2DArray()
  {
    let array = create2DGrid();
    let object = array[0][2];
    object.userInput = 1;
  }
*/
/*
  function createTile()
  {

    let tileContainer = document.getElementById("tile-container");
    tileContainer.innerHTML = ""; // for reset game
    tileContainer.addEventListener('click', objectFinder, false);

    for (let i = 0; i < amountOfTiles; i++)
    {
      let tile =
      {
        outerDiv : document.createElement("div"),
        innerDiv : document.createElement("div"),
        userInput : null
      }

      tile.outerDiv.setAttribute("class", "tile");
      tile.outerDiv.setAttribute("id", "tile-parent-" + i);

      tile.innerDiv.setAttribute("id", "tile-child-" + i);

      tile.outerDiv.appendChild(tile.innerDiv);
      tileContainer.appendChild(tile.outerDiv);
    }
  }
  */

})
();
