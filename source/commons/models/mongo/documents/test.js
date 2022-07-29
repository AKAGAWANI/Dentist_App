const mongoose = require('mongoose');

const testSchema=mongoose.Schema({
    _id:{type:String},
    testName:{ type:String },
    description:{type:String },
    icons:[{type:String }],
    displayName:{type:String }

}); 

module.exports=mongoose.model('Test',testSchema); 