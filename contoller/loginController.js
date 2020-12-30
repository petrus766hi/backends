const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken')
const {check, validationResult} = require ('express-validator');
const User = require ('../model/user');
// const Peserta = require ('../model/peserta');

class LoginMaster {
    static async Login (req,res) {
        const errors = validationResult (req);
        if (!errors.isEmpty ()) {
          return res.status (400).json ({errors: errors.array()});
        }
        const{ email, password} = req.body
        try{
          const userName = await User.findOne({email})
          if(!userName){
            return res.status(400).json({error: [{msg: "Invalid Username/Email"}]})
          }
          const matchPassword = await bcrypt.compare(password, userName.password)
          if(!matchPassword){
            const failed = await User.update({email}, {$push: {login_failed: Date.now()}}, {new:true})
            return res.status(400).json({error: [{msg: "Invalid Username/Email"}]})
          }
          const token = {
            user : {
              id : userName.id,
              role: userName.role,
              subDistirict: userName.subDistirict,
              id_tournament: userName.id_tournament,
              is_active_peserta: userName.is_active_peserta
            }
          }
          const success =  await User.update({email}, {$unset: {login_failed: []}}, {multi:true})
          jwt.sign(token, 'jwtSecret', { expiresIn: "10h" }, (err, tokens) =>{
            if(err){
              res.json({
                success: false,
                data: err
              })
            }else{
              res.json({
                success: true,
                data: userName,
                tokens
              })
            }
          })
        }catch(err){
          res.status(500).json(err)
        }
    }
  //   static async LoginPeserta (req,res) {
  //     const errors = validationResult (req);
  //     if (!errors.isEmpty ()) {
  //       return res.status (400).json ({errors: errors.array()});
  //     }
  //     const{ email, password} = req.body
  //     try{
  //       const userName = await Peserta.findOne({email})
  //       console.log
  //       if(!userName){
  //         return res.status(400).json({msg:"Peserta Invalid"})
  //       }
  //       const matchPassword = await bcrypt.compare(password, userName.password)
  //       if(!matchPassword){
  //         return res.status(400).json({error: [{msg: "Invalid Username/Email"}]})
  //       }
  //       const token = {
  //         user : {
  //           id : userName.id,
  //           role: userName.role,
  //           username: userName.username,
  //           is_active_peserta: userName.is_active_peserta
  //         }
  //       }
  //       jwt.sign(token, 'jwtSecret', { expiresIn: "10h" }, (err, tokens) =>{
  //         if(err){
  //           res.json({
  //             success: false,
  //             data: err
  //           })
  //         }else{
  //           res.json({
  //             success: true,
  //             data: userName,
  //             tokens
  //           })
  //         }
  //       })

  //     }catch(err){
  //       res.status(500).json(err)
  //     }
  // }
}

module.exports = LoginMaster