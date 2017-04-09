var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hardSudokuSchema = new Schema
(
	{
		sudoku: String
	}
);


mongoose.model('hardSudoku', hardSudokuSchema);