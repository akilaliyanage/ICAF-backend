const express = require('express')
const router = express.Router()
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

//importing models
const Keynote = require('../models/KeynoteSpeak')
const EditorNotificationModel = require('../models/EditorNotificationModel')

router.get('/',async (req,res) =>{
    try{
        const items = await Keynote.find({latest : 'yes',adminApproved : 'yes'}).sort('-date').limit(4)
        res.json(items)
    }catch(err){
        res.json({message : err})
    }
    
})

router.post('/',(req,res) =>{
    const item = new Keynote({
        des : req.body.des,
        name : req.body.name,
        image : req.body.image,
        date : new Date().toLocaleString().replace(',',''),
        latest : 'yes',
        adminApproved : 'yes'
    })

    item.save().then(data =>{
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})

router.post('/sendToAdmin',async (req,res) =>{

    myCache.del( "Keynote" );
    var value = myCache.get( "Keynote" );
    console.log(value)

    if ( value == undefined ){
        // set new values

        const item = new Keynote({
            des : req.body.des,
            name : req.body.name,
            image : req.body.image,
            date : new Date().toLocaleString().replace(',',''),
            latest : 'yes',
            adminApproved : 'no'
        })

        const success = myCache.set( "Keynote", item, 172800000 );

       if(success){
           //deleating all the db data relevent to about from notification table

           const rslt = await EditorNotificationModel.deleteMany({cacheName : 'Keynote'})

        const noti = new EditorNotificationModel({
            date : new Date().toLocaleString().replace(',',''),
            cacheName : 'Keynote',
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

    value = myCache.get( "Keynote" );
    console.log("new value" , value)
    console.log(new Date().toLocaleString().replace(',',''));
})

router.delete('/delete/:id',(req,res) =>{
    const id = req.params.id;
    console.log(id);

    Keynote.findByIdAndDelete(id, function(err){
        if(err){
            res.status(500).send({"message" : "error"})
        }

        res.status(201).send({"message" : "deleted"})
    })
})

module.exports = router;