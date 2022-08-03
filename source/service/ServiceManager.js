module.exports = {
  login: require('./login/LoginController'),
  logout: require('./logout/LogoutController'),
  user: require('./user/UserController'),
  doctor: require('./doctor/DoctorController'),
  appointment: require("./appointment/appointmentController"),
  consultation: require('./consultation/ConsultationController'),
  insurance : require('./insurance/InsuranceController'),
  banner: require('./banner/BannerController'),
  policy:require('./policy/policyController')

};
