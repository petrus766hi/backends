const masterLomba = require('../model/masterlomba')
const masterLombaDao = require('../dao/masterDao')
class masterContoller {
    static masterTournament (req, res) {
        const {id, name, code} = req.body
        masterLomba.create({
            id: id,
            name: name,
            code: code
        })
        .then((results) =>{
            res.status(201).json({
                success: true,
                msg:"Berhasil Membuat Master Lomba"
            })
        })
        .catch((err)=>{
            res.status(500).json({
                success: false,
                msg:"Gagal Membuat Master Lomba"
            })
        })
    }
    static getMasterTournament (){
        masterLombaDao.getAllMasterLomba()
            .then((result) =>{
               res.status(201).json({
                  success: true,
                  msg: 'Sukses Membuat User Panitia',
                  data: result
               })
            })
             .catch((err)=>{
                res.status(500).json({
                   success: false,
                   msg: 'Gagal Membuat User Panitia',
                   data: err
                })
            })

    }
}
module.exports = masterContoller