const mongoose = require('mongoose');
const { crypto, datetime } = require('./../../../util/UtilManager');

const DoctorSchema = mongoose.Schema({
  _id: { type: String },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: Date,
  firstName: String,
  lastName: String,
  qualification: String,

  location: String,
  availability: [
    {
      day: {
        type: String,
        enum: {
          values: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thrusday',
            'Friday',
            'Saturday',
            'Sunday'
          ],
          message: `Only Monday, Tuesday, Wednesday, Thrusday, Friday, Saturday and Sunday are allowed.`
        }
      },
      slot: [{ time: String, isAvailable: Boolean }] //This will contains time like {time:"2:00 PM",isAvailable:1} or {time:"9:30 AM",isAvailable:1}.
    }
  ],

  location: {
    _id: String,
    flatNo: Number,
    city: String,
    district: String,
    state: String
  },

  problem: [
    {
      _id: String,
      problemName: String,
      displayName: String,
      icons: [String]
    }
  ],
  test: [
    {
      _id: String,
      testName: String,
      description: String,
      icons: [String],
      displayName: String
    }
  ],
  review: [
    {
      _id: String,
      reviewDescription: String,
      reviewRating: Number,
      reviewedUserId: String,
      reviewedUserName: String,
      reviewedUserMail: String,
      reviewedUserMobile: String,
      reviewedDate: Date,
      comments: [
        {
          commentDescription: String,
          commentedUserId: String,
          commentedUserName: String,
          commentedUserMail: String,
          commentedDate: Date
        }
      ]
    }
  ]
});

//Adding middlewares
DoctorSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  this.firstName = crypto.encrypt(this.firstName);
  this.lastName = crypto.encrypt(this.lastName);
  next();
});

// export model user with DoctorSchema
module.exports = mongoose.model('Doctors', DoctorSchema, 'Doctors');
