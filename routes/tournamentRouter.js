const express = require('express');
const router = express.Router();
const tournamentContoller = require('../contoller/tournamentController')
const auth = require('../middleware/auth')
router.post('/register', auth, tournamentContoller.CreateTournament)
router.get('/tournament', tournamentContoller.getAllTournament)
router.put('/tournament/:id', tournamentContoller.updateTournament)


module.exports = router