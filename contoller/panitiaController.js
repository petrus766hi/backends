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
    static getPanitia(req, res, next){
      const id = req.params.id
      panitiaDao.getPanitiaId(id)
      .then((result) =>{
         res.status(201).json({
            success: true,
            msg: 'Get Panitia',
            data: result
         })
      })
      .catch((err)=>{
         res.status(500).json({
            success: false,
            msg: 'Gagal Get Panitia',
            data: err
         })
     })
   }
   static updatePanitia(req, res, next){
      const {role} = req.user
      const id = req.params.id
      const active = {
         is_active_peserta: req.body.is_active_peserta
      }
      console.log('xxx', role)
      if(role != 'master'){
         return res.status(200).json({msg:'Kamu bukan Master, silahkan hubungi panitia nya'})
      }else{
         panitiaDao.updatePanitiaId(id, active)

         .then((result)=>{
            console.log('ress', result)
            res.status(201).json({
                success: true,
                msg: 'Update Panitia',
                data: result
            })
        })
        .catch((err)=>{
            res.status(500).json({
                success: false,
                msg: 'Gagal Update Panitia',
                data: err
             })
        })
      }
   }
}

module.exports = userController