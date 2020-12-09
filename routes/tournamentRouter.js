const express = require('express');
const router = express.Router();
const tournamentContoller = require('../contoller/tournamentController')
const auth = require('../middleware/auth')
const check = require('../middleware/checkRole')
router.post('/register', auth,check('panitia'), tournamentContoller.CreateTournament)
router.get('/tournament', tournamentContoller.getAll)
router.put('/tournament/:id', tournamentContoller.updateTournament)
router.get('/tournament/:id', tournamentContoller.getTournamentOne)


module.exports = router