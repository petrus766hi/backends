var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    username : {type: String, required:true},
    password : {type: String, required:true},
    email : {type: String, required:true},
    subDistirict: {type: String, require: true},
    role : {
        type: String,
        enum : ['master','panitia'],
        default: 'panitia'
    },
    id_master: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ],
    id_tournament : [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Tournament'}
    ],
    is_active_peserta:{
        type: Boolean,
        // required: true,
        default: false
    }
});
module.exports = mongoose.model('User', UserSchema);