const express = require('express');
const router = express.Router();
const pesertaController = require('../contoller/pesertaController')
const loginController = require('../contoller/loginController')
const auth = require('../middleware/auth')

router.post('/register', pesertaController.createPeserta)
router.put('/update/:id',auth,pesertaController.updatePeserta)
router.put('/update/:id',auth,pesertaController.changePeserta)
router.post('/login', loginController.LoginPeserta)
router.put('/forgotpassword', pesertaController.forgotPassword)
router.get('/getall', pesertaController.getAll)

module.exports = router