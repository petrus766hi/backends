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
router.put('/resetpassword', pesertaController.resetPassword)
router.get('/getall', pesertaController.getAll)
router.put('/updatepeserta/:id', auth, pesertaController.registerPeserta2Tournament)

module.exports = router