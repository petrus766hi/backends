module.exports = checkStatus =  (roles) => {
    return  (req, res, next) =>{
        if(!roles.includes(req.user.is_active_peserta)){
            return res.send({msg : 'Maaf Kamu Belum Aktif'})
        }
        next()
    }
}