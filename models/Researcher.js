const mongoose = require('mongoose')
const QualificatonModel = require('./Qualification').schema
const MembershipModel = require('./Membership').schema
const PublicationModel = require('./Publication').schema

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
        required : false,
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
        required : false
    },
    pCity: {
        type : String,
        required : false
    },
    pState : {
        type : String,
        required : false,
    },
    pZip: {
        type : String,
        required : true
    },


    wPlace : {
        type : String,
        required : false
    },
    occupation : {
        type : String,
        required : false
    },
    wEmail : {
        type : String,
        required : false,
    },
    wCountryCode: {
        type : String,
        required : false
    },
    wPhone : {
        type : String,
        required : false,
    },
    wAddL1: {
        type : String,
        required : true
    },
    wAddL2: {
        type : String,
        required : false
    },
    wCity : {
        type : String,
        required : false,
    },
    wState: {
        type : String,
        required : false
    },
    wZip: {
        type : String,
        required : false
    },
    password : {
        type : String,
        required : true,
    },
            
    confPassword: {
        type : String,
        required : true
    },
    Approved: {
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