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
    static updatePanitia (query, data){
        return new Promise((resolve, reject)=>{
            panitia.findByIdAndUpdate(query, data, {new: true}, (err, peserta)=>{
                if(err){
                    return reject({error: "Error"})
                }
                return resolve({panitia})
            })
        })
    }
}

module.exports = panitiaDao