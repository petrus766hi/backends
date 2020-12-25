const masterLomba = require('../model/masterlomba')

class masterDao {
    static getAllMasterLomba(){
        return new Promise((resolve, reject)=>{
            masterLomba.find().exec((err,lomba) =>{
                if (err || !lomba) {
                    return reject({error: "Lomba Not Found!!!"});
                }
                return resolve(lomba);
            })
        })
    }

}

module.exports = masterDao