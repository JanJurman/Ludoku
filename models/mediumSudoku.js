var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mediumSudokuSchema = new Schema
(
	{
		sudoku: String
	}
);


mongoose.model('mediumSudoku', mediumSudokuSchema);