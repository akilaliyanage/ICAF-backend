const mongoose = require('mongoose')

const QualificatonModel = mongoose.Schema({

    degreeName: {
        type : String,
        required : true
    },
    UniName: {
        type : String,
        required : true
    },
    qualiYear : {
        type : String,
        required : true,
    }
})
module.exports = mongoose.model('QualificatonModel',QualificatonModel);