const { User, Account } = require("../../commons/models/mongo/mongodb");
const mongoose = require('mongoose');


function Repository () {}

Repository.prototype.deleteAccount = async function(_id) {
  await User.remove({_id});
  await Account.remove({_id});
  return true;
}

Repository.prototype.createUser = async function(userObj) {
  let user =await new User(userObj).save()
  let account=await new Account(userObj).save()

  return user._id
}

Repository.prototype.getUser = async function(query) {
  const model = User;
  let user = model.find(query);

  return user ? user : null;
}

module.exports = new Repository();