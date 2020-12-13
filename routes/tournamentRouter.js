const express = require('express');
const router = express.Router();
const tournamentContoller = require('../contoller/tournamentController')
const auth = require('../middleware/auth')
const check = require('../middleware/checkRole')
const status = require('../middleware/checkStatus')
router.post('/register', auth,check('panitia'),status('true'),tournamentContoller.CreateTournament)
router.get('/tournament', tournamentContoller.getAll)
router.put('/tournament/:id', tournamentContoller.updateTournament)
router.get('/tournament/:id', tournamentContoller.getTournamentOne)
router.get('/peserta/:id', tournamentContoller.getPeserta)


module.exports = router