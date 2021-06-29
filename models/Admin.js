const mongoose = require('mongoose')
const Admin = mongoose.Schema({

    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Admin',Admin);