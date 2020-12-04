const user = require('../model/user')
const bcrypt = require ('bcryptjs');
const saltRounds = 10;
const panitiaDao = require('../dao/panitiaDao')
class userController {
    static createPanitia(req, res, next) {
       const {id, role, subDistirict} = req.user
       if(role != 'master'){
            return res.status(200).json({msg:'Kamu bukan Master, silahkan hubungi master nya'})
       }else{
        bcrypt.hash(req.body.password, saltRounds, function(err , hash){
           const {username, email, roles} = req.body
           user.create({
            username : username,
            password : hash,
            email : email,
            subDistirict: subDistirict,
            role : roles,
            id_master: id
           })
           .then((result)=>{
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
        })

      }
    }
    static getAll(req, res, next){
         panitiaDao.getPanitia()
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

module.exports = userController