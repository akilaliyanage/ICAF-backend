const mongoose = require('mongoose')
const WorkshopSchema = mongoose.Schema({

    title : {
        type : String,
        required : true
    },
    eventDate : {
        type : String,
        required : true
    },
    conductor : {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'WorkCoordinator' 
        
    },
    dateCreated : {
        type : String,
        required : true
    },
    description: {
        type: String,
        required: true
    },
    aproveStatus: {
        type: String,
        required : true
    },
    document: {
        type: String,
        required : true
    }

})

module.exports = mongoose.model('Workshop',WorkshopSchema);