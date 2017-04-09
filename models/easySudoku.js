var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var easySudokuSchema = new Schema
(
	{
		sudoku: String
	}
);


mongoose.model('easySudoku', easySudokuSchema);