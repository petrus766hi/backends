const user = require('../model/user')
const bcrypt = require ('bcryptjs');
const saltRounds = 10;
const pesertaDao = require('../dao/pesertaDao')

class pesertaController {
      static createPeserta(req, res, next) {
         console.log('xxx', req.body)
         bcrypt.hash(req.body.password, saltRounds, function(err , hash){
           const {username, email, roles, subDistirict} = req.body
           user.create({
            username : username,
            password : hash,
            email : email,
            subDistirict: subDistirict,
            role : roles,
           })
           .then((result)=>{
               res.status(201).json({
                  success: true,
                  msg: 'Sukses Membuat User Peserta',
                  data: result
               })
           })
           .catch((err)=>{
               res.status(500).json({
                  success: false,
                  msg: 'Gagal Membuat User Peserta',
                  data: err
               })
           })
        })

      }

      static updatePeserta(req, res, next){
         const {role} = req.user
         const id = req.params.id
         const active = {
            is_active_peserta: true
         }
         if(role != 'panitia'){
            return res.status(200).json({msg:'Kamu bukan Panitia, silahkan hubungi panitia nya'})
         }else{
            pesertaDao.updatePeserta(id, active)
            .then((result)=>{
               res.status(201).json({
                   success: true,
                   msg: 'Update Peserta',
                   data: result
               })
           })
           .catch((err)=>{
               res.status(500).json({
                   success: false,
                   msg: 'Gagal Update Peserta',
                   data: err
                })
           })
         }
      }
}

module.exports = pesertaController