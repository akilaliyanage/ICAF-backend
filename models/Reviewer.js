const mongoose = require('mongoose')
const ReviewerSchema = mongoose.Schema({

    profileImage:{
        type: String,
        required: true
    },
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    password: {
        type: String,
        required : true
    }
})

module.exports = mongoose.model('Reviewer',ReviewerSchema);