require('dotenv').config();

function GeneralUtil() { }

GeneralUtil.prototype.generateNumericOTP = function() {
  const digits = '0123456789';
  const otpLength = 6;//envproperties.OTP_LEN;
  let otp = '';

  for (let i = 1; i <= otpLength; i++) {
    const index = Math.floor(Math.random() * (digits.length));
    otp += digits[index];
  }

  return otp;
};
GeneralUtil.prototype.isValidEmail = function(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
GeneralUtil.prototype.isValidMobileNumber=function(contact){
  const re=/^([+]\d{2})?\d{10}$/
  return re.test(String(contact))
}

module.exports = new GeneralUtil();