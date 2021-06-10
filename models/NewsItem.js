const mongoose = require('mongoose')
const NewsItemSchema = mongoose.Schema({
    date : {
        type : Date,
        required : true
    },
    des : {
        type : String,
        required : true
    },
    url: {
        type: String,
        required : true
    },
    adminApproved: {
        type: String,
        required : true
    }
})

module.exports = mongoose.model('NewsItemSchema',NewsItemSchema);