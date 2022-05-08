// Question Document Schema

var mongoose = require("mongoose");
const {TagSchema} = require("./tags").schema;
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  title: {type: String, required: true, minlength: 1, maxlength: 50},
  summary: {type: String, required: true, minlength: 1, maxlength: 140},
  text: {type: String, required: true, minlength: 1},
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag', minlength: 1}],  //Refers to actual object
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  asked_by: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  ask_date_time: {type: Date, default: Date.now()},
  views: {type: Number, default: 0},
  votes: {type: Number, default: 0},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
});

// Virtual for question's URL
QuestionSchema
.virtual('url')
.get(function () {
  return 'posts/question/' + this._id;
});

//Export model
module.exports = mongoose.model("Question", QuestionSchema)