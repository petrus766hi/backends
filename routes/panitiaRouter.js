const express = require('express');
const router = express.Router();
const userController = require('../contoller/panitiaController')
const auth = require('../middleware/auth')
const check = require('../middleware/checkRole')

router.post('/user', auth, check('master'))


module.exports = router