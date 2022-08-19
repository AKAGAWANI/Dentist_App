require("dotenv");
const mongoose  = require('mongoose');
const repository = require("./SurgeryRepository");

function Service() {}

Service.prototype.addSurgery = async function(req) {

    let icon = req.file.location;
    let { surgeryName, surgeryDescription, price }  = req.body; 

    if(icon != null ){
        let dataObj = {
          _id:new mongoose.Types.ObjectId().toHexString(),
          surgeryName:surgeryName,
          surgeryDescription:surgeryDescription,
          price:price
        };
        const surgeryData = await repository.createDocument(dataObj);
        if(surgeryData != null){
          let data = surgeryData;
          return data;
        }else{
          return false;
        }
      }else{
          return false;
      }

}

Service.prototype.getAllSurgeries = async function(){
    const surgeries = await repository.getAll();
    return surgeries;
}
module.exports = new Service();

