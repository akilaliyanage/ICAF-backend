const express = require('express')
const router = express.Router()

const ResearchPaperModel = require('../models/ResearchPaperModel')

const Notification = require('./Services/NotificationHelper');

router.post('/',async (req,res) =>{

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

    await researchPaper.save().then(async (data) =>{
        console.log('Successfully saved' , data);
        var addNotification = await Notification.saveNotification("Research-Paper" , data._id , data.researcherId , 'pending')
        data.Noti = addNotification;
        res.status(200).send({data: data})
    }).catch(err =>{
        console.log(err)
        res.status(500).send({error: err.message})
    })
})

module.exports = router;