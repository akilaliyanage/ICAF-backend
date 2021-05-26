const mongoose = require('mongoose')
const EditorNotification = mongoose.Schema({
    date : {
        type : String,
        required : true
    },
    cacheName : {
        type : String,
        required : true
    },
    approved: {
        type: String,
        required : true
    },
    data : {
        type : Object,
        required : true
    }
})

module.exports = mongoose.model('EditorNotification',EditorNotification);