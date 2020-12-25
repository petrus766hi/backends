var mongoose = require('mongoose');
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
var UserSchema = new mongoose.Schema({
    username : {type: String, required:true},
    password : {type: String, required:true},
    email : {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate:[validateEmail, 'Pastikan email anda dengan benar']
    },
    subDistirict: {type: String, require: true},
    birthdate: { type: Date, required: true},
    role : {
        type: String,
        enum : ['master','panitia', 'peserta'],
        default: 'peserta'
    },
    id_tournament : [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Tournament'}
    ],
    is_active_peserta:{
        type: Boolean,
        default: false
    },
    reset_password:{
        data: String,
        default: ''
    },
    register:{
        type: Boolean,
        default: false
    },
    login_failed:[{
        type: Number,
        default: 0
    }],

});
module.exports = mongoose.model('User', UserSchema);