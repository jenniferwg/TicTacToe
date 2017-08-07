let initialBoard = [
  0, 0, 0,
  0, 0, 0,
  0, 0, 0
];
let initialTurn = 'X';
let currentBoard = initialBoard;
let currentTurn = 'X';

checkWin = function() {
  return false;
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

$('button').on('click', function(e) {
  newGame();
});

$('td').on('click', function(e) {
  $(e.target).text(currentTurn);
  const row = $(e.target).data('row');
  const col = $(e.target).data('col');
  currentBoard[row, col] = currentTurn;

  if (checkWin()) {
    $('.status').text(`Player ${currentTurn} wins!`);
  } else {
    currentTurn = currentTurn === 'X' ? 'O' : 'X';
    $('.status').text(`Player ${currentTurn}'s turn!`);
  }
});