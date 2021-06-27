const express = require('express')
const router = express.Router()
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

//importing models
const AboutModel = require('../models/AboutModel')
const EditorNotificationModel = require('../models/EditorNotificationModel')

router.get('/',async (req,res) =>{
    try{
        const items = await AboutModel.find({latest : 'yes',adminApproved : 'yes'})
        res.json(items)
    }catch(err){
        res.json({message : err})
    }
    
})

router.post('/',(req,res) =>{
    const item = new AboutModel({
        des : req.body.des,
        CreatedDate : new Date().toLocaleString().replace(',',''),
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

    myCache.del( "aboutEdit" );
    var value = myCache.get( "aboutEdit" );
    console.log(value)

    if ( value == undefined ){
        // set new values

        const item = new AboutModel({
            des : req.body.des,
            CreatedDate : new Date().toLocaleString().replace(',',''),
            latest : 'yes',
            adminApproved : 'no'
        })

        const success = myCache.set( "aboutEdit", item, 172800000 );

       if(success){
           //deleating all the db data relevent to about from notification table

           const rslt = await EditorNotificationModel.deleteMany({cacheName : 'aboutEdit'})

        const noti = new EditorNotificationModel({
            date : new Date().toLocaleString().replace(',',''),
            cacheName : 'aboutEdit',
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

    value = myCache.get( "aboutEdit" );
    console.log("new value" , value)
    console.log(new Date().toLocaleString().replace(',',''));
})

module.exports = router;