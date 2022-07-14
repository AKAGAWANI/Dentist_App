const express      = require('express');
const router       = express.Router();
const passport     = require('../../commons/auth/Passport');
const ServiceManager      = require('../../service/ServiceManager');

router.use(express.json());

router.get('/info', ServiceManager.user.info);
router.post('/delete', ServiceManager.user.delete);
router.post('/register', ServiceManager.user.registerPseudoUser);
router.post('/validateToReg', ServiceManager.user.validateAndRegUser);
router.get('/permissions/:appType', ServiceManager.user.accessPermissions);
router.get('/permissions/v2/:appType', ServiceManager.user.accessPermissionsV2);

module.exports = router;