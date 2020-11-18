const user = require('../model/user')
const bcrypt = require ('bcryptjs');
const saltRounds = 10;

class MasterController {
    static createMaster (req, res, next){
        bcrypt.hash (req.body.password, saltRounds, function (err, hash) {
            const {username, email, subDistirict, role} = req.body
            user.create({
                username : username,
                password : hash,
                email : email,
                subDistirict: subDistirict,
                role : role,
                id_master: null
            })
            .then((result) =>{
                res.status(201).json({
                    status: true,
                    data: result
                })
            })
            .catch((err)=>{
                next(err)
            })
        })

    }
}

module.exports = MasterController