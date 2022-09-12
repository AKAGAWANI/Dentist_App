const { Insurance, Insurancesubmission} = require("../../commons/models/mongo/mongodb");


function Repository () {}

/********************* DOCTOR'S REPO ***********************/


Repository.prototype.createInsurance= async function (dataObj) {
   let modelName = Insurance;
    const instance = await modelName.create(dataObj);
    return instance;

}
Repository.prototype.add= async function (dataObj) {
   let modelName =Insurancesubmission
    const instance = await modelName.create(dataObj);
    return instance;

}

Repository.prototype.getAllInsurance = async function() {
    let data = await Insurance.find().exec();
    return data;
}

module.exports = new Repository();
