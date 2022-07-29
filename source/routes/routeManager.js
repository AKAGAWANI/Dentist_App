/**
 * ROUTE MANAGER
 * 
 * > purpose
 *   + to take routing load from app.js and manage all routes within application
 * 
 */
const express = require('express');
const router  = express.Router();

const Authenticate = require('../middleware/authentication');

// stand alone routes imports
const Login      = require('./route/login');
const Logout     = require('./route/logout');
const User       = require('./route/user');
const Test       = require('./route/test');


// stand alone route mappings defined below
router.use('/', Authenticate);
router.use('/login', Login);
router.use('/logout', Logout);
router.use('/api/user', User);
router.use('/api/test', Test);

module.exports = router;
