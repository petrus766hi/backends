var mongoose = require('mongoose');
var LombaSchema = new mongoose.Schema({
    id:{type: Number, required:true},
    nama: {type: String, required: true},
    code:{type: String, required: true}

});
module.exports = mongoose.model('Lomba', LombaSchema);