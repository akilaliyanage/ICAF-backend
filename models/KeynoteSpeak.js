const mongoose = require('mongoose')
const KeynoteSpeak = mongoose.Schema({
    des : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    latest : {
        type : String,
        required : true,
    },
    adminApproved : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
})

module.exports = mongoose.model('KeynoteSpeak',KeynoteSpeak);