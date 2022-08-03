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
const Doctor = require('./route/doctor');
const appointment = require("./route/appointment")
const Insurance  = require('./route/insurance');
const policy = require ('./route/policy')
const Banner = require ('./route/banner')

// stand alone route mappings defined below
router.use("/", Authenticate);
router.use("/login", Login);
router.use("/logout", Logout);
router.use("/api/user", User);
router.use("/api/banner", Banner);
router.use("/api/doctor", Doctor);
router.use("/api/appointment", appointment);
router.use('/api/insurance',Insurance);
router.use("/api/policy", policy);



module.exports = router;
