var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var easySudokuSchema = new Schema
(
	{
		sudoku: [Number]
	}
);


mongoose.model('easySudoku', easySudokuSchema);