module.exports = checkRole =  (...roles) => {
    return  (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            return res.send({msg : 'Bukan Sesuai Role nya'})
        }
        next()
    }
}