require("dotenv");
const repository = require("./termsRepository");

function Service() {}

Service.prototype.getAllTerms = async function (query) {
  return repository.getTermsData(query);
};

Service.prototype.addTermsData = async function (req) {
    let obj={
        _id:new mongoose.Types.ObjectId().toHexString(),
        updatedAt:new Date(),
        createdAt: new Date(),
        termsncondition:req.termsncondition,
      }
  return repository.createTerms(obj);
};

Service.prototype.updateTerms = async function(data) {
  return repository.updateAccoutTerms(data);
};

module.exports = new Service();