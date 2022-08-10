/**
 * ROUTE MANAGER
 *
 * > purpose
 *   + to take routing load from app.js and manage all routes within application
 *
 */
const express = require('express');
const router = express.Router();

const Authenticate = require('../middleware/authentication');

// stand alone routes imports
const Login = require('./route/login');
const Logout = require('./route/logout');
const User = require('./route/user');
const Test = require('./route/test');
const Doctor = require('./route/doctor');
const appointment = require('./route/appointment');
const Insurance = require('./route/insurance');
const App = require('./route/app');

<<<<<<< HEAD
const Banner =require('./route/banner')
const Admin=require('./route/admin')
const Problem=require('./route/problem')
const policy = require ('./route/policy')
const terms = require ('./route/terms')

=======
const Banner = require('./route/banner');
const Admin = require('./route/admin');
const Problem = require('./route/problem');
const policy = require('./route/policy');
>>>>>>> 061e1b2271de153f0d1a9a1412cc04a7e9cd9266

// stand alone route mappings defined below
// router.use('/', Authenticate);
router.use('/api/admin', Admin);
router.use('/login', Login);
router.use('/logout', Logout);
router.use('/api/user', User);
router.use('/api/test', Test);
router.use('/api/banner', Banner);
router.use('/api/doctor', Doctor);
router.use('/api/appointment', appointment);
router.use('/api/insurance', Insurance);
router.use('/api/app', App);
<<<<<<< HEAD
router.use('/api/problem',Problem)
router.use("/api/policy", policy);
router.use("/api/terms", terms);

=======
router.use('/api/admin', Admin);
router.use('/api/problem', Problem);
router.use('/api/policy', policy);
>>>>>>> 061e1b2271de153f0d1a9a1412cc04a7e9cd9266

module.exports = router;
