const peserta = require('../model/peserta')
const bcrypt = require ('bcryptjs');
const saltRounds = 10;
const pesertaDao = require('../dao/pesertaDao');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendMail')

class pesertaController {
      static createPeserta(req, res, next) {
         bcrypt.hash(req.body.password, saltRounds, function(err , hash){
           const {username, email, roles, birthdate, phoneNumber} = req.body
           peserta.create({
            username : username,
            password : hash,
            email : email,
            birthdate: birthdate,
            phoneNumber: phoneNumber,
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

      static changePeserta(req, res, next){
         const id = req.params.id
         const username = {
            username: req.body
         }
            pesertaDao.updatePeserta(id, username)
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
      static async  forgotPassword (req, res, next){
         const { email } = req.body
         const participant = await peserta.findOne({email: email})

         if(!participant){
            return res.status(200).json({
               status: false,
               msg: "Email Tidak Tersedia"
            })
         }
         const tokens = {
            user : {
              id : participant.id,
              role: participant.role,
            }
          }
         const token = jwt.sign(tokens, 'jwtSecret', { expiresIn: "10h" })
         await peserta.updateOne({reset_password: token})

         const message = {
            from: `Petrus`,
            to: email ,
            subject: 'Reset Password',
            html:`<a href="http://localhost:4200/home">Masuk gan </a>`
         };
         sendEmail(message)
         return res.status(200).json({
            msg: 'Berhasil'
         })
      }
      static getAll(req, res, next){
         pesertaDao.getPeserta()
         .then((result) =>{
            res.status(201).json({
               success: true,
               msg: 'Get All Peserta',
               data: result
            })
         })
         .catch((err)=>{
            res.status(500).json({
               success: false,
               msg: 'Gagal Get All Peserta',
               data: err
            })
        })
    }
}

module.exports = pesertaController