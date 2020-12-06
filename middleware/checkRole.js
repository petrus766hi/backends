module.exports = checkRole =  (...roles) => {
    return  (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            console.log('xxx', roles.includes(req.user.role))
        }
        console.log('tidak sama')
    }
}