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
  var tileArray = [];
  var gameMessage = document.getElementById("game-message");

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

  var gameState = GameState.IN_PROGRESS;
  var playerTurn = PlayerTurn.X_TURN;

  createTiles();

  document.addEventListener('click', objectFinder, false);

//////////* FUNCTION DECLARATIONS *//////////

  function createTiles()
  {
    let tileContainer = document.getElementById("tile-container");

    for (let i = 0; i < amountOfTiles; i++)
    {
      let tile = document.createElement("div");
      tile.setAttribute("class", "tile");
      tile.setAttribute("id", "tile-" + i);

      tileContainer.appendChild(tile);
      tileArray.push(tile);
    }
  }

  function objectFinder(event)
  {
    let e = window.event || event;
    let targetId = e.srcElement.id;
    let targetClass = e.srcElement.className.split(" ")[0]; // http://stackoverflow.com/questions/11606897/get-only-first-class-of-an-html-element
    let tileInnerElement = document.getElementById(targetId);

    if(tileInnerElement.innerHTML == "" && gameState == GameState.IN_PROGRESS)
    {
      checkWhoIsNext(tileInnerElement);
    }
  }

  function checkWhoIsNext(clickedElement)
  {
    if(clickedElement.innerHTML == "")
    {
      if(playerTurn == PlayerTurn.X_TURN)
      {
        clickedElement.innerHTML = "X";
        clickedElement.className += " tile-x";
        gameMessage.innerHTML = "It is now O's turn.";
        playerTurn = PlayerTurn.O_TURN;
      }
      else
      {
        clickedElement.innerHTML = "O";
        clickedElement.className += " tile-o";
        gameMessage.innerHTML = "It is now X's turn.";
        playerTurn = PlayerTurn.X_TURN;
      }
      whoIsWinner();
    }
  }

  function whoIsWinner()
  {
    let resultHorizontalWinner = isHorizontalWinner();
    let resultVerticalWinner = isVerticalWinner();
    let resultDiagonalOneWinner = isDiagonalWinner(0, 4, 8);
    let resultDiagonalTwoWinner = isDiagonalWinner(2, 4, 6);
    let resultGameDraw = isGameDraw();

    if(resultGameDraw == true)
    {
      gameState = GameState.DRAW;
      gameMessage.innerHTML = "This game ended in a draw!";
    }

    if(resultHorizontalWinner || resultVerticalWinner || resultDiagonalOneWinner || resultDiagonalTwoWinner)
    {
      document.removeEventListener('click', objectFinder, true);

      if(playerTurn == PlayerTurn.X_TURN)
      {
        gameState = GameState.O_WINS;
        gameMessage.innerHTML = "O has won!";
      }
      else
      {
        gameState = GameState.X_WINS;
        gameMessage.innerHTML = "X has won!";
      }
    }
  }

  function isHorizontalWinner()
  {
    // skip rows
    for (let i = 0; i < tileArray.length; i += 3)
    {
      let firstTileInput = tileArray[i + 0].innerHTML;
      let secondTileInput = tileArray[i + 1].innerHTML;
      let thirdTileInput = tileArray[i + 2].innerHTML;

      if(firstTileInput != "" || secondTileInput != "" || thirdTileInput != "")
      {
        if(firstTileInput === secondTileInput && secondTileInput === thirdTileInput)
        {
          return true;
        }
      }
    }
  }

  function isVerticalWinner()
  {
    // skip columns
    for (let i = 0; i < 3; i++)
    {
      let firstTileInput = tileArray[i+ 0].innerHTML;
      let secondTileInput = tileArray[i + 3].innerHTML;
      let thirdTileInput = tileArray[i + 6].innerHTML;

      if(firstTileInput != "" || secondTileInput != "" || thirdTileInput != "")
      {
        if(firstTileInput === secondTileInput && secondTileInput === thirdTileInput)
        {
          return true;
        }
      }
    }
  }

  function isDiagonalWinner(firstTileIndex, secondTileIndex, thirdTileIndex)
  {
    let firstTileInput = tileArray[firstTileIndex].innerHTML;
    let secondTileInput = tileArray[secondTileIndex].innerHTML;
    let thirdTileInput = tileArray[thirdTileIndex].innerHTML;

    if(firstTileInput != "" || secondTileInput != "" || thirdTileInput != "")
    {
      if(firstTileInput === secondTileInput && secondTileInput === thirdTileInput)
      {
        return true;
      }
    }
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
})
();
