const mongoose = require('mongoose')
const EventTopic = mongoose.Schema({
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
    },
    topic : {
        type : String,
        required : true
    },
    SubTopic : {
        type : String,
        required : true
    },
    datemonth : {
        type : String,
        required : true
    },
    venue : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('EventTopic',EventTopic);