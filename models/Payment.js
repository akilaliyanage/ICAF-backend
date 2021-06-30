const mongoose = require('mongoose')
const Payment = mongoose.Schema({
    date : {
        type : String,
        required : true
    },
    cardName : {
        type : String,
        required : true
    },
    cardNo : {
        type : String,
        required : true
    },
    month : {
        type : String,
        required : true
    },
    year : {
        type : String,
        required : true
    },
    cvv : {
        type : String,
        required : true
    },
    zip : {
        type : String,
        required : true
    },
    userid : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    
})

module.exports = mongoose.model('Payment',Payment);