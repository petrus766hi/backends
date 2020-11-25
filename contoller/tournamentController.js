const tournament = require('../model/tournament')
const user = require('../model/user')
const tournamentDao = require('../dao/tournamentDao')
class TournamentController {
    static CreateTournament (req, res, next){
        const { NamaTournament, TypeTournament, JumlahPeserta, UsiaTournament,CodeTournament } = req.body
        const {role, id, subDistirict,id_tournament} = req.user
        const checkTournament = id_tournament.filter((e)=> {
          return e.CodeTournament === req.body.CodeTournament
        }).length
        if(checkTournament > 0){
            return res.send({msg: 'Tournament Sudah Terdaftar'})
        }else{
            if(role === "panitia"){
                tournament.create({
                    NamaTournament : NamaTournament,
                    TypeTournament : TypeTournament,
                    JumlahPeserta : JumlahPeserta,
                    UsiaTournament: UsiaTournament,
                    CodeTournament: CodeTournament,
                    Id_Panitia: id,
                    SubDistrict: subDistirict
                })
                .then((result) =>{
                    res.status(201).json({
                        success: true,
                        msg: 'Membuat Tournament',
                        data: result
                    })
                    return user.findByIdAndUpdate(id,
                        {
                            $push:{
                              id_tournament: result._id
                            }
                        },
                        {new: true}
                    )

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
    static getAllTournament(req, res, next){
        tournamentDao.getAllTournament()
        .then((result)=>{
            res.status(200).json({
                success: true,
                msg: 'Get All Tournament',
                data: result
            })
        })
        .catch((err)=>{
            res.status(500).json({
                success: false,
                msg: 'Gagal Get All Tournament',
                data: err
             })
        })
    }

    static updateTournament(req, res, next){
        let query = req.params.id
        let tourObj ={
            Deskripsi : req.body.Deskripsi,
            Is_active : req.body.Is_active
        }
        tournamentDao.updateTournament(query, tourObj)
        .then((result)=>{
            res.status(201).json({
                success: true,
                msg: 'Update Tournament',
                data: result
            })
        })
        .catch((err)=>{

            res.status(500).json({
                success: false,
                msg: 'Gagal Update Tournament',
                data: err
             })
        })
    }
}

module.exports = TournamentController