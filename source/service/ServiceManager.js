module.exports = {
  login: require('./login/LoginController'),
  logout: require('./logout/LogoutController'),
  user: require('./user/UserController'),
  doctor: require('./doctor/DoctorController'),
  insurance: require('./insurance/InsuranceController'),
  app: require('./app/AppController'),
  appointment: require('./appointment/appointmentController'),
  consultation: require('./consultation/ConsultationController'),
<<<<<<< HEAD
  problem:require('./problems/problemController'),
  banner:require('./banner/BannerController'),
  admin:require('./admin/AdminController'),
  policy:require('./policy/policyController'),
  terms:require('./terms/termsController'),
  test: require('./test/TestController'),

=======
  problem: require('./problems/problemController'),
  banner: require('./banner/BannerController'),
  admin: require('./admin/AdminController'),
  policy: require('./policy/policyController'),
  test: require('./test/TestController')
>>>>>>> 061e1b2271de153f0d1a9a1412cc04a7e9cd9266
};
