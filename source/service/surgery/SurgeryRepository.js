const { Surgery } = require("../../commons/models/mongo/mongodb");

/********************* APPREVIEW'S REPO ***********************/

function Repository() {}

Repository.prototype.createDocument = async function(data) {
    modelName = Surgery;  
    const instance = await modelName.create(data);
    return instance ? instance.toJSON() : null;
};

//used to get all collection from specified model
Repository.prototype.getAll = async function(modelName) {
    modelName = Surgery;
    const instance = await modelName.find({});
    return instance.length ? instance : null;
};

module.exports = new Repository();
