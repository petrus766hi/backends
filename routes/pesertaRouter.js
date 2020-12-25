const express = require('express');
const router = express.Router();
const pesertaController = require('../contoller/pesertaController')
const loginController = require('../contoller/loginController')
const auth = require('../middleware/auth')
const checkStatus = require('../middleware/checkStatus')

router.post('/register', pesertaController.createPeserta)
router.post('/login', loginController.Login)
router.get('/getId/:id', pesertaController.getPesertaById)
router.put('/update/:id',auth,pesertaController.updatePeserta)
router.delete('/delete/:id',auth,pesertaController.deletePeserta)
router.put('/changepeserta/:id',pesertaController.changePeserta)
router.put('/forgotpassword', pesertaController.forgotPassword)
router.put('/resetpassword', pesertaController.resetPassword)
router.put('/changepassword', pesertaController.changePassword)
router.get('/getall', pesertaController.getAll)
router.put('/updatepeserta/:id', auth, checkStatus('true'),pesertaController.registerPeserta2Tournament)
router.put('/updatescore/:id', pesertaController.ScorePeserta2Tournament)
router.put('/updateregister/:id', pesertaController.UpdatePesertaRegister)

module.exports = router