const express = require('express');
const router = express.Router();
const userController = require('../contoller/panitiaController')
const auth = require('../middleware/auth')
router.post('/user', auth, userController.createPanitia)


module.exports = router