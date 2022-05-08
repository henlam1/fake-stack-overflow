// Answer Document Schema

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
  text: {type: String, required: true, minlength: 1},
  ans_by: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  ans_date_time: {type: Date, default: () => Date.now()},
  votes: {type: Number, default: 0},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
});

// Virtual for answer's URL
AnswerSchema
.virtual('url')
.get(function () {
  return 'posts/answer/' + this._id;
});

//Export model
module.exports = mongoose.model("Answer", AnswerSchema)