/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */


let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
   for (let y=0; y<HEIGHT; y++) {
     board[y] = []; 
     for (let x=0; x<WIDTH; x++) {
       board[y][x] = undefined;
     }
   }
 }
//  const board = [
//   [ 0-0, 0-1, 0-2, 0-3, 0-4, 0-5, 0-6 ],
//   [ 1-0, 1-1, 1-2, 1-3, 1-4, 1-5, 1-6 ],
//   [ 2-0, 2-1, 2-2, 2-3, 2-4, 2-5, 2-6 ],
//   [ 3-0, 3-1, 3-2, 3-3, 3-4, 3-5, 3-6 ],
//   [ 4-0, 4-1, 4-2, 4-3, 4-4, 4-5, 4-6 ],
//   [ 5-0, 5-1, 5-2, 5-3, 5-4, 5-5, 5-6 ],
// ];
/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" letiable from the item in HTML w/ID of "board".... what in the world is ""letiable"""??
  const htmlBoard = document.getElementById('board');
    
  //create the first row of the document that allows the player to click in desired column
    // TODO: add comment for this code
  let top = document.createElement("tr"); //creates element <tr>
  top.setAttribute("id", "column-top");  // sets attribute to #column-top
  top.addEventListener("click", handleClick); //creates an eventlistener for top row

  for (let x = 0; x < WIDTH; x++) {  //for loop dynamically creates cells for top of columns
    let headCell = document.createElement("td"); // creates element <td> as <tr> child
    headCell.setAttribute("id", x); // <dynamically adds id === x
    top.append(headCell); // appends the new ids to the tags
  }
  htmlBoard.append(top); //adds the elements to the DOM

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) { // for loop to create rows 0--->5
    const row = document.createElement("tr"); 
    for (let x = 0; x < WIDTH; x++) {  //for loop to create columns 0---->6 (cells)
      const cell = document.createElement("td"); //creates elements with <td> tag
      cell.setAttribute("id", `${y}-${x}`); //sets attribute dynamically based on cell position
      row.append(cell); //appends element to parent <tr>
    }
    htmlBoard.append(row); //creates element in the DOM
  }


/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  // let spot = 0;
  for (let y = HEIGHT-1; y>=0; y--) {
    if (!board[y][x]) {
      return y;
      }
    }
    return null; 
 //return 0;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {  //HTML update of table board (not in memory)
  let piece = document.createElement("div"); 
  piece.classList.add('piece'); 
  piece.classList.add(`p${currPlayer}`);

  let cellLocation = document.getElementById(`${y}-${x}`);
  cellLocation.append(piece);  // appends piece to the div
}

/** endGame: announce game end */

function endGame(msg) {
  return alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer; 



  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  board.every(function(value) {
    if (value === null) {
      return endGame('The game is a tie'); 
    }
    
    return; 
  })

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //win horizonta
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; //win vertical
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; //win diagonal right
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; //win diagonal left

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

