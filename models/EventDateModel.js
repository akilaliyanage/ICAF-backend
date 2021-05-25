const mongoose = require('mongoose')
const EventDate = mongoose.Schema({
    date : {
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
    }
})

module.exports = mongoose.model('EventDate',EventDate);