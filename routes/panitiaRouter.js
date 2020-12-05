const express = require('express');
const router = express.Router();
const panitiaController = require('../contoller/panitiaController')
const auth = require('../middleware/auth')
const check = require('../middleware/checkRole')

router.post('/user', auth, check('master'))
router.get('/getall', panitiaController.getAll)
router.get('/getpanitia/:id',  panitiaController.getPanitia)
router.put('/updatepanitia/:id', auth, panitiaController.updatePanitia)


module.exports = router