require('dotenv').config();
const logger        = require('../../commons/logger/logger');
const Response      = require('../../commons/responses/EcomResponseManager');
const service       = require('./InsuranceService');

function Controller () {}

Controller.prototype.add = async function (req,res) {
  try {
    const data = await service.addDetails(req.body);
    if (data) {
      res.status(Response.success.Ok.code).json(
        Response.success.Ok.json({
          dataAdded: {
            name:data.name,
            email:data.email,
            age:data.age,
            mobile:data.mobile,
            country:data.country,
            state:data.state,
            city:data.city,
            gender:data.gender,
            address:data.address,
            amount:data.amount,
            date:data.date,
          },
        })
      );
    } else {
      res.status(Response.error.InvalidRequest.code).json(Response.error.InvalidRequest.json(
        'Failed to create the Insurance'
      ));
    };
   
  } catch (e) {
    logger.error(e.message);
    res.status(Response.error.InternalError.code).json(Response.error.InternalError.json());
  }
};

Controller.prototype.createInsurance = async function(req, res, next) {
  try {
    const data = await service.addInsurance(req);
    if (data) {
      res.status(Response.success.Ok.code).json(Response.success.Ok.json({
        message: 'Insurance added successfully',
        data: data,
      }));
    } else {
      res.status(Response.error.InvalidRequest.code).json(Response.error.InvalidRequest.json(
        'Failed to create the Insurance'
      ));
    };
  } catch (e) {
    logger.error(e.message);
    res.status(Response.error.InternalError.code).json(Response.error.InternalError.json());
  }
}

Controller.prototype.getAllInsurances = async function (req, res, next) {
  try {
    const data = await service.getAllInsurance();
    if (data) {
      res.status(Response.success.Ok.code).json(Response.success.Ok.json({
        message: 'All Insurances',
        data: data,
      }));
    } else {
      res.status(Response.error.InvalidRequest.code).json(Response.error.InvalidRequest.json(
        'Failed to fetch the Insurance'
      ));
    };
  } catch (e) {
    logger.error(e.message);
    res.status(Response.error.InternalError.code).json(Response.error.InternalError.json());
  }
}

module.exports = new Controller();
