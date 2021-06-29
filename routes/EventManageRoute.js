const router = require('express').Router();
let EventManage = require("../models/EventManage");



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

module.exports = router;