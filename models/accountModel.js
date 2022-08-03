const mongoose = require('mongoose');
const validator = require('validator');

const accountSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: Date,
  salutation: {
    type: String,
    enum: ['mr', 'Mr.', 'ms.', 'Ms.', 'mrs.', 'Mrs.', 'other'],
    default: 'mr.'
  },
  fullName: String,
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'Please provide a valid email address.']
  },
  mobile: {
    type: String,
    min: [10, 'Minimum length should be 10 without country code.'],
    max: [13, 'Maximum length must be less than 14 with country code.']
  },
  nationality: String,
  dob: String,
  country: String,
  city: String,
  loyalityFlag: String,
  gender: {
    type: String,
    enum: {
      values: [
        'male',
        'Male',
        'Female',
        'female',
        'transgender',
        'Transgender'
      ],
      message:
        'Gender should be male, Male, female,Female,transgender or Transgender.'
    }
  },
  segmentation: [
    {
      _id: String,
      value: [
        {
          type: String
        }
      ],
      label: String,
      segType: String
    }
  ],
  address: [
    {
      address1: String,
      address2: String,
      city: String,
      state: String,
      pincode: String,
      addressType: String,
      defaultAddress: String,
      alias: String,
      map: {
        latitude: Number,
        longitude: Number,
        address: String
      }
    }
  ],
  SavedCards: [
    {
      cardNo: String,
      cardNoMasked: String,
      expiryMonth: String,
      expiryYear: String,
      cardHolderName: String,
      bankCode: String,
      bankName: String,
      cardType: String,
      cardCategory: String,
      cardCategoryImg: String,
      remarks: String,
      active: String
    }
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  occupation: Array,
  incomeBand: String
});

const Account = mongoose.model('accounts', accountSchema);

accountSchema.pre('save', async function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = Account;
