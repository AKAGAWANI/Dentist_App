module.exports = {
  login: require('./login/LoginController'),
  logout: require('./logout/LogoutController'),
  user: require('./user/UserController'),
  doctor: require('./doctor/DoctorController'),
  appointment: require("./appointment/appointmentController"),
  consultation: require('./consultation/ConsultationController'),
  insurance : require('./insurance/InsuranceController'),
  problem:require('./problems/problemController'),
  banner:require('./banner/BannerController'),
  admin:require('./admin/AdminController'),
  policy:require('./policy/policyController')

};
