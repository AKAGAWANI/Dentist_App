require('dotenv').config();

function GeneralUtil() { }

GeneralUtil.prototype.generateNumericOTP = function() {
  const digits = '0123456789';
  const otpLength = 4;//envproperties.OTP_LEN;
  let otp = '';

  for (let i = 1; i <= otpLength; i++) {
    const index = Math.floor(Math.random() * (digits.length));
    otp += digits[index];
  }

  return otp;
};

module.exports = new GeneralUtil();