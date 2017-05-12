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
  var turnCounter = 0;
  var isWinner = false;

  createTiles();

  // Listen to which tile gets clicked
  document.addEventListener('click', objectFinder, false);

  return(turnCounter);

//////////* FUNCTION DECLARATIONS *//////////

  function createTiles()
  {
    for (var i = 0; i < amountOfTiles; i++)
    {
      var tileContainer = document.getElementById("tile-container");
      var tile = document.createElement("div");
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
    var tileInnerText = document.getElementById(targetId);

    if(tileInnerText.innerHTML == "" && isWinner == false)
    {
      checkWhoIsNext(tileInnerText);
    }
  }

  function checkWhoIsNext(clickedElement)
  {
    if(turnCounter % 2 == 0)
    {
      console.log("It is X turn");
      clickedElement.innerHTML = "X";
    }
    else
    {
      console.log("It is O turn");
      clickedElement.innerHTML = "O";
    }
    turnCounter++;

    isHorizontalVerticalWinner(tileArray, tileArray.length, 3, 0, 1, 2, " has won horizontally!");
    isHorizontalVerticalWinner(tileArray, 3, 1, 0, 3, 6, " has won vertically!");
    isDiagonalWinner(tileArray, 0, 4, 8, " has won diagonally from upperleft to lowerright!");
    isDiagonalWinner(tileArray, 2, 4, 6, " has won diagonally from lowerleft to upperright!");

    if(isWinner)
    {
      document.removeEventListener('click', objectFinder, true);
      console.log("winner");
      return;
    }
  }

  function isHorizontalVerticalWinner(arrayOfTilesToCheck, forLoopComparison, forLoopIncrement, firstTileIndex, secondTileIndex, thirdTileIndex, strWinnerText)
  {
    for (let i = 0; i < forLoopComparison; i += forLoopIncrement)
    {
      let firstTile = arrayOfTilesToCheck[i + firstTileIndex];
      let secondTile = arrayOfTilesToCheck[i + secondTileIndex];
      let thirdTile = arrayOfTilesToCheck[i + thirdTileIndex];

      let firstTileInput = firstTile.innerHTML;
      let secondTileInput = secondTile.innerHTML;
      let thirdTileInput = thirdTile.innerHTML;

      if(firstTileInput != "" || secondTileInput != "" || thirdTileInput != "")
      {
        if(firstTileInput === secondTileInput && secondTileInput === thirdTileInput)
        {
          console.log((firstTileInput) + strWinnerText);
          isWinner = true;
          return;
        }
      }
    }
  }

  function isDiagonalWinner(arrayOfTilesToCheck, firstTileIndex, secondTileIndex, thirdTileIndex,strWinnerText)
  {
    let firstTile = arrayOfTilesToCheck[firstTileIndex];
    let secondTile = arrayOfTilesToCheck[secondTileIndex];
    let thirdTile = arrayOfTilesToCheck[thirdTileIndex];

    let firstTileInput = firstTile.innerHTML;
    let secondTileInput = secondTile.innerHTML;
    let thirdTileInput = thirdTile.innerHTML;

    if(firstTileInput != "" || secondTileInput != "" || thirdTileInput != "")
    {
      if(firstTileInput === secondTileInput && secondTileInput === thirdTileInput)
      {
        console.log((firstTileInput) + strWinnerText);
        isWinner = true;
        return;
      }
    }

  }
})
();
