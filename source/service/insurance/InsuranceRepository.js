const { Insurance } = require("../../commons/models/mongo/mongodb");
const mongoose = require('mongoose');

function Repository () {}

Repository.prototype.createInsurance = async function (dataObj) {
    const insurance = new Insurance();
    const insuranceId = new mongoose.Types.ObjectId().toHexString();

    insurance._id = insuranceId;
    insurance.logo = dataObj.logo;
    insurance.name = dataObj.name;

    await insurance.save();

    return insuranceId;

}

Repository.prototype.getAllInsurance = async function() {
    let data = await Insurance.find().exec();
    return data;
}

module.exports = new Repository();
