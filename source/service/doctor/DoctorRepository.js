const { Problem, Test, Doctor } = require('../../commons/models/mongo/mongodb');

function Repository() {}

/********************* DOCTOR'S REPO ***********************/

Repository.prototype.isCorrectDetails = function(availability) {
  /*[
    {
      day: 'Monday',
      slot: [
        { time: '2:00 PM', isAvailable: 1 },
        { time: '9:00 AM', isAvailable: 1 }
      ]
    },
    {},
    {}
  ];*/

  //Only adding the correct values by making use of filters.
  let data = [];
  availability.forEach(details => {
    if (
      Object.keys(details).length &&
      details.day &&
      details.slot &&
      details.slot.length > 0
    ) {
      //this will conatins slots that are correct.
      let temp = [];
      details.slot.forEach(time => {
        if (time.time && (time.isAvailable == 0 || time.isAvailable == 1)) {
          temp.push(time);
        }
      });
      //Here we are validating that slots size should be same as temp, it means we can upload data, otherwise there will some mistake in the data
      if (temp.length == details.slot.length) data.push(details);
    }
  });

  return data;
};

/******************** PROBELM REPO *********************/

/******************** TEST REPO *********************/

/********************** COMMON REPO ******************/
//creating document
Repository.prototype.createDocument = async function(data, modelName) {
  modelName =
    modelName === 'Problem' ? Problem : modelName === 'Test' ? Test : Doctor;
  console.log('.modelName', modelName);

  const instance = await modelName.create(data);
  return instance ? instance.toJSON() : null;
};

//used to get all collection from specified model
Repository.prototype.getAll = async function(modelName) {
  modelName =
    modelName === 'Problem' ? Problem : modelName === 'Test' ? Test : Doctor;
  const instance = await modelName.find({});
  return instance.length ? instance : null;
};

//Used to get collection by Id
Repository.prototype.getById = async function(id, modelName) {
  modelName =
    modelName === 'Problem' ? Problem : modelName === 'Test' ? Test : Doctor;
  const instance = await modelName.findOne({ _id: id });
  return instance ? instance.toJSON() : null;
};

//used to findOne and update the document
Repository.prototype.getByIDAndUpdate = async function(
  query,
  updation,
  modelName
) {
  modelName =
    modelName === 'Problem' ? Problem : modelName === 'Test' ? Test : Doctor;
  const instance = await modelName.findOneAndUpdate(query, updation, {
    new: true
  });
  return instance ? instance.toJSON() : null;
};

//used to get all collection from specified model
Repository.prototype.getByIdWithFilter = async function(
  query,
  filter,
  modelName
) {
  modelName =
    modelName === 'Problem' ? Problem : modelName === 'Test' ? Test : Doctor;
  const instance = await modelName.find(query, filter);
  return instance.length ? instance : null;
};
module.exports = new Repository();
