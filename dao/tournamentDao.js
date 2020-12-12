const { query } = require('express')
const tournament = require('../model/tournament')

class tournamentDao {
    static getAllTournament (){
        return new Promise((resolve, reject) =>{
            tournament
                .find ()
                // .populate('Id_Panitia')
                .exec((err, tournaments)=>{
                    if(err || !tournaments){
                        return reject ({msg: "Tournament Tidak Ada"})
                    }else{
                        return resolve({tournaments})
                    }
                })

        })
    }
    static updateTournament (query, tourObj){
        return new Promise((resolve, reject) =>{
            tournament.findByIdAndUpdate(query, tourObj, (err, tour)=>{
                if(err){
                    return reject({error: "Error"})
                }
                return resolve(tour)
            })

        })
    }
    static getAll (query){
        return new Promise((resolve, reject) =>{
            tournament
                .find()
                .sort({Is_active: query.sortBy})
                .limit(query.perPage)
                .skip((query.currentPage - 1)* query.perPage)
                // .populate('Id_Panitia')

                .exec((err, tournaments)=>{
                    if(err || !tournaments){
                        return reject ({msg: "Tournament Tidak Ada"})
                    }else{
                        return resolve({tournaments})
                    }
                })

        })
    }
    static updatePesertas (query, tourObj){
        return new Promise((resolve, reject) =>{
            tournament.findOneAndUpdate({_id:{$in: query}}, {$push: {Id_Peserta: [{id: tourObj.id, name: tourObj.name, fase1: tourObj.fase1, fase2: tourObj.fase2, fase3: tourObj.fase3,}]}}, {upsert: true} ,
                (err, tour)=>{
                if(err){
                    return reject({error: "Error"})
                }
                return resolve(tour)
            })
        })
    }
    static updateScore (query, tourObj){
        return new Promise((resolve, reject) =>{
            tournament.findOneAndUpdate({"Id_Peserta._id":query}, {$set:{ 'Id_Peserta.$.fase1': tourObj.fase1, 'Id_Peserta.$.fase2': tourObj.fase2,'Id_Peserta.$.fase3': tourObj.fase3}}, {new: true} ,
                (err, tour)=>{
                if(err){
                    return reject({error: "Error"})
                }
                return resolve(tour)
            })
        })
    }
    static getTournamentId (query){
        return new Promise((resolve, reject) =>{
            tournament
                .findOne({NamaTournament: query})
                // .populate('Id_Panitia')
                .exec((err, tournaments)=>{
                    if(err || !tournaments){
                        return reject ({msg: "Tournament Tidak Ada"})
                    }else{
                        return resolve({tournaments})
                    }
                })

        })
    }
    static getIdPeserta (query){
        return new Promise((resolve, reject) =>{
            tournament
                .findOne({Id_Peserta: {$elemMatch: {_id: {$in: query}}}}, )
                .exec((err, tournaments)=>{
                    if(err || !tournaments){
                        return reject ({msg: "Tournament Tidak Ada"})
                    }else{
                        return resolve(tournaments)
                    }
                })

        })
    }
}

module.exports = tournamentDao