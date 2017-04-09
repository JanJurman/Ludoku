var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hardSudokuSchema = new Schema
(
	{
		sudoku: [Number]
	}
);


mongoose.model('hardSudoku', hardSudokuSchema);