const express = require('express');
const routes = express.Router()
// const master = require('./masterRouter')
const panitia = require('../routes/panitiaRouter')
const tournament = require('../routes/tournamentRouter')
const peserta = require('../routes/pesertaRouter')
const masterLomba = require('../routes/masterLombaRouter')

routes.use('/api', masterLomba)
// routes.use('/api/master', master)
routes.use('/api/panitia', panitia)
routes.use('/api/tournament', tournament)
routes.use('/api/peserta', peserta)


module.exports = routes;