/*
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
console.log(puzzle)
console.log(JSON.stringify(puzzle))
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
*/

var sudoku = require('sudoku')
var puzzle = "500690001007004908089205006090050400805040103043806009058461002400000015910080034"  //for testing, pol bomo z base pobirali
//spravi v vredi format - 1d array, prazno je null
var cor_puzz = []
for (var i = 0; i < puzzle.length; i++) {
	var ch = puzzle.charAt(i)
	if(ch == "0"){
		cor_puzz.push(null)
	}else{
		cor_puzz.push(parseInt(ch) - 1)
	}
}

var solved = sudoku.solvepuzzle(cor_puzz)

//dajmo nazaj v non dumb format
var c=0
for (var i = 0; i < cor_puzz.length; i++) {
	++solved[i]
	if(cor_puzz[i] != null){
		++cor_puzz[i]
		if(solved[i] != cor_puzz[i])
			++c
	}

}
console.log("C: " + c)
console.log(JSON.stringify(cor_puzz))
console.log(JSON.stringify(solved))