const mongoose = require('mongoose')
const EventManageSchema = mongoose.Schema({

    WorkshopLimit : {
        type : Number,
        required : true
    },
    ResearchLimit : {
        type : Number,
        required : true
    },
    ParticipateLimit : {
        type : Number,
        required : true
    }

})

module.exports = mongoose.model('eventManage',EventManageSchema);