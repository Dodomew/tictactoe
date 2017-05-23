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
  var gameMessageSheep = document.getElementById("game-message-sheep");

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

  function objectFinder(event)
  {
    let e = window.event || event;
    let targetId = e.srcElement.id;
    let tileInnerElement = document.getElementById(targetId).children[0];
    let tileUserInput = tileInnerElement.children[0];

    if(tileUserInput.innerHTML == "" && gameState == GameState.IN_PROGRESS)
    {
      checkWhoIsNext(tileInnerElement, tileUserInput);
    }
  }

  function checkWhoIsNext(clickedElement, clickedElementUserInput)
  {
    if(clickedElementUserInput.innerHTML == "")
    {
      var randomTransformDegrees = getRandomInt(0,35);

      if(playerTurn == PlayerTurn.X_TURN)
      {
        playerXTurn(clickedElement, clickedElementUserInput, randomTransformDegrees);
      }
      else
      {
        playerOTurn(clickedElement, clickedElementUserInput, randomTransformDegrees);
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
        gameMessageSheep.className = " tile-o";
        gameMessage.innerHTML = " has won!";
      }
      else
      {
        gameState = GameState.X_WINS;
        gameMessageSheep.className = " tile-x";
        gameMessage.innerHTML = " has won!";
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
      let firstTileInput = tileArray[i + 0].innerHTML;
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

  function getRandomInt(min, max)
  {
    return Math.floor(Math.random() * (max - min) * 10);
  }

  function playerXTurn(clickedElement, clickedElementUserInput, randomTransformDegrees)
  {
    clickedElement.className += "tile-x";
    clickedElementUserInput.innerHTML = "X";

    clickedElement.style.transform = "rotate(" + randomTransformDegrees +"deg)";

    gameMessage.innerHTML = "is now on the play.";
    gameMessageSheep.className = " tile-o";

    playerTurn = PlayerTurn.O_TURN;
  }

  function playerOTurn(clickedElement, clickedElementUserInput,randomTransformDegrees)
  {
    clickedElement.className += "tile-o";
    clickedElementUserInput.innerHTML = "O";

    clickedElement.style.transform = "rotate(" + randomTransformDegrees +"deg)";

    gameMessage.innerHTML = "is now on the play.";
    gameMessageSheep.className = " tile-x";

    playerTurn = PlayerTurn.X_TURN;
  }

  function scaleIn(clickedElement)
  {
    setTimeout(function timerForScaleIn()
    {
      clickedElement.className += " scaled";
    },
    randomIntFromInterval(100, 500) * 1);
  }

  function randomIntFromInterval(min,max)
  {
      return Math.floor(Math.random()*(max-min+1)+min);
  }
})
();
