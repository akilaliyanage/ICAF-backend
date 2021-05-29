const mongoose = require('mongoose')

const PublicationModel = mongoose.Schema({

    publication: {
        type : String,
        required : true
    },
    source: {
        type : String,
        required : true
    },
    pubYear : {
        type : String,
        required : true,
    },
    pubURL : {
        type : String,
        required : true,
    }
})
module.exports = mongoose.model('PublicationModel',PublicationModel);