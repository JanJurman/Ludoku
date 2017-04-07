var sudoku = require('sudoku');

function printboard(board) {
	var out = '';

	for (var row = 0; row < 9; row++) {
		for (var col = 0; col < 9; col++) {
			out += [""," "," ","  "," "," ","  "," "," "][col];
      		out += printcode(board[sudoku.posfor(row, col)]);
		}
		out += ['\n','\n','\n\n','\n','\n','\n\n','\n','\n','\n'][row];
	}

	return out;
}

function printcode(n) {
	if (n == null) {
		return '_';
	}

	return n + 1 + '';
}


var puzzle = sudoku.makepuzzle();

console.log(printboard(puzzle))

var solution = sudoku.solvepuzzle(puzzle);

console.log(printboard(solution))

//kolko naprej morš misliti,
// 0 do 1.5 = easy
// 1.5 do 3 = med
// 3+ je hard
// 4.5 + izločimo
var difficulty = sudoku.ratepuzzle(puzzle, 4);

console.log(difficulty)
