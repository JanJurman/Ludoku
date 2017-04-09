var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mediumSudokuSchema = new Schema
(
	{
		sudoku: [Number]
	}
);


mongoose.model('mediumSudoku', mediumSudokuSchema);