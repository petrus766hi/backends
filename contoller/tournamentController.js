const tournament = require('../model/tournament')
const user = require('../model/user')
class TournamentController {
    static CreateTournament (req, res, next){
        const { NamaTournament, TypeTournament, JumlahPeserta, UsiaTournament } = req.body
        const {role, id, subDistirict} = req.user
        if(role == "panitia"){
            tournament.create({
                NamaTournament : NamaTournament,
                TypeTournament : TypeTournament,
                JumlahPeserta : JumlahPeserta,
                UsiaTournament: UsiaTournament,
                Id_Panitia: id,
                SubDistrict: subDistirict
            })
            .then((result) =>{
                res.status(201).json({
                    success: true,
                    msg: 'Membuat Tournament',
                    data: result
                })
                return user.findByIdAndUpdate(id, {id_tournament: result._id})

            })
            .catch((err)=>{
                res.status(500).json({
                   success: false,
                   msg: 'Gagal Membuat Tournament',
                   data: err
                })
            })
        }else{
            return res.send({msg: "Maaf Kamu Bukan Panitia"})
        }

    }
}

module.exports = TournamentController