const express = require('express');
const router = express.Router();
const passport = require('../../commons/auth/Passport');
const ServiceManager = require('../../service/ServiceManager');

router.use(express.json());
router.post('/createAdmin', ServiceManager.admin.createAdmin);

module.exports = router;
