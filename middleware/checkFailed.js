const { translateAliases } = require('../model/user')
const User = require('../model/user')

module.exports = checkFailed = () => {
    return  async (req, res, next) =>{
        try {
            const {email} = req.body
            const aa =  await User.findOne({email: email})
            if(aa.login_failed.length >= 5){
                console.log('xxx', aa)
            }
        } catch (error) {

        }


    }
}