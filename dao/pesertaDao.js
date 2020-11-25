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
}

module.exports = pesertaDao