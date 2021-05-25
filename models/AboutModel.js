const mongoose = require('mongoose')
const AboutSchema = mongoose.Schema({
    des : {
        type : String,
        required : true
    },
    CreatedDate : {
        type : Date,
        required : true
    },
    latest : {
        type : String,
        required : true,
    }
})

module.exports = mongoose.model('AboutModel',AboutSchema);