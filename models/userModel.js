//Importing modules.
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Account = require('../models/accountModel');

const userSchema = mongoose.Schema({
  social: {
    google: {
      id: String,
      name: String,
      given_name: String,
      family_name: String,
      picture: String,
      email: String,
      email_verified: Boolean,
      locale: String
    },
    facebook: {
      id: String,
      name: String,
      picture: String,
      email: String,
      email_verified: Boolean,
      locale: String
    },
    twitter: {
      id: String,
      picture: String,
      email: String,
      email_verified: Boolean,
      locale: String,
      access_token: String,
      refresh_token: String
    }
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: Date,
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'Please provide a valid email address.']
  },
  mobile: {
    type: String,
    min: [10, 'Minimum length should be 10 without country code.'],
    max: [13, 'Maximum length must be less than 14 with country code.']
  },
  password: {
    type: String,
    required: true,
    minLength: [8, 'Password length should be greater than 8 characters'],
    select: false
  },
  passwordOtp: String,
  otpExpiry: Date,
  appType: [String],
  apps: [
    {
      appTypeId: String,
      userRoleId: String,
      backEndAssets: [Object]
    }
  ],
  concessionareCode: [String],
  devices: [
    {
      deviceId: String,
      deviceActive: Boolean
    }
  ],
  account: { type: mongoose.Schema.Types.ObjectId, ref: Account },
  token: Object,
  partner: {
    r360: {
      token: Object,
      status: {
        membership: Object
      }
    }
  }
});

const User = mongoose.model('users', userSchema);

//Document middlewares

//to update the password.
userSchema.pre('save', async function(next) {
  this.updatedAt = Date.now();
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = User;
