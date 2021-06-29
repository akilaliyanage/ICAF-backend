const express = require('express')
const router = express.Router()

const ResearchPaperModel = require('../models/ResearchPaperModel')

router.post('/',(req,res) =>{

    const researchPaper = new ResearchPaperModel({

            isApproved: "pending",
            
            paperName : req.body.paperName,
            researcherId : req.body.researcherId,
            researcherName : req.body.researcherName, 
            researchArea : req.body.researchArea, 
            description : req.body.description, 
            researchPaper : req.body.researchPaper, 
            noOfPages : req.body.noOfPages, 
            Institute : req.body.Institute
    })

    researchPaper.save().then(data =>{
        console.log('Successfully saved')
        res.json(data)
    }).catch(err =>{
        console.log(err)
        res.json(err)
    })
})

module.exports = router;