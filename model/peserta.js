var mongoose = require('mongoose');
var PesertaSchema = new mongoose.Schema({
    username : {type: String, required:true},
    password : {type: String, required:true},
    email : {type: String, required:true},
    birthdate: { type: Date, required: true},
    phoneNumber: {type: Number, required: true},
    role : {
        type: String,
        type: String,
        enum : ['peserta'],
        default: 'peserta'
    },
    id_tournament : [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Tournament'}
    ],
    is_active_peserta:{
        type: Boolean,
        // required: true,
        default: false
    },
    reset_password:{
        type: String,
        default: ''
    }
});
module.exports = mongoose.model('Peserta', PesertaSchema);