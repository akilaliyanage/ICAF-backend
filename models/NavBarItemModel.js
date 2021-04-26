const mongoose = require('mongoose')
const NavBarItemSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('NavBarItems',NavBarItemSchema);