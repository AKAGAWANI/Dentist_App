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

module.exports = new Repository();