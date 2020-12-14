const express = require('express');
const router = express.Router();
const panitiaController = require('../contoller/panitiaController')
const auth = require('../middleware/auth')
const check = require('../middleware/checkRole')

router.post('/user', auth, check('master'), panitiaController.createPanitia)
router.get('/getall', panitiaController.getAll)
router.get('/getpanitia/:id',  panitiaController.getPanitia)
router.put('/updatepanitia/:id', auth,check('master'),panitiaController.updatePanitia)
router.put('/panitiaregister/:id', auth,check('panitia'),panitiaController.panitiaRegister)
router.delete('/delete/:id',auth,check('master'),panitiaController.deletePanitia)


module.exports = router