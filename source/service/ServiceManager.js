module.exports = {
  login: require('./login/LoginController'),
  logout: require('./logout/LogoutController'),
  user: require('./user/UserController'),
  doctor: require('./doctor/DoctorController'),
  consultation: require('./consultation/ConsultationController'),
  insurance : require('./insurance/InsuranceController'),
  problem:require('./problems/problemController'),
  banner:require('./banner/BannerController')
};
