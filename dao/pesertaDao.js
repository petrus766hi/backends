const peserta = require('../model/user')

class pesertaDao {
    static updatePeserta (query, data){
        return new Promise((resolve, reject)=>{
            peserta.findByIdAndUpdate(query, data, {new: true}, (err, peserta)=>{
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
}

module.exports = pesertaDao