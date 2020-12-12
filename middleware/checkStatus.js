module.exports = checkStatus =  (roles) => {
    return  (req, res, next) =>{
        console.log('xxx',req.user.is_active_peserta)
        if(!roles.includes(req.user.is_active_peserta)){
            return res.send({msg : 'Maaf Kamu Belum Aktif'})
        }
        next()
    }
}