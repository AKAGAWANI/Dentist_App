const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  _id: { type: String },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  patientName: String,
  patientAge: String,
  scheduleDate: Date,
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
docterId:{type:String},
userId:{type:String},
  status: {
    type: String,
    enum: ["ACTIVE", "DELETED", "BLOCKED"],
    default:"ACTIVE"
  },
  appointmentType: {
    type: String,
    enum: ["VIDEO_CALL", "VOICE_CALL", "VISIT_CLINIC"]
  }
});
appointmentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// export model user with AppointmentSchema
module.exports = mongoose.model('appointments', appointmentSchema, 'appointments');
