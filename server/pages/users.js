let User = require('../models/users');

function get_user_by_Email (email){
    return User.find({email: email})
}
  
exports.is_emailUsed = async (email) => {
    let user = await get_user_by_Email(email);
    if(user.length > 0){
        return true;
    }
    return false;
}

exports.get_user = async (email) => {
    let user = await get_user_by_Email(email);
    return user[0];
}

function change_rep (u_id, bool){
    const increment = (bool == "false") ? false : true;
    if(increment){
        return User.findByIdAndUpdate(u_id, {$inc: {reputation: 5}}, {new: true})
    }
    else{
        return User.findByIdAndUpdate(u_id, {$inc: {reputation: -10}}, {new: true})
    }
}

exports.update_rep = async (u_id, bool) => {
    let user = change_rep(u_id, bool)
    return user;
}