const tournament = require('../model/tournament')
const user = require('../model/user')
const tournamentDao = require('../dao/tournamentDao')
class TournamentController {
    static CreateTournament (req, res, next){
        const { NamaTournament, TypeTournament, JumlahPeserta, UsiaTournament,CodeTournament,Informasi,Pendaftaran } = req.body
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
                    SubDistrict: subDistirict,
                    Informasi: Informasi,
                    Pendaftaran:Pendaftaran

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
                        {upsert: true}
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
    static getAll(req, res, next){
        const currentPage = parseInt(req.query.currentPage) || 1
        const perPage = parseInt(req.query.perPage) || 20
        let sortBy = req.query.sortBy
            ? req.query.sortBy
            : "asc" ;
        let query = {
            perPage,
            currentPage,
            sortBy

        };
        tournamentDao.getAll(query)
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
    static getTournamentOne(req, res, next){
        let query = req.params.id
        tournamentDao.getTournamentId(query)
        .then((result)=>{
            res.status(201).json({
                success: true,
                msg: 'Get Tournament',
                data: result
            })
        })
        .catch((err)=>{
            res.status(500).json({
                success: false,
                msg: 'Gagal Get Tournament',
                data: err
             })
        })
    }
    static getPeserta(req, res, next){
        let query = req.params.id
        console.log(query)
        tournamentDao.getIdPeserta(query)
        .then((result)=>{
            res.status(200).json({
                success: true,
                msg: 'Get Tournament',
                data: result.Id_Peserta[0]
            })
        })
        .catch((err)=>{
            res.status(500).json({
                success: false,
                msg: 'Gagal Get Tournament',
                data: err
             })
        })
    }
}

module.exports = TournamentController