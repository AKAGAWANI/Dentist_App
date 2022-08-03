//Importing Modules
const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router.route('/').post(userController.add);
router.route('/addAccountDetails').post(userController.addAccountDetails);

router.route('/info').get(userController.getDetails);

router.route('/update').patch(userController.updateDetails);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
