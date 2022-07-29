const mongoose = require("mongoose");
const { crypto, datetime } = require("./../../../util/UtilManager");

const DoctorSchema = mongoose.Schema({
  _id: { type: String },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  firstName: String,
  lastName: String,
  qualification: String,
  location: String,
  problem: [
    {
      _id: String,
      problemName: String,
      displayName: String,
      icons: [String],
    },
  ],
  test: [
    {
      _id: String,
      testName: String,
      description: String,
      icons: [String],
      displayName: String,
    },
  ],
  review:[
    {
      _id : String,
      reviewDescription: String,
      reviewRating: Number,
      reviewedUserId: String,
      reviewedUserName:String,
      reviewedUserMail:String,
      reviewedUserMobile:String,
      reviewedDate: Date,
      comments:[
        {
          reviewComment: String,
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
DoctorSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  this.firstName = crypto.encrypt(this.firstName);
  this.lastName = crypto.encrypt(this.lastName);
  next();
});

// export model user with DoctorSchema
module.exports = mongoose.model("Doctors", DoctorSchema, "Doctors");
