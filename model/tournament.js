const mongoose = require('mongoose')
const TournamentSchema = new mongoose.Schema({
    NamaTournament : {
        type: String,
        required: true
    },
    TypeTournament : {
        type: String,
        required: true
    },
    JumlahPeserta : {
        type: Number,
        required: true,
        max: 100
    },
    SubDistrict : {
        type: String,
        required: true
    },
    UsiaTournament : {
        type: String,
        required: true
    },
    CodeTournament : {
        type: String,
        required: true
    },
    Id_Panitia : [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    Deskripsi : {
        type: String,
        // required: true
    },
    Id_Peserta : [{
        id : {
            type: mongoose.Schema.Types.ObjectId, ref: 'Peserta'
        },
        name: { type: String, },
        fase1: {type: Number, default:0},
        fase2: {type: Number, default:0},
        fase3: {type: Number, default:0},
    }],
    Is_active:{
        type: Boolean,
        required: true,
        default: false
    }


})
module.exports = mongoose.model('Tournament', TournamentSchema);