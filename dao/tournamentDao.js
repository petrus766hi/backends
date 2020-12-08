const { query } = require('express')
const tournament = require('../model/tournament')

class tournamentDao {
    static getAllTournament (){
        return new Promise((resolve, reject) =>{
            tournament
                .find()
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
                .sort({NamaTournament: query.sortBy})
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
            tournament.findOneAndUpdate({_id:{$in: query}}, {$push: {Id_Peserta: [{id: tourObj.id}]}}, {upsert: true} ,
                (err, tour)=>{
                if(err){
                    return reject({error: "Error"})
                }
                return resolve(tour)
            })

        })
    }
}

module.exports = tournamentDao