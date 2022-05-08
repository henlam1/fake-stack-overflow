//User Document Schema

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  user: {type: String, required: true, minlength: 1},
  email: {type: String, required: true, minlength: 1},
  password: {type: String, required: true, minlength: 1},
  reputation: {type: Number, default: 0},
  create_date_time: {type: Date, default: Date.now()},
});

//Export model
module.exports = mongoose.model("User", UserSchema)