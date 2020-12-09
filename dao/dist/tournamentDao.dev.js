"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('express'),
    query = _require.query;

var tournament = require('../model/tournament');

var tournamentDao =
/*#__PURE__*/
function () {
  function tournamentDao() {
    _classCallCheck(this, tournamentDao);
  }

  _createClass(tournamentDao, null, [{
    key: "getAllTournament",
    value: function getAllTournament() {
      return new Promise(function (resolve, reject) {
        tournament.find() // .populate('Id_Panitia')
        .exec(function (err, tournaments) {
          if (err || !tournaments) {
            return reject({
              msg: "Tournament Tidak Ada"
            });
          } else {
            return resolve({
              tournaments: tournaments
            });
          }
        });
      });
    }
  }, {
    key: "updateTournament",
    value: function updateTournament(query, tourObj) {
      return new Promise(function (resolve, reject) {
        tournament.findByIdAndUpdate(query, tourObj, function (err, tour) {
          if (err) {
            return reject({
              error: "Error"
            });
          }

          return resolve(tour);
        });
      });
    }
  }, {
    key: "getAll",
    value: function getAll(query) {
      return new Promise(function (resolve, reject) {
        tournament.find().sort({
          NamaTournament: query.sortBy
        }).limit(query.perPage).skip((query.currentPage - 1) * query.perPage) // .populate('Id_Panitia')
        .exec(function (err, tournaments) {
          if (err || !tournaments) {
            return reject({
              msg: "Tournament Tidak Ada"
            });
          } else {
            return resolve({
              tournaments: tournaments
            });
          }
        });
      });
    }
  }, {
    key: "updatePeserta",
    value: function updatePeserta(query, tourObj) {
      return new Promise(function (resolve, reject) {
        tournament.findOneAndUpdate({
          _id: {
            $in: query
          }
        }, {
          $push: {
            Id_Peserta: [{
              id: tourObj.id,
              name: tourObj.name,
              fase1: tourObj.fase1,
              fase2: tourObj.fase2,
              fase3: tourObj.fase3
            }]
          }
        }, {
          upsert: true
        }, function (err, tour) {
          if (err) {
            return reject({
              error: "Error"
            });
          }

          return resolve(tour);
        });
      });
    }
  }, {
    key: "updateScore",
    value: function updateScore(query, tourObj) {
      return new Promise(function (resolve, reject) {
        tournament.findOneAndUpdate({
          "Id_Peserta._id": "5fd00c3cdf27e91c6c411304"
        }, {
          $set: {
            'Id_Peserta.$.fase1': tourObj.fase1
          }
        }, {
          "new": true
        }, function (err, tour) {
          if (err) {
            return reject({
              error: "Error"
            });
          }

          return resolve(tour);
        });
      });
    }
  }, {
    key: "getTournamentId",
    value: function getTournamentId(query) {
      return new Promise(function (resolve, reject) {
        tournament.findById(query) // .populate('Id_Panitia')
        .exec(function (err, tournaments) {
          if (err || !tournaments) {
            return reject({
              msg: "Tournament Tidak Ada"
            });
          } else {
            return resolve({
              tournaments: tournaments
            });
          }
        });
      });
    }
  }, {
    key: "getIdPeserta",
    value: function getIdPeserta(query) {
      return new Promise(function (resolve, reject) {
        tournament.findById({
          Id_Peserta: query
        }).exec(function (err, tournaments) {
          if (err || !tournaments) {
            return reject({
              msg: "Tournament Tidak Ada"
            });
          } else {
            return resolve({
              tournaments: tournaments
            });
          }
        });
      });
    }
  }]);

  return tournamentDao;
}();

module.exports = tournamentDao;