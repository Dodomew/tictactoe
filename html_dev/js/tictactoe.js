/*

- Write the `populate` function to populate the table according to the game state.
- Write the `nextPlayer` function to determine which player should go next based on the state of the game, assuming that "x" always goes first. Return "x" or "o".
- Write the `findWinner` function to determine whether there is a winner in the current game. Return "x" or "o" if there is a winner, and `null` if there is not.
- Imagine a 4 x 4 board where a player wins by connecting three positions -- how would your solutions change?
- How would your solutions change to adapt to arbitrary board sizes and arbitrary requirements for the number of positions that must connect?
  For example, consider an 8x8 board where four of a player's pieces must connect.

*/

'use strict';

// Listen to which tile gets clicked
document.addEventListener('click', function objectFinder(event)
{
  let e = window.event || event;
  let targetId = e.srcElement.id;
  let targetClass = e.srcElement.className.split(" ")[0]; // http://stackoverflow.com/questions/11606897/get-only-first-class-of-an-html-element
  console.log(e.target);

  if(targetClass === "tile")
  {
    // console.log(targetClass);
    for (var i = 0; i < targetClass.length; i++)
    {
      if(targetClass[i].innerHTML == "")
      {
        console.log("tile is empty")
      }
      else
      {
          console.log("tile is not empty")
      }
    }
  }

}), false;

var state = [['x', 'o', null], ['x', 'x', 'o'], ['o', 'x', null]];

function populate(board)
{

}

function nextPlayer(board)
{

}

function findWinner(board)
{

}
