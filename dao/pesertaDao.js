const peserta = require('../model/peserta')

class pesertaDao {
    static changePeserta (query, data){
        return new Promise((resolve, reject)=>{
            peserta.findByIdAndUpdate(query, data, {upsert: true}, (err, peserta)=>{
                if(err){
                    return reject({error: "Error"})
                }
                return resolve(peserta)
            })
        })
    }
    static getPeserta(){
        return new Promise((resolve, reject)=>{
            peserta.find().exec((err,peserta) =>{
                if (err || !peserta) {
                    return reject({error: "peserta Not Found!!!"});
                }
                return resolve(peserta);
            })
        })
    }
    static getPesertaId(query){
        return new Promise((resolve, reject)=>{
            peserta.findById(query).exec((err,peserta) =>{
                if (err || !peserta) {
                    return reject({error: "peserta Not Found!!!"});
                }
                return resolve(peserta);
            })
        })
    }
}

module.exports = pesertaDao