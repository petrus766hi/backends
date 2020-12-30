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
    phoneNumber: {
        type: Number,
        required: function(){
            if(this.role == 'peserta'){
                return true
            }
        }
    },
    birthdate: {
        type: Date,
        required: function(){
            if(this.role == 'peserta'){
                return true
            }
        }
    },
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
        default: function(){
            if(this.role == 'panitia'){
                return true
            }else{
                return false
            }
        }
    },
    reset_password:{
        data: String,
        default: ''
    },
    register:{
        type: Boolean,
        default: false
    },
    login_failed:[
        {
            type: Number,
            default: Date.now(),

        },
    ],
    is_group :[
        {
            name: String,
            handphone: Number
        }
    ]
}, {timestamps: true});
module.exports = mongoose.model('User', UserSchema);