const mongoose = require('mongoose')
const QualificatonModel = require('../models/QualificatonModel')
const MembershipModel = require('../models/MembershipModel')
const PublicationModel = require('../models/PublicationModel')

const ResearcherModel = mongoose.Schema({
    fName : {
        type : String,
        required : true
    },
    lName : {
        type : String,
        required : true
    },
    mName : {
        type : String,
        required : true,
    },
    NIC: {
        type : String,
        required : true
    },
    pEmail : {
        type : String,
        required : true,
    },
    pCountryCode: {
        type : String,
        required : true
    },
    pPhone: {
        type : String,
        required : true
    },
    pAddL1 : {
        type : String,
        required : true,
    },
    pAddL2: {
        type : String,
        required : true
    },
    pCity: {
        type : String,
        required : true
    },
    pState : {
        type : String,
        required : true,
    },
    pZip: {
        type : String,
        required : true
    },


    wPlace : {
        type : String,
        required : true
    },
    occupation : {
        type : String,
        required : true
    },
    wEmail : {
        type : String,
        required : true,
    },
    wCountryCode: {
        type : String,
        required : true
    },
    wPhone : {
        type : String,
        required : true,
    },
    wAddL1: {
        type : String,
        required : true
    },
    wAddL2: {
        type : String,
        required : true
    },
    wCity : {
        type : String,
        required : true,
    },
    wState: {
        type : String,
        required : true
    },
    wZip: {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
    },
            
    confPassword: {
        type : String,
        required : true
    },

    qualifications: {
        type : [QualificatonModel],
        required : true
    },
    memberships: {
        type : [MembershipModel],
        required : true
    },
    publications : {
        type : [PublicationModel],
        required : true,
    }
})

module.exports = mongoose.model('ResearcherModel',ResearcherModel);