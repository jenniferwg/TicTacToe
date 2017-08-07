let initialBoard = [
  [ 0, 0, 0 ],
  [ 0, 0, 0 ],
  [ 0, 0, 0 ]
];
let initialTurn = 'X';
let currentBoard = initialBoard;
let currentTurn = 'X';

checkWin = function() {
  let won = false;

  for (let i = 0; i < 3; i++) {
    //horizontal win
    const currentRow = currentBoard[i].reduce((accum, cur) => accum + cur, '');

    //vertical win
    const cols = [];
    currentBoard.forEach(col => { cols.push(col[i]); });
    const currentCol = cols.reduce((accum, cur) => accum + cur, '')

    if (currentTurn.repeat(3) === currentRow || currentTurn.repeat(3) === currentCol) {
      won = true; 
    }
  }

  if (won === false) {
    //diagonal win
    let col = 0;
    let downDiag = currentBoard.reduce((accum, row) => {
      col++;
      return accum + row[col - 1];
    }, '');
    let upDiag = currentBoard.reduce((accum, row) => {
      col--;
      return accum + row[col];
    }, '');
    if (currentTurn.repeat(3) === upDiag || currentTurn.repeat(3) === downDiag) {
      won = true; 
    }
  }

  return won;
};

newGame = function() {
  currentBoard = initialBoard;
  initialTurn = initialTurn === 'X' ? 'O' : 'X';
  currentTurn = initialTurn;
  for (let i = 0; i < $('td').length; i++) {
    $($('td')[i]).text('');
  }
  $('.status').text(`Player ${currentTurn}'s turn!`);
};

//event handlers
$('button').on('click', function(e) {
  newGame();
});

$('td').on('click', function(e) {
  $(e.target).text(currentTurn);
  const row = $(e.target).data('row');
  const col = $(e.target).data('col');
  currentBoard[row][col] = currentTurn;

  if (checkWin()) {
    $('.status').text(`Player ${currentTurn} wins!`);
  } else {
    currentTurn = currentTurn === 'X' ? 'O' : 'X';
    $('.status').text(`Player ${currentTurn}'s turn!`);
  }
});