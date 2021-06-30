const router = require('express').Router();
const EventManage = require("../models/EventManage");
const Workshop = require('../models/Workshop');
const Research = require('../models/ResearchPaperModel');
const Participation = require('../models/NormalUser');




router.post("/",async(req,res) => {

    const eventManage = new EventManage({

        WorkshopLimit : req.body.workshopLimit,
        ResearchLimit : req.body.researchLimit,
        ParticipateLimit : req.body.participateLimit

    });

    await EventManage.remove();

    eventManage.save().then(() => {
        res.json({status:200})
    }).catch((err) =>{
        console.log(err);
    })

})

router.route("/").get((req,res) => {

    EventManage.find().then( (result) =>{

        res.json(result);

    }).catch((err) => {
        console.log(err);
    })

})

router.route("/workshop").get((req,res) => {

            Workshop.countDocuments({ aproveStatus:'Approved' },function(err, c) {
                res.json({count:c});
            }).catch((err) => {
                console.log(err);
            })
})

router.route("/research").get((req,res) => {

    Research.countDocuments({ isApproved:'Approved' },function(err, c) {
        res.json({count:c});
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/participation").get((req,res) => {

    Participation.countDocuments(function(err, c) {
        res.json({count:c});
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/research-papers").get((req,res) => {

    Research.find().then( (result) =>{

        res.json(result);

    }).catch((err) => {
        console.log(err);
    })

})

module.exports = router;