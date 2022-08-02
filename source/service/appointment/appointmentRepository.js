const {
    Appointment,User
  } = require('../../commons/models/mongo/mongodb');
  
  function Repository() {}
  
  Repository.prototype.getAppointmentById = async function (appointmentId) {
    const instance = await Appointment.findOne({ _id: appointmentId }, { apps: 1 }).exec();
    return instance ? instance.toJSON() : null;
  }
  
  Repository.prototype.getAllAppointment = async function (query) {
    const instance = await Appointment.find(query).exec();
    return instance.length>0 ? instance : [];
  },

  Repository.prototype.createDoc = async function (data) {
    const instance = await new Appointment(data).save()
    return instance ? instance.toJSON() : null;
};

Repository.prototype.updateUserById = async function(userId, data) {
  return await User.updateOne({
    _id: userId
  }, data,
  {new:true});
}

  
  module.exports = new Repository();