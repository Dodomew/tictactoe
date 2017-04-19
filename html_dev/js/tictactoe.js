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
      /*
      if(checkWhoIsNext() == 0)
      {
        tileInnerText.innerHTML = "O";
      }
      else
      {
        tileInnerText.innerHTML = "X";
      }*/
    }

  }),
  false;

  var state = [['x', 'o', null], ['x', 'x', 'o'], ['o', 'x', null]];

  var turnCounter = 0;
  function checkWhoIsNext(clickedElement)
  {
    if(turnCounter % 2 == 0 || turnCounter == 0)
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
    console.log(turnCounter);
    return(turnCounter);
  }

  function populate(board)
  {

  }

  function nextPlayer(board)
  {

  }

  function findWinner(board)
  {

  }

})
();
