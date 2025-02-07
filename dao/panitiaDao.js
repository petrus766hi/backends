const panitia = require('../model/user')

class panitiaDao {
    static getPanitia(){
        return new Promise((resolve, reject)=>{
            panitia.find().exec((err,panitia) =>{
                if (err || !panitia) {
                    return reject({error: "Panitia Not Found!!!"});
                }
                return resolve({panitia});
            })
        })
    }
    static getPanitiaId(data){
        return new Promise((resolve, reject)=>{
            panitia.findById(data).exec((err,panitia) =>{
                if (err || !panitia) {
                    return reject({error: "Panitia Not Found!!!"});
                }
                return resolve({panitia});
            })
        })
    }
    static updatePanitiaId (query, data){
        return new Promise((resolve, reject)=>{
            panitia.findByIdAndUpdate(query, data, {upsert: true}, (err, panitia)=>{
                if(err){
                    return reject({error: "Error"})
                }
                return resolve(panitia)
            })
        })
    }
    static removePanitia (query){
        return new Promise((resolve, reject)=>{
            panitia.findByIdAndDelete(query, (err, panitia)=>{
                if(err){
                    return reject({error: "Error"})
                }
                return resolve(panitia)
            })
        })
    }
}

module.exports = panitiaDao