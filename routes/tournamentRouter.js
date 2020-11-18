const express = require('express');
const router = express.Router();
const tournamentContoller = require('../contoller/tournamentController')
const auth = require('../middleware/auth')
router.post('/register', auth, tournamentContoller.CreateTournament)


module.exports = router