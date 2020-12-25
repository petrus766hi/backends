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
        type: Number,
        required: true
    },
    CodeTournament : {
        type: mongoose.Schema.Types.ObjectId, ref:'Lomba',
        required: true
    },
    Id_Panitia : [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    Informasi : {
        type: String,
        required: true
    },
    Pendaftaran : {
        type: String,
        required: true
    },
    Id_Peserta : [{
        id : {
            type: mongoose.Schema.Types.ObjectId, ref: 'Peserta'
        },
        name: { type: String, },
        fase1: {type: Number, },
        fase2: {type: Number, },
        fase3: {type: Number, },
    }],
    Is_active:{
        type: Boolean,
        required: true,
        default: false
    }


})
module.exports = mongoose.model('Tournament', TournamentSchema);