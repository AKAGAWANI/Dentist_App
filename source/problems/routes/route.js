const router = require("express").Router();
const problemController = require('../controller/problemController');


router.post('/api/problem/create',problemController.problem);
router.get('/api/problem/list',problemController.list)

module.exports = router;