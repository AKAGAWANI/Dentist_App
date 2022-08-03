module.exports = {
  login: require("./login/LoginController"),
  logout: require("./logout/LogoutController"),
  user: require("./user/UserController"),
  doctor: require("./doctor/DoctorController"),
  insurance : require('./insurance/InsuranceController'),
  app : require('./app/AppController'),
  appointment: require("./appointment/appointmentController"),
  consultation: require('./consultation/ConsultationController'),
<<<<<<< HEAD
  banner: require('./banner/BannerController'),
  insurance: require('./insurance/InsuranceController')
=======
  problem:require('./problems/problemController'),
  banner:require('./banner/BannerController'),
  admin:require('./admin/AdminController'),
  policy:require('./policy/policyController'),
  test: require('./test/TestController'),

>>>>>>> 470df6f934115f59f6ac2cdb133d5e1e3923ba3b
};
