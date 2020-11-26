const express = require('express');
const router = express.Router();
const pesertaController = require('../contoller/pesertaController')
const loginController = require('../contoller/loginController')
const auth = require('../middleware/auth')

router.post('/register', pesertaController.createPeserta)
router.put('/update/:id',auth,pesertaController.updatePeserta)
router.post('/login', loginController.LoginPeserta)
router.put('/forgotpassword', pesertaController.forgotPassword)

module.exports = router