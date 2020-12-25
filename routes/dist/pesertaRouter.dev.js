"use strict";

var express = require('express');

var router = express.Router();

var pesertaController = require('../contoller/pesertaController');

var loginController = require('../contoller/loginController');

var auth = require('../middleware/auth');

var checkStatus = require('../middleware/checkStatus');

router.post('/register', pesertaController.createPeserta);
router.get('/getId/:id', pesertaController.getPesertaById);
router.put('/update/:id', auth, pesertaController.updatePeserta);
router["delete"]('/delete/:id', auth, pesertaController.deletePeserta);
router.put('/changepeserta/:id', pesertaController.changePeserta);
// router.post('/login', loginController.LoginPeserta);
router.put('/forgotpassword', pesertaController.forgotPassword);
router.put('/resetpassword', pesertaController.resetPassword);
router.put('/changepassword', pesertaController.changePassword);
router.get('/getall', pesertaController.getAll);
router.put('/updatepeserta/:id', auth, checkStatus('true'), pesertaController.registerPeserta2Tournament);
router.put('/updatescore/:id', pesertaController.ScorePeserta2Tournament);
module.exports = router;