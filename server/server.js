// Application server

// https://www.sitepoint.com/javascript-typescript-orms/#knexjssqlquerybuilder

// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.

// cd C:\Users\henry\Github Stuff\final-project-henlam1\server
// mongod
// New CMD
// cd C:\Users\henry\Github Stuff\final-project-henlam1\server
// npm run devStart
// OR
// nodemon server mongodb://127.0.0.1:27017/fake_so
// NEW CMD
// cd C:\Users\henry\Github Stuff\final-project-henlam1\client
// npm start

//Database Access
let Questions = require('./pages/questions');
let Tags = require('./pages/tags');
let Answers = require('./pages/answers');
let Users = require('./pages/users');

//Model Access
let Question = require('./models/questions');
let Tag = require('./models/tags');
let Answer = require('./models/answers');
let User = require('./models/users');
let Comment = require('./models/comments');

//Express and Cookies Stuff
const fs = require('fs');
const path = require('path');
const express = require('express');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const app = express();
var cors = require('cors')
const port = 8000;

//Bcrpyt STuff
const bcrypt = require('bcrypt');

//Email Validation
const validator = require("email-validator");

//Mongoose Stuff
const mongoose = require("mongoose")
let mongoDB = "mongodb://127.0.0.1:27017/fake_so";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const MongoStore = require("connect-mongo");
const tags = require('./models/tags');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('connected', function() {
  console.log("Database connected!")
})

process.on('SIGINT', () => {
  console.log('Server closed. Database instance disconnected');
})  

//Running Processes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "secret to sign session cookie",  //ASK ABOUT THIS
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false, 
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/fake_so', //YOUR MONGODB URL
      ttl: oneDay,
      autoRemove: 'native' 
  })
}));

//WELCOME PAGE
app.post("/login", async (req, res) => {
  var error = 0;
  var emailExists = await Users.is_emailUsed(req.body.email);
  var username = "";

  if(!emailExists) error = 1  //Email DNE
  else{
    var user = await Users.get_user(req.body.email)
    const match = await bcrypt.compare(req.body.password, user.password)
    if(!match) error = 2; //Wrong PW
    else {
      req.session.user = user.user
      username = user.user
    }
  }
  res.send([error + "", user])
})

app.post("/register", async (req, res) => {
  // req.session.user = req.body.user HOW TO SAVE SESSIONS
  console.log(req.body)
  var error = 0;
  var emailId = req.body.email.split("@")[0];
  var emailExists = await Users.is_emailUsed(req.body.email);

  if(req.body.user.length === 0) error = 1  //User length 0
  else if(!validator.validate(req.body.email)) error = 2 //Invalid email
  else if(req.body.password !== req.body.confirmPassword) error = 3  //Passwords dont match
  else if(req.body.password.includes(emailId) || req.body.password.includes(req.body.user)) error = 4 //Password contains username/email
  else if(emailExists) error = 5  //Email in use
  else {
    bcrypt.genSalt().then(salt => {
      bcrypt.hash(req.body.password, salt).then(hash => {
        let createUser = {
          user: req.body.user,
          email: req.body.email,
          password: hash,
        }
        let user = new User(createUser);
        user.save();
      })
    }) 
  }
  res.send(error + "")
})

app.post("/guest", (req,res) => {
  const user = {
    user: "guest"
  }
  req.session.user = "guest"
  res.send(user)
})

app.post("/logout", async (req, res) => {
  req.session.destroy(err => {
    if(err){
      res.send(err)
    }
    else{
      res.send("Logged out")
    }
  })
})

//GETTERS
app.get('/main/question', (req, res) => {
  console.log("SHOWING QUESTIONS");
  let questions = Questions.show_questions(req.query.searchItems)
  .then((results) => {
    console.log(results)
    res.send(results)
  })
})

app.get('/main/tag', (req, res) => {
  console.log("SHOWING TAGS");
  let tags = Tags.show_tags()
  .then((results) => {
    res.send(results)
  })
})

app.get('/main/answer', (req, res) => {
  console.log("SHOWING ANSWERS");
  let answers = Questions.show_answers(req.query.params[0], req.query.params[1])
  .then((results) => {
    res.send(results)
  })
})

app.get('/main/vote', (req, res) => {
  console.log("CHANGING VOTE")
  let type = req.query.params[0];
  let typeId = req.query.params[1];
  let increment = req.query.params[2];
  let u_id = req.query.params[3];
  var userAndThing = [];

  if(type === "question"){
    Users.update_rep(u_id, increment)
    .then((results) => {
      userAndThing.push(results)
      Questions.change_vote(typeId, increment)
      .then((results) => {
        userAndThing.push(results)
        res.send(userAndThing)
      })
    })
  }
  else if(type === "answer"){
    Users.update_rep(u_id, increment)
    .then((results) => {
      userAndThing.push(results)
      Answers.change_vote(typeId, increment)
      .then((results) => {
        userAndThing.push(results)
        console.log(userAndThing)
        res.send(userAndThing)
      })
    })
  }
})

