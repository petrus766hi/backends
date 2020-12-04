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
}

module.exports = panitiaDao