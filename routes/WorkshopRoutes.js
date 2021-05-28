const express = require('express');
const router = express.Router()

//importing models
const WorkshopModel = require('../models/Workshop')



//get all workshops
router.route("/").get((req,res) => {

    WorkshopModel.find().then( (workshops) =>{
        res.json(workshops);
    }).catch((err) => {
        console.log(err);
    })

})

//create a workshop
router.post('/create',async(req,res) => {

    const workshop = new WorkshopModel({

        title: req.body.title,
        eventDate: req.body.eventDate,
        conductor : req.body.conductor,
        dateCreated:  req.body.dateCreated
    });

    workshop.save().then(() => {
        res.json({status:200})
    }).catch((err) =>{
        console.log(err);
    })

})

module.exports = router;