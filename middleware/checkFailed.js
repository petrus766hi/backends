const { translateAliases } = require('../model/user')
const User = require('../model/user')


module.exports = checkFailed = () => {
    return  async (req, res, next) =>{
        let minute = Math.floor(2*60*1000)
        try {
            const {email} = req.body
            const failed =  await User.findOne({email: email})
            const failedArr = failed.login_failed
            const lastItem = failedArr[failedArr.length-1]
            let dateNow = Math.floor(Date.now()-lastItem)
            if(failed.login_failed.length > 5 && dateNow < minute){
                return res.send({msg:'Maaf anda telah gagal login 5x dan Tunggu waktu 2 menit lalu login ulang'})
            }
            next()
        } catch (error) {

        }


    }
}