const express = require('express')
const router = express.Router()
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

//importing models
const EventDate = require('../models/EventDateModel')
const EditorNotificationModel = require('../models/EditorNotificationModel')

router.get('/',async (req,res) =>{
    try{
        const items = await EventDate.find({latest : 'yes',adminApproved : 'yes'})
        res.json(items)
    }catch(err){
        res.json({message : err})
    }
    
})

router.post('/',(req,res) =>{
    const item = new EventDate({
        date : new Date('2021-05-25T15:34 ').toLocaleString().replace(',',''),
        latest : 'no',
        adminApproved : 'no'
    })

    item.save().then(data =>{
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})

router.post('/sendToAdmin',async (req,res) =>{

    myCache.del( "eventDate" );
    var value = myCache.get( "eventDate" );
    console.log(value)

    if ( value == undefined ){
        // set new values

        const item = new EventDate({
            date : new Date(req.body.date).toLocaleString().replace(',',''),
            latest : req.body.latest,
            adminApproved : req.body.adminApproved
        })

        const success = myCache.set( "eventDate", item, 172800000 );

       if(success){
           //deleating all the db data relevent to about from notification table

           const rslt = await EditorNotificationModel.deleteMany({cacheName : 'eventDate'})

        const noti = new EditorNotificationModel({
            date : new Date().toLocaleString().replace(',',''),
            cacheName : 'eventDate',
            approved : 'no'
        })

        noti.save().then(data =>{
            res.json(data)
        }).catch(err =>{
            res.json(err)
        })
       }

    }

    value = myCache.get( "eventDate" );
    console.log("new value" , value)
})

module.exports = router;