app.get('/main/userStuff', (req, res) => {
  let userId = req.query.params[0]
  let type = req.query.params[1]

  if(type === "Questions"){
    Questions.search_By_UserID(userId)
    .then((results) => {
      console.log(results)
      res.send(results)
    })
  }
  if(type === "Tags"){
    Tags.search_By_UserID(userId)
    .then((results) => {
      console.log(results)
      res.send(results)
    })
  }
  if(type === "Answers"){
    Answers.search_By_UserID(userId)
    .then((results) => {
      console.log(results)
      res.send(results)
    })
  }
})

//SETTERS
app.post('/main/addTag', async (req, res) => {
  let tag = "";
  console.log(req.body)
  tag = await Tag.find({name: req.body.tag.name}).exec();
  if(tag.length === 0){
    if(req.body.highRep){
      console.log("CREATED TAG");
      tag = await new Tag(req.body.tag);
      await tag.save();
    }
    else{
      tag = "";
    }
  }
  else{
    console.log("DUPLICATE FOUND");
    tag = tag[0];
  }
  console.log(tag)
  res.send(tag);
})

app.post('/main/addQuestion', async (req, res) => {
  console.log("CREATED QUESTION");
  let r = req.body
  let user = await Users.get_user(r.asked_by_email)
  const newQuestion = {
    title: r.title,
    summary: r.summary,
    text: r.text,
    tags: r.tags,
    answers: r.answers,
    asked_by: user,
    ask_date_time: r.ask_date_time,
  }
  let question = await new Question(newQuestion);
  await question.save();
  res.send(question);
})

app.post('/main/addAnswer', async (req, res) => {
  console.log("CREATED ANSWER");
  console.log(req.body)

  let answer = await new Answer(req.body.answer);
  await answer.save();
  await Answer.populate(answer, {path: 'ans_by', select: 'user'}).then(
    (res) => {
      console.log(res)
    }
  )

  let question = await Question.findById(req.body.q_id).exec();
  question.answers.push(answer);
  await question.save();

  res.send(answer);
})

app.post('/main/addComment', async (req, res) => {
  console.log("CREATED COMMENT");

  let type = req.body.type;
  let thing_id = req.body.thing_id

  let comment = await new Comment(req.body.comment);
  await comment.save();

  if(type === "question"){
    let question = await Question.findById(thing_id).exec();
    question.comments.push(comment);
    await question.save();
    res.send(question);
  }
  else{
    let answer = await Answer.findById(thing_id).exec();
    await Answer.populate(answer, {path: 'com_by', select: 'user'})
    answer.comments.push(comment);
    await answer.save();
    res.send(answer);
  }
})

//DELETERS
app.delete('/main/deleteUserStuff', async (req, res) => {
  console.log("DELETED THING")
  let type = req.query.params[0]
  let thing_id = req.query.params[1]
  if(type === "Questions"){
    Question.findByIdAndDelete(thing_id)
      .then(removedQuestion => {
        let answers = removedQuestion.answers;
        for(let i = 0; i < answers.length; i++){
          Answer.findByIdAndDelete(answers[i]._id)
            .then(removedAnswer => {
              console.log("Removed Answer: " + removedAnswer)
            })
        }
        let tags = removedQuestion.tags;
        for(let i = 0; i < tags.length; i++){
          Tag.findByIdAndDelete(tags[i]._id)
            .then(removedTag => {
              console.log("Removed Answer: " + removedTag)
            })
        }
        res.send(removedQuestion)
      })
  }
  if(type === "Tags"){
    await Tag.findByIdAndDelete(thing_id)
      .then(removedTag => {
        res.send(removedTag)
      });
  }
  if(type === "Answers"){
    await Answer.findByIdAndDelete(thing_id)
      .then(removedAnswer => {
        res.send(removedAnswer)
      });
  }
})

//UPDATERS
app.post('/main/updateQuestion', async (req, res) => {
  console.log("UPDATED QUESTION")
  let question = req.body.question
  let q_id = req.body.q_id

  await Question.findById(q_id).exec()
    .then(qFound => {
      qFound.title = question.title
      qFound.summary = question.summary
      qFound.text = question.text
      qFound.tags = question.tags
      qFound.save()
    })
  res.send("Question Updated")
})
app.post('/main/updateTag', async (req, res) => {
  console.log("UPDATED TAG")
  let tag = req.body.tag
  let t_id = req.body.t_id
  await Tag.findById(t_id).exec()
    .then(tFound => {
      tFound.name = tag.name
      tFound.save()
    })
  res.send("Tag Updated")
})
app.post('/main/updateAnswer', async (req, res) => {
  console.log("UPDATED ANSWER")
  let answer = req.body.answer
  let a_id = req.body.a_id
  await Answer.findById(a_id).exec()
    .then(aFound => {
      aFound.text = answer.text
      aFound.save()
    })
  res.send("Answer Updated")
})