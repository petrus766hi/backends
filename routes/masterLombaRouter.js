const express = require('express');
const router = express.Router();
const masterContoller = require('../contoller/masterLomba')

router.post('/masterlomba', masterContoller.masterTournament)
router.get('/getmasterlomba', masterContoller.getMasterTournament)


module.exports = router