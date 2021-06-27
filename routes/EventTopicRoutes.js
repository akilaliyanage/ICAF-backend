const express = require('express')
const router = express.Router()
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

//importing models
const EventTopic = require('../models/EventTopic')
const EditorNotificationModel = require('../models/EditorNotificationModel')

router.get('/',async (req,res) =>{
    try{
        const items = await EventTopic.find({latest : 'yes',adminApproved : 'yes'})
        res.json(items)
    }catch(err){
        res.json({message : err})
    }
    
})

router.post('/',(req,res) =>{
    const item = new EventTopic({
        date : new Date().toLocaleString().replace(',',''),
        latest : 'no',
        adminApproved : 'no',
        topic : req.body.topic,
        SubTopic : req.body.SubTopic,
        datemonth : req.body.datemonth,
        venue : req.body.venue
    })

    item.save().then(data =>{
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})

router.post('/sendToAdmin',async (req,res) =>{

    myCache.del( "eventTopic" );
    var value = myCache.get( "eventTopic" );
    console.log(req.body)

    if ( value == undefined ){
        // set new values

        const item = new EventTopic({
            date : new Date().toLocaleString().replace(',',''),
            latest : "yes",
            adminApproved : "no",
            topic : req.body.topic,
            SubTopic : req.body.SubTopic,
            datemonth : req.body.datemonth,
            venue : req.body.venue,
            url : req.body.url
        })

        const success = myCache.set( "eventTopic", item, 172800000 );

       if(success){
           //deleating all the db data relevent to about from notification table

           const rslt = await EditorNotificationModel.deleteMany({cacheName : 'eventTopic'})

        const noti = new EditorNotificationModel({
            date : new Date().toLocaleString().replace(',',''),
            cacheName : 'eventTopic',
            approved : 'no',
            data : item
        })

        noti.save().then(data =>{
            res.status(201).send({"message" : "success"})
        }).catch(err =>{
            res.json(err)
        })
       }

    }

    value = myCache.get( "eventTopic" );
    console.log("new value" , value)
})

module.exports = router;