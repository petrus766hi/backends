const user = require('../model/user')
const bcrypt = require ('bcryptjs');
const saltRounds = 10;
const pesertaDao = require('../dao/pesertaDao');
const tournamentDao = require('../dao/tournamentDao');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendMail')

class pesertaController {
      static createPeserta(req, res, next) {
         bcrypt.hash(req.body.password, saltRounds, function(err , hash){
           const {username, email, roles, birthdate, phoneNumber} = req.body
           user.create({
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
            is_active_peserta: req.body.is_active_peserta
         }
         if(role != 'panitia'){
            return res.status(200).json({msg:'Kamu bukan Panitia, silahkan hubungi panitia nya'})
         }else{
            pesertaDao.changePeserta(id, active)
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

      static deletePeserta(req, res, next){
         const {role} = req.user
         const id = req.params.id
         if(role != 'panitia'){
            return res.status(200).json({msg:'Kamu bukan Panitia, silahkan hubungi panitia nya'})
         }else{
            pesertaDao.removePeserta(id)
            .then((result)=>{
               res.status(201).json({
                   success: true,
                   msg: 'Delete Peserta',
                   data: result
               })
           })
           .catch((err)=>{
               res.status(500).json({
                   success: false,
                   msg: 'Gagal Delete Peserta',
                   data: err
                })
           })
         }
      }

      static changePeserta(req, res, next){
         const id = req.params.id
         const obj = {
            username: req.body.username,
            email: req.body.email
         }
            pesertaDao.changePeserta(id, obj)
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
         await peserta.findByIdAndUpdate(tokens.user.id,{reset_password: token})
         const message = {
            from: `Petrus`,
            to: email ,
            subject: 'Reset Password',
            html:`<a href="https://tujuhbelas.herokuapp.com/reset_password/${token}">Masuk gan </a>`
         };
         sendEmail(message)

         return res.status(200).json({
           status: true,
           msg: 'Berhasil Merubah Password'
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
      static getPesertaById(req, res, next){
         const query = req.params.id
         pesertaDao.getPesertaId(query)
         .then((result) =>{
            res.status(201).json({
               success: true,
               msg: 'Get Peserta',
               data: result
            })
         })
         .catch((err)=>{
            res.status(500).json({
               success: false,
               msg: 'Gagal Get Peserta',
               data: err
            })
        })
      }
      static UpdatePesertaRegister(req, res, next){
         const query = req.params.id
         const data = {
            register: req.body.register
         }
         pesertaDao.changePeserta(query, data)
         .then((result) =>{
            res.status(201).json({
               success: true,
               msg: ' Update Peserta',
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
      static async  resetPassword (req, res, next){
         const { password, token } = req.body
         const user = await peserta.findOne({reset_password: token})

         if(user){
            const hashPassword = await bcrypt.hash(password, 10)
            user.password = hashPassword
            await user.save()
            return res.status(200).json({
               status: true,
               msg: 'Berhasil'
            })
         }
      }
      static registerPeserta2Tournament (req, res, next){
      let query = req.params.id
        let tourObj ={
            id : req.user.id,
            name : req.user.username,
            fase1: req.body.fase1,
            fase2: req.body.fase2,
            fase3: req.body.fase3
        }
        tournamentDao.updatePesertas(query, tourObj)
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
      static async  changePassword (req, res, next){
         const { password , token, email  } = req.body
         const user = await peserta.findOne({email:  email})
         if(user){
            const hashPassword = await bcrypt.hash(password, 10)
            user.password = hashPassword
            await user.save()
            return res.status(200).json({
               status: true,
               msg: 'Berhasil'
            })
         }else{
            return res.status(404).json({
               status: true,
               msg: 'User Not Found '
            })
         }
      }
      static UpdatePeserta2Tournament (req, res, next){
         let query = req.params.id
           let tourObj ={
               fase1: req.body.fase1,
               fase2: req.body.fase2,
               fase3: req.body.fase3
           }
           tournamentDao.updatePesertas(query, tourObj)
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
         static ScorePeserta2Tournament (req, res, next){
              let dataObj =[
                 {
                  id : req.body.id,
                  fase1: req.body.fase1,
                  fase2: req.body.fase2,
                  fase3: req.body.fase3
                 }
            ]
              tournamentDao.updateScore(dataObj)
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

module.exports = pesertaController