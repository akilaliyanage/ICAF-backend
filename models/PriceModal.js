const mongoose = require('mongoose')
const PriceModal = mongoose.Schema({
    date : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    userType : {
        type : String,
        required : true
    }

})

module.exports = mongoose.model('Price',PriceModal);