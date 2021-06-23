const mongoose = require('mongoose')
const WorkCoordinatorSchema = mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    studyField : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password: {
        type: String,
        required : true
    }
})

module.exports = mongoose.model('WorkCoordinator',WorkCoordinatorSchema);