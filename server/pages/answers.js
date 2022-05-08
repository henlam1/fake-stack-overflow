let Answer = require('../models/answers');

function edit_vote(a_id, bool){
    const increment = (bool == "false") ? false : true;
    if(increment){
      return Answer.findByIdAndUpdate(a_id, {$inc: {votes: 1}}, {new: true})
      .populate('ans_by')
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
      return Answer.findByIdAndUpdate(a_id, {$inc: {votes: -1}}, {new: true})
      .populate('ans_by')
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
  
exports.change_vote = async(a_id, bool) => {
  let answer = await edit_vote(a_id, bool);
  return answer;
}

function get_answers_By_UserID (user_id){
  return Answer.find({ans_by: user_id})
  .sort({ask_date_time : -1})
  .populate('ans_by')
}

exports.search_By_UserID = async (user_id) => {
  let answers = await get_answers_By_UserID(user_id);
  return answers;
}