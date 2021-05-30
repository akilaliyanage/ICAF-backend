const express = require('express');
const router = express.Router()

//importing models
const WorkshopModel = require('../models/Workshop')

const today = Date(Date.now());

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
        dateCreated: today,
        desciption: req.body.desciption,
        aproveStatus: "Not approved"
    });

    console.log(workshop)
    
    workshop.save().then(() => {
        res.json({status:200})
    }).catch((err) =>{
        console.log(err);
    })

})

//pending approvals
router.get('/pending',async (req,res) =>{
    try{
        const data = await WorkshopModel.find()
        const array = [];
        data.forEach(item => {
            item.aproveStatus == 'Not approved' ? array.push(item) : array.push()
        });
        res.json(array)
    }catch(err){
        res.json({message : err})
    }
    
})


//update status of a workshop
router.patch('/:id',async (req,res) =>{
    try{
       const updatedWorkshop =  await WorkshopModel.updateOne({_id:req.params.id}, {$set : {aproveStatus : "Approved"}})
       res.json(updatedWorkshop)
    }catch(err){
        res.json(err)
    }
})

module.exports = router;