const express = require('express');
const router = express.Router();
const pesertaController = require('../contoller/pesertaController')
const auth = require('../middleware/auth')

router.post('/register', pesertaController.createPeserta)
router.put('/update/:id',auth,pesertaController.updatePeserta)


module.exports = router