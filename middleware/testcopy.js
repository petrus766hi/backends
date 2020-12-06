const user = require('../model/user')
module.exports = checkRole = async (req, res, next) => {
    try {
        const aa = await user.find()
        console.log('xxx', aa)
        if(aa.length > 0){
            setTimeout(()=>{
                console.log('jalan cuy')
            }, 3000)
        }
        next()
    } catch (error) {

    }
}