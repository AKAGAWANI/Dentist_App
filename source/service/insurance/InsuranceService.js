const repository    = require('./InsuranceRepository');
const mongoose = require('mongoose');

function Service(){} 

Service.prototype.addInsurance = async function (req) {
    const logo = req.body.location
    const  name  = req.body.name;
    if(logo != null && name != null){
      let dataObj = {
        _id:new mongoose.Types.ObjectId().toHexString(),
        logo:logo,
        name:name
      };
      const insurance = await repository.createInsurance(dataObj);
      if(insurance != null){
        let data = insurance;
        return data;
      }else{
        return false;
      }
    }else{
        return false;
    }
}

Service.prototype.addDetails = async function(req){

  let obj={
    _id:new mongoose.Types.ObjectId().toHexString(),
    name:req.name,
    email:req.email,
    age:req.age,
    mobile:req.mobile,
    gender:req.gender,
    country:req.country,
    state:req.state,
    city:req.city,
    address:req.address,
    amount:req.amount,
    date:req.date
  };
  if(obj.name != null && obj.email != null &&obj.mobile!=null){
  const insurance = await repository.add(obj);
  return insurance?insurance:null
}else{
  return false
}


}
Service.prototype.getAllInsurance = async function(){
  const insurance = await repository.getAllInsurance();
  return insurance;
}

module.exports = new Service();
