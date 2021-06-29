const mongoose = require('mongoose')
const NotificationSchema = mongoose.Schema({

    type : {
        type : String,
        required : true
    },
    itemId : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true 
        
    },
    Status : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('approveNotification',NotificationSchema);