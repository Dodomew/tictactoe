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

  createTiles();

  // Listen to which tile gets clicked
  document.addEventListener('click', function objectFinder(event)
  {
    let e = window.event || event;
    let targetId = e.srcElement.id;
    let targetClass = e.srcElement.className.split(" ")[0]; // http://stackoverflow.com/questions/11606897/get-only-first-class-of-an-html-element

    var tileInnerText = document.getElementById(targetId);

    if(tileInnerText.innerHTML == "")
    {
      checkWhoIsNext(tileInnerText);
    }

  }),
  false;

  var turnCounter = 0;

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
    findWinner(tileArray);
  }

  console.log(tileArray.indexOf("X"));
  return(turnCounter);

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

  function populate(board)
  {

  }

  function nextPlayer(board)
  {

  }

  function findWinner(tileArray)
  {
    for (var i = 0; i < tileArray.length; i++)
    {
      if(tileArray[0].innerHTML && tileArray[1].innerHTML && tileArray[2].innerHTML === "X") // anders een switch state maken
      {
        console.log("X has won");
      }
      else if (tileArray[3].innerHTML && tileArray[4].innerHTML && tileArray[5].innerHTML === "X")
      {
        console.log("X has won");
      }
      else if (tileArray[6].innerHTML && tileArray[7].innerHTML && tileArray[8].innerHTML === "X")
      {
        console.log("X has won");
      }
      else if (tileArray[0].innerHTML && tileArray[3].innerHTML && tileArray[6].innerHTML === "X")
      {
        console.log("X has won");
      }
      else if (tileArray[1].innerHTML && tileArray[4].innerHTML && tileArray[7].innerHTML === "X")
      {
        console.log("X has won");
      }
      else if (tileArray[2].innerHTML && tileArray[5].innerHTML && tileArray[8].innerHTML === "X")
      {
        console.log("X has won");
      }
      else if (tileArray[0].innerHTML && tileArray[4].innerHTML && tileArray[8].innerHTML === "X")
      {
        console.log("X has won");
      }
      else if (tileArray[2].innerHTML && tileArray[4].innerHTML && tileArray[6].innerHTML === "X")
      {
        console.log("X has won");
      }
      else
      {
        console.log("No match")
      }

      /*

      for(var i = 0; i <= tileArray.length; i++)
      {
        tileArray[i]
      }

      */
  }
}
})
();
