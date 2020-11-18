var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    username : {type: 'String', required:true},
    password : {type: 'String', required:true},
    email : {type: 'String', required:true},
    subDistirict: {type: 'String', require: true},
    role : {type: 'String'},
    id_master: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    id_tournament : [{type: mongoose.Schema.Types.ObjectId, ref: 'tournament'}]
});
module.exports = mongoose.model('User', UserSchema);