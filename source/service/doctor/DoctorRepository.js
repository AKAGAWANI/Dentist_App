const { Problem, Test, Doctor } = require("../../commons/models/mongo/mongodb");

function Repository() {}

/********************* DOCTOR'S REPO ***********************/

/******************** PROBELM REPO *********************/

/******************** TEST REPO *********************/

/********************** COMMON REPO ******************/
//creating document
Repository.prototype.createDocument = async function (data, modelName) {
  console.log(".modelName", modelName);
  modelName = modelName === "Problem" ? Problem : modelName === "Test" ? Test : Doctor;
  console.log(".modelName", modelName);

  const instance = await modelName.create(data);
  return instance ? instance.toJSON() : null;
};

//used to get all collection from specified model
Repository.prototype.getAll = async function (modelName) {
  modelName = modelName === "Problem" ? Problem : modelName === "Test" ? Test : Doctor;
  const instance = await modelName.find({});
  return instance.length ? instance : null;
};

//Used to get collection by Id
Repository.prototype.getById = async function (id, modelName) {
  modelName = modelName === "Problem" ? Problem : modelName === "Test" ? Test : Doctor;
  const instance = await modelName.findOne({ _id: id });
  return instance ? instance.toJSON() : null;
};

//used to findOne and update the document
Repository.prototype.getByIDAndUpdate = async function(query, updation, modelName){
  modelName = modelName === "Problem" ? Problem : modelName === "Test" ? Test : Doctor;
  const instance = await modelName.findOneAndUpdate(query, updation, { new: true } );
  return instance ? instance.toJSON() : null;
}

//used to get all collection from specified model
Repository.prototype.getByIdWithFilter = async function (query, filter, modelName) {
  modelName = modelName === "Problem" ? Problem : modelName === "Test" ? Test : Doctor;
  const instance = await modelName.find(query,filter);
  return instance.length ? instance : null;
};
module.exports = new Repository();
