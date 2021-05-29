const mongoose = require('mongoose')
const NormalUser = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email :{
        type : String,
        requied : true
    },
    proImg : {
        type : String,
        required : false
    }
})

module.exports = mongoose.model('NormalUser',NormalUser);