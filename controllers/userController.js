const Account = require('../models/accountModel');
const User = require(`../models/userModel`);
const catchAsync = require('../utils/catchAsync');

//To get details of the user.
exports.add = async (req, res, next) => {
  try {
    let {
      email,
      mobile,
      password,
      passwordOtp,
      otpExpiry,
      appType,
      apps,
      concessionareCode,
      devices
    } = req.body;

    let addedData = await User.create({
      email,
      mobile,
      password,
      passwordOtp,
      otpExpiry,
      appType,
      apps,
      concessionareCode,
      devices
    });
    res.status(200).json({ status: true, data: addedData });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: 'Internal Error',
      errorMessage: error.message
    });
  }
};

exports.addAccountDetails = async (req, res) => {
  try {
    let {
      email,
      mobile,
      password,
      passwordOtp,
      otpExpiry,
      appType,
      apps,
      concessionareCode,
      devices
    } = req.body;

    let addedData = await Account.create({
      salutation: 'Mr.',
      fullName: 'Gaurav Sinha',
      firstName: 'Gaurav',
      lastName: 'Sinha',
      email: 'abc@gmail.com',
      mobile: 213423423,
      nationality: 'Indian',
      dob: 'unknown',
      country: 'India',
      city: 'Delhi',
      loyalityFlag: 'some flag',
      gender: 'male',
      segmentation: [
        {
          _id: '234234234',
          value: [],
          label: 'some label',
          segType: 'type'
        }
      ],
      address: [
        {
          address1: 'String',
          address2: 'String123',
          city: 'Delhi',
          map: {
            latitude: 0 / 234,
            longitude: 234.234,
            address: 'some adderss'
          }
        }
      ],
      SavedCards: [
        {
          cardNo: 2343452345,
          cardNoMasked: 234234324,
          expiryMonth: 'some time',
          expiryYear: '2034',
          cardHolderName: 'Name of holder',
          bankCode: 21321,
          bankName: 324234,
          cardType: 132,
          cardCategory: 1234324,
          cardCategoryImg: 1234234234,
          remarks: 'Sdfsadf',
          active: 343
        }
      ],
      occupation: [],
      incomeBand: 'aassa'
    });

    console.log('udpating iuser');
    await User.updateOne(
      { _id: '62cbf9c9c0b7bf3925e161eb' },
      { $set: { account: addedData._id, passwordOtp: 13467 } }
    );
    res.status(200).json({ status: true, data: addedData });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: 'Internal Error',
      errorMessage: error.message
    });
  }
};

//To get the user personal and account details
exports.getDetails = async (req, res, next) => {
  try {
    //will get the user id from the token itself.
    const userId = '62cbf9c9c0b7bf3925e161eb';

    //to get the user informtaiona and also account information
    const details = await User.findById(userId).populate('account');
    res.status(200).json({ status: true, data: details });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: 'Internal Error',
      details: error.message
    });
  }
};

//To update the details of the user and account
exports.updateDetails = async (req, res, next) => {
  try {
    /*expected body
      {
        "user": {
            "email": "ab1@gmail.com"
        },
        "account": {
            "_id": "62cc03551e0357ae89d05bde", //must contain, if we want to update accounts details.
            "mobile": 12234234890
        }
      } 
    */

    //Getting details from body.
    let { account, user } = req.body;

    //We will get userId from token.
    const userId = '62cbf9c9c0b7bf3925e161eb';

    //Updating account information
    if (account && account._id)
      accountDetails = await Account.findByIdAndUpdate(
        { _id: account._id },
        account,
        {
          runValidators: true
        }
      );

    //Update user information
    const details = await User.findByIdAndUpdate({ _id: userId }, user, {
      new: true,
      runValidators: true
    }).populate('account');

    res.status(200).json({ status: true, details });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Internal Error' });
  }
};
