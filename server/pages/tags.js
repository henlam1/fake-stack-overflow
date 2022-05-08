let Tag = require('../models/tags');
let Questions = require('./questions');

function get_tags () {
  return Tag.find();
}
  
exports.show_tags = async () => {
  let tags = await get_tags();
  const tagCount = [];

  for(const tag of tags){
    const count = await Questions.searchID(tag._id);
    tagCount.push(count.length)
  }
  return [tags, tagCount];
}

function get_tags_By_UserID (user_id){
  return Tag.find({created_by: user_id})
  .sort({ask_date_time : -1})
}

exports.search_By_UserID = async (user_id) => {
  let tags = await get_tags_By_UserID(user_id);
  return tags;
}
  