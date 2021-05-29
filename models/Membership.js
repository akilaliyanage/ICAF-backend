const mongoose = require('mongoose')

const MembershipModel = mongoose.Schema({

    membership: {
        type : String,
        required : true
    }
})
module.exports = mongoose.model('MembershipModel',MembershipModel);