let Question = require('../models/questions');
let Tag = require('../models/tags');
let Answer = require('../models/answers');
const { default: mongoose } = require('mongoose');

function get_questions () {
  return Question.find()
  .sort({ask_date_time : -1})
  .populate('tags')
  .populate('asked_by')
  .populate('comments');
}
  
exports.show_questions = async (searchItems) => {
  let questions = await get_questions();
  console.log(searchItems)
  if(searchItems === ""){
    return questions;
  }
  else{
    const titles = [];
    const tags = [];

    for(item of searchItems){
      var length = item.length
      if(item.charAt(0) == "[" && item.charAt(length - 1) == "]"){
        tags.push(item.substring(1, length - 1))
      }
      else{
        titles.push(item)
      }
    }

    const filtered = questions.filter(question => { //Filters by title includes substring/tag
      return (titles.some(title => {return question.title.toLowerCase().includes(title)}) || 
      (question.tags.some(tag => {return tags.includes(tag.name)})))
    })
    return filtered;
  }
}

function get_questions_By_TagID (tag_id){
  return Question.find({tags: tag_id})
}

exports.searchID = async (tag_id) => {
  let questions = await get_questions_By_TagID(tag_id);
  return questions;
}

function get_answers(q_id, stringBool) {
  const increment = (stringBool == "false") ? false : true;
  if(increment){
    return Question.findByIdAndUpdate(q_id, {$inc: {views: 1}}, {new: true})
    .populate('asked_by')
    .populate('answers')
    .populate({ 
      path: 'answers',
      populate: {
        path: 'ans_by',
        model: 'User'
      } 
    })
    .populate({ 
      path: 'answers',
      populate: {
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'com_by',
          model: 'User'
        }
      } 
    })
    .populate('comments')
    .populate({ 
      path: 'comments',
      populate: {
        path: 'com_by',
        model: 'User'
      } 
    });
  }
  else{
    return Question.findById(q_id)
    .populate('asked_by')
    .populate('answers')
    .populate({ 
      path: 'answers',
      populate: {
        path: 'ans_by',
        model: 'User'
      } 
    })
    .populate({ 
      path: 'answers',
      populate: {
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'com_by',
          model: 'User'
        }
      } 
    })
    .populate('comments')
    .populate({ 
      path: 'comments',
      populate: {
        path: 'com_by',
        model: 'User'
      } 
    });
  }
}

exports.show_answers = async (q_id, increment) => {
  let question = await get_answers(q_id, increment).populate('tags');
  const answers = [];
  question.answers.forEach(answer => {
    answers.push(answer)
  })
  return [question, answers];
}

function edit_vote(q_id, bool){
  const increment = (bool == "false") ? false : true;
  if(increment){
    return Question.findByIdAndUpdate(q_id, {$inc: {votes: 1}}, {new: true})
    .populate('tags')
    .populate('asked_by')
    .populate('answers')
    .populate({ 
      path: 'answers',
      populate: {
        path: 'ans_by',
        model: 'User'
      } 
    })
    .populate({ 
      path: 'answers',
      populate: {
        path: 'comments',
        model: 'Comment'
      } 
    })
    .populate('comments')
    .populate({ 
      path: 'comments',
      populate: {
        path: 'com_by',
        model: 'User'
      } 
    });
  }
  else{
    return Question.findByIdAndUpdate(q_id, {$inc: {votes: -1}}, {new: true})
    .populate('tags')
    .populate('asked_by')
    .populate('answers')
    .populate({ 
      path: 'answers',
      populate: {
        path: 'ans_by',
        model: 'User'
      } 
    })
    .populate({ 
      path: 'answers',
      populate: {
        path: 'comments',
        model: 'Comment'
      } 
    })
    .populate('comments')
    .populate({ 
      path: 'comments',
      populate: {
        path: 'com_by',
        model: 'User'
      } 
    });
  }
}

exports.change_vote = async(q_id, bool) => {
  let question = await edit_vote(q_id, bool);
  return question;
}

function get_questions_By_UserID (user_id){
  return Question.find({asked_by: user_id})
  .sort({ask_date_time : -1})
  .populate('tags')
  .populate('asked_by')
}

exports.search_By_UserID = async (user_id) => {
  let questions = await get_questions_By_UserID(user_id);
  return questions;
}