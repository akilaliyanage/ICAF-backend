const express = require('express');
const router = express.Router()

//importing models
const WorkshopModel = require('../models/Workshop')

//get today date
var today = new Date();
var year = today.getFullYear();
var mon = today.getMonth()+1;
var day = today.getDate();
var tDate =year+"-"+mon+"-"+day;



//get all workshops
router.route("/").get((req,res) => {

    WorkshopModel.find().populate('WorkCoordinator', 'name studyField email')
    .then( (workshops) =>{
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
        dateCreated: tDate,
        description: req.body.description,
        aproveStatus: "Not approved",
        document:req.body.document
    });

    // console.log(workshop)
    
    workshop.save().then(() => {
        res.json({status:200})
    }).catch((err) =>{
        console.log(err);
    })

})

//pending approvals
router.get('/pending',async (req,res) =>{
    try{
        const data = await WorkshopModel.find().populate('WorkCoordinator', 'name studyField email')
        const array = [];
        data.forEach(item => {
            item.aproveStatus == 'Not approved' ? array.push(item) : array.push()
        });
        res.json(array)
    }catch(err){
        res.json({message : err})
    }
    
})

//approved workshops
router.get('/approved',async (req,res) =>{
    try{
        const data = await WorkshopModel.find().populate('WorkCoordinator', 'name studyField email')
        const array = [];
        data.forEach(item => {
            item.aproveStatus == 'Approved' ? array.push(item) : array.push()
        });
        res.json(array)
    }catch(err){
        res.json({message : err})
    }
    
})

//update status of a workshop as approved
router.patch('/approve/:id',async (req,res) =>{
    try{
       const updatedWorkshop =  await WorkshopModel.updateOne({_id:req.params.id}, {$set : {aproveStatus : "Approved"}})
       res.json(updatedWorkshop)
    }catch(err){
        res.json(err)
    }
})

//update status of a workshop as declined
router.patch('/decline/:id',async (req,res) =>{
    try{
       const updatedWorkshop =  await WorkshopModel.updateOne({_id:req.params.id}, {$set : {aproveStatus : "Declined"}})
       res.json(updatedWorkshop)
    }catch(err){
        res.json(err)
    }
})

module.exports = router;