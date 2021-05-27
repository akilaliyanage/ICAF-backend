const router = require('express').Router();
let EventDate= require("../models/EventDateModel");
const EditorNotificationModel = require('../models/EditorNotificationModel')
const AboutModel = require('../models/AboutModel')
const EventTopic = require('../models/EventTopic')
const {ObjectId} = require("bson");


router.post('/date',async (req,res) =>{

    const editID = req.body.editID;
    const item = new EventDate({
        date : req.body.date,
        adminApproved : 'yes',
        latest: 'yes;'
    })

    await EventDate.updateMany({},{$set:{latest:"no"}});

    item.save().then(() =>{
        EditorNotificationModel.updateOne({_id:editID},{$set:{approved:"yes","data.adminApproved":"yes"}}).then(() =>{
            res.json({status: 200})
        })
    }).catch(err =>{
        res.json(err)
    });
})

router.post('/about',async (req,res) =>{

    const editID = req.body.editID;
    const item = new AboutModel({
        des : req.body.about,
        CreatedDate : new Date().toLocaleString().replace(',',''),
        adminApproved : 'yes',
        latest: 'yes;'
    })

    await AboutModel.updateMany({},{$set:{latest:"no"}});

    item.save().then(() =>{
        EditorNotificationModel.updateOne({_id:editID},{$set:{approved:"yes","data.adminApproved":"yes"}}).then(() =>{
            res.json({status: 200})
        })
    }).catch(err =>{
        res.json(err)
    });
})

router.post('/topic',async (req,res) =>{

    const editID = req.body.editID;
    const item = new EventTopic({
        topic : req.body.topic,
        subTopic:req.body.subTopic,
        datemonth:req.body.dateMonth,
        Venue:req.body.venue,
        date : new Date().toLocaleString().replace(',',''),
        adminApproved : 'yes',
        latest: 'yes;'
    })

    await EventTopic.updateMany({},{$set:{latest:"no"}});

    item.save().then(() =>{
        EditorNotificationModel.updateOne({_id:editID},{$set:{approved:"yes","data.adminApproved":"yes"}}).then(() =>{
            res.json({status: 200})
        })
    }).catch(err =>{
        res.json(err)
    });
})

module.exports = router;