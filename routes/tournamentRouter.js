const express = require('express');
const router = express.Router();
const tournamentContoller = require('../contoller/tournamentController')
const auth = require('../middleware/auth')
const test = require('../middleware/testcopy')
router.post('/register', auth, tournamentContoller.CreateTournament)
// router.get('/tournament', tournamentContoller.getAllTournament)
router.put('/tournament/:id', tournamentContoller.updateTournament)
router.post('/tournament', test)


module.exports = router