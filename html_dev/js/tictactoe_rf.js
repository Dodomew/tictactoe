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
  var GameState = { IN_PROGRESS : 0, X_WIN : 1, O_WIN : 2, DRAW : 3 }
  var PlayerTurn = { X : 0, O : 1 }

  var amountOfTiles = 9;
  var tileArray = [];
  var playerTurn = PlayerTurn.X;
  var gameState = GameState.IN_PROGRESS;

  createTiles();

  // Listen to which tile gets clicked
  document.addEventListener('click', objectFinder, false);

  return(turnCounter);

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
    let tileElement = document.getElementById(targetId);

    if(tileElement.innerHTML == "" && gameState == GameState.IN_PROGRESS)
    {
      checkWhoIsNext(tileElement);
    }
  }

  function checkWhoIsNext(clickedElement)
  {
    if(playerTurn == PlayerTurn.X)
    {
      console.log("It is X turn");
      clickedElement.innerHTML = "X";
	  playerTurn = PlayerTurn.O;
    }
    else
    {
      console.log("It is O turn");
      clickedElement.innerHTML = "O";
	  playerTurn = PlayerTurn.X;
    }
	
	let result1 = isHorizontalWinner();
	let result2 = isVerticalWinner();
	let result3 = isDiagonalWinner(0, 4, 8);
    let result4 = isDiagonalWinner(2, 4, 6);
	
	//isHorizontalVerticalWinner(tileArray, tileArray.length, 3, 0, 1, 2, " has won horizontally!");
    //isHorizontalVerticalWinner(tileArray, 3, 1, 0, 3, 6, " has won vertically!");
    //isDiagonalWinner(tileArray, 0, 4, 8, " has won diagonally from upperleft to lowerright!");
    //isDiagonalWinner(tileArray, 2, 4, 6, " has won diagonally from lowerleft to upperright!");
	
    if(result1 || resulte2 || result3 || result4)
    {
		gameState = GameState.GAME_OVER;
      document.removeEventListener('click', objectFinder, true);
      console.log("winner");
      return;
    }
  }
  
  function isHorizontalWinner()
  {
	//Skips rows
    for (let i = 0; i < tileArray.length; i += 3)
    {
      let firstTileInput = tileArray[i + 0].innerHTML;
      let secondTileInput = tileArray[i + 1].innerHTML;
      let thirdTileInput = tileArray[i + 2].innerHTML;
			  
      if(firstTileInput != "" || secondTileInput != "" || thirdTileInput != "")
      {
        return firstTileInput === secondTileInput && secondTileInput === thirdTileInput;
      }
    }
  }
  
  function isVerticalWinner()
  {
	//Skips columns
    for (let i = 0; i < 3; i++)
    {
      let firstTileInput = tileArray[i + 0].innerHTML;
      let secondTileInput = tileArray[i + 3].innerHTML;
      let thirdTileInput = tileArray[i + 6].innerHTML;
			  
      if(firstTileInput != "" || secondTileInput != "" || thirdTileInput != "")
      {
        return firstTileInput === secondTileInput && secondTileInput === thirdTileInput;
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
      return firstTileInput === secondTileInput && secondTileInput === thirdTileInput;
    }
  }
})
();
