const Account = require('./documents/account');
const User = require('./documents/user');
const Problem = require('./documents/problem');
const Test = require('./documents/test');
const Doctor = require('./documents/doctor');
const Consultation = require('./documents/consulatation');
const Banner = require("./documents/banner");
const Insurance   = require('./documents/insurance');
const Problems     = require('./documents/problemModel')
const Appointment=require("./documents/appointment")
const Policy = require("./documents/policy")


module.exports = {
  Account,
  User,
  Problem,
  Test,
  Doctor,
  Appointment,
  Consultation,
  Banner,
  Insurance,
  Problems,
  Policy
};
