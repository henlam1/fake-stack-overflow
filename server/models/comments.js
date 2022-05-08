// Comment Document Schema

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  text: {type: String, required: true, minlength: 1, maxlength: 140},
  com_by: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  com_date_time: {type: Date, default: Date.now()},
});

//Export model
module.exports = mongoose.model("Comment", CommentSchema)