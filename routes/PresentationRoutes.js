const express = require('express')
const router = express.Router()
const config = require('../secret.json')

const PresentationModel = require('../models/PresentationModel')

router.post('/', async (req,res) =>{

    const presentation = new PresentationModel({

            Approved: false,
            
            presentationName : req.body.presentationName,
            researcherId : req.body.researcherId, 
            dateTime : req.body.dateTime, 
            meetingLink : req.body.meetingLink, 
            researchPaperId : req.body.researchPaperId, 
            presentationLink : req.body.presentationLink, 
            status : req.body.status
    })

    await presentation.save().then(data =>{
        console.log('Successfully saved')
        res.status(200).send({data: data})
    }).catch(err =>{
        console.log(err)
        res.status(500).send({error: err.message})
    })
})