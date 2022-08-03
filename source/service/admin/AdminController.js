const logger   = require('../../commons/logger/logger');
const Response = require('../../commons/responses/EcomResponseManager');
const {
  Context: DBContext
} = require('../../commons/context/dbContext');
const {
  ds,
  url,
} = require('../../commons/util/UtilManager');
const {
  crypto
} = require('../../commons/util/UtilManager');
const service = require('./AdminService');
const LoginService=require('../login/LoginService')
function Controller() { }

Controller.prototype.createAdmin=async(req,res,next)=>{
    try {
        const user = await LoginService.findUser(req.body.email, req.body.contact);
        if(user){
            if(crypto.decrypt(user.email)==req.body.email){
                return res.status(Response.error.AlreadyExist.code).json(Response.error.AlreadyExist.json('This email already exists'));
            }else{
                return res.status(Response.error.AlreadyExist.code).json(Response.error.AlreadyExist.json('This mobile number already exists'));
            }
        }
        let saved=await service.adminCreate(req.body)
        return res.status(Response.success.Ok.code).json(Response.success.Ok.json({
            data: { userId: saved },
            message: 'Admin created successfully .'
          }));
    } catch (error) {
        logger.error(error.message);
        res.status(Response.error.InternalError.code).json(Response.error.InternalError.json());
    }
}
module.exports=new Controller()