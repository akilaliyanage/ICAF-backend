const express = require('express')
const router = express.Router()

const QualificatonModel = require('../models/Qualification')
const MembershipModel = require('../models/Membership')
const PublicationModel = require('../models/Publication')
const ResearcherModel = require('../models/Researcher')

router.post('/',(req,res) =>{

    publicationList = req.body.publications,
    membershipsList = req.body.memberships,
    qualificationsList = req.body.qualifications

    const researcher = new ResearcherModel({

            Approved: false,
            
            fName : req.body.fName,
            lName : req.body.lName, 
            mName : req.body.mName, 
            NIC : req.body.NIC, 
            pEmail : req.body.pEmail, 
            pCountryCode : req.body.pCountryCode, 
            pPhone : req.body.pPhone,
            pAddL1 : req.body.pAddL1, 
            pAddL2 : req.body.pAddL2, 
            pCity : req.body.pCity, 
            pState : req.body.pState, 
            pZip : req.body.pZip,

            wPlace : req.body.wPlace,
            occupation : req.body.occupation,
            wEmail : req.body.wEmail,
            wCountryCode : req.body.wCountryCode,
            wPhone : req.body.wPhone,
            wAddL1 : req.body.wAddL1,
            wAddL2 : req.body.wAddL2,
            wCity : req.body.wCity,
            wState : req.body.wState,
            wZip : req.body.wZip,

            password : req.body.password,
            confPassword : req.body.confPassword,

            publicationList : req.body.publications,
            membershipsList : req.body.memberships,
            qualificationsList : req.body.qualifications
    })

    researcher.save().then(data =>{
        console.log('Successfully saved')
        res.json(data)
    }).catch(err =>{
        console.log(err)
        res.json(err)
    })
})

module.exports = router;