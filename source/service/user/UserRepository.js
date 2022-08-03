const { User, Account } = require("../../commons/models/mongo/mongodb");
const mongoose = require('mongoose');


function Repository () {}

Repository.prototype.deleteAccount = async function(_id) {
  await User.remove({_id});
  await Account.remove({_id});
  return true;
}

Repository.prototype.findUserByMobile = async function(mobile) {
  return User.findOne({ mobile: mobile }).exec();
}

Repository.prototype.findUserByEmail = async function(email) {
  return User.findOne({ email }).exec();
}
Repository.prototype.createUserWithMobile = async function(userObj) {
  
  const user = new User(); 
  const account = new Account();

  const accountId = new mongoose.Types.ObjectId().toHexString();

  user._id = account._id = accountId;
  user.mobile = account.mobile = userObj.mobile;
  user.email = account.email = userObj.email;
  account.firstName = userObj.firstName;
  account.lastName = userObj.lastName;
  account.fullName = userObj.name;
  user.password = userObj.password;
  user.updatedAt = new Date();
  user.devices= userObj.devices

  // PermissionTemplate Loading 
  // user.apps = PermissionTemplate.apps;

  await user.save();
  await account.save();

  return accountId;
}

module.exports = new Repository();