const mongoose = require('mongoose')
const problemSchema = new mongoose.Schema({
    problemName :{
        type:String,
        required : true,
        trim : true
    },
    description :{
        type:String,
        trim : true
    },
    icons:[{
        type : String,
        required : true,
        trim : true
    }],
    displayName :{
        type:String,
        trim : true
    }
}) 
module.exports = mongoose.model('problem',problemSchema);