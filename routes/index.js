const express = require('express');
const routes = express.Router()
const master = require('./masterRouter')
const panitia = require('../routes/panitiaRouter')
const tournament = require('../routes/tournamentRouter')


routes.use('/api/master', master)
routes.use('/api/panitia', panitia)
routes.use('/api/tournament', tournament)


module.exports = routes;