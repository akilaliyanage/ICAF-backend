const router = require('express').Router();
let EventDate= require("../models/EventDateModel");
const EditorNotificationModel = require('../models/EditorNotificationModel')
const AboutModel = require('../models/AboutModel')
const EventTopic = require('../models/EventTopic')
const KeyNote = require('../models/KeynoteSpeak')
const News = require('../models/NewsItem')
const Admin = require('../models/Admin')
const {ObjectId} = require("bson");


router.post('approve/date',async (req,res) =>{

    const editID = req.body.editID;
    const item = new EventDate({
        date : req.body.date,
        adminApproved : 'yes',
        latest: 'yes'
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

router.post('approve/about',async (req,res) =>{

    const editID = req.body.editID;
    const item = new AboutModel({
        des : req.body.about,
        CreatedDate : new Date().toLocaleString().replace(',',''),
        adminApproved : 'yes',
        latest: 'yes'
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

router.post('approve/topic',async (req,res) =>{

    const editID = req.body.editID;
    const item = new EventTopic({
        topic : req.body.title,
        SubTopic:req.body.subTopic,
        datemonth:req.body.dateMonth,
        venue:req.body.venue,
        date : new Date().toLocaleString().replace(',',''),
        adminApproved : 'yes',
        latest: 'yes'
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

router.post('approve/keynote',async (req,res) =>{

    const editID = req.body.editID;
    const item = new KeyNote({
        des : req.body.description,
        name:req.body.name,
        image:req.body.profileImage,
        date : new Date().toLocaleString().replace(',',''),
        adminApproved : 'yes',
        latest: 'yes'
    })

    // await KeyNote.updateMany({},{$set:{latest:"no"}});

    item.save().then(() =>{
        EditorNotificationModel.updateOne({_id:editID},{$set:{approved:"yes","data.adminApproved":"yes"}}).then(() =>{
            res.json({status: 200})
        })
    }).catch(err =>{
        res.json(err)
    });
})

router.post('approve/news',async (req,res) =>{

    const editID = req.body.editID;
    const item = new News({
        des : req.body.description,
        name: req.body.name,
        image: req.body.image,
        date : new Date().toLocaleString().replace(',',''),
        edate: req.body.edate,
        url: req.body.newsUrl,
        adminApproved : 'yes',
        latest: 'yes'
    })

    // await KeyNote.updateMany({},{$set:{latest:"no"}});

    item.save().then(() =>{
        EditorNotificationModel.updateOne({_id:editID},{$set:{approved:"yes","data.adminApproved":"yes"}}).then(() =>{
            res.json({status: 200})
        })
    }).catch(err =>{
        res.json(err)
    });
})

router.route("/delete/:ID").delete(async (req,res) =>{

    let ID = req.params.ID;
    await EditorNotificationModel.findByIdAndDelete(ID).then(() => {
        res.json({status:200});
    }).catch((err) => {
        console.log(err);

    })

})

router.post('/login',async (req,res) =>{

    let username = req.body.username;
    let password = req.body.password;

    Admin.find({username:username,password:password}).then((admin) => {
        if(admin.length) {
            res.json({status: 200, user: admin});
        }
        else {
            res.json({status: 400});
        }
    }).catch((err) => {
        console.log(err);
    })


})



module.exports = router;