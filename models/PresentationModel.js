const mongoose = require('mongoose')

const PresentationModel = mongoose.Schema({
    presentationName : {
        type : String,
        required : true
    },
    researcherId : {
        type : String,
        required : true
    },
    dateTime : {
        type : String,
        required : true,
    },
    
    meetingLink : {
        type : String,
        required : false,
    },
    
    researchPaperId : {
        type : String,
        required : true,
    },
    presentationLink : {
        type : Number,
        required : true,
    },
    status : {
        type : String,
        required : true,
    },
    
})

module.exports = mongoose.model('Presentations',PresentationModel);