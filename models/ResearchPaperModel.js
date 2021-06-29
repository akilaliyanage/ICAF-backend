const mongoose = require('mongoose')

const ResearchPaperModel = mongoose.Schema({
    paperName : {
        type : String,
        required : true
    },
    researcherName : {
        type : String,
        required : true
    },
    researchArea : {
        type : String,
        required : true,
    },
    
    description : {
        type : String,
        required : false,
    },
    
    researchPaper : {
        type : String,
        required : true,
    },
    noOfPages : {
        type : Number,
        required : true,
    },
    Institute : {
        type : String,
        required : false,
    },
    isApproved : {
        type : String,
        required : true,
    },
    researcherId : {
        type : String,
        required : true,
    },
    
})

module.exports = mongoose.model('ResearchPaperModel',ResearchPaperModel);