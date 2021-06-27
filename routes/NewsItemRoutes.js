const express = require('express')
const NewsItem = require('../models/NewsItem')
const router = express.Router()
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

//importing models
const NewsItemModel = require('../models/NewsItem')
const EditorNotificationModel = require('../models/EditorNotificationModel')

router.get('/',async (req,res) =>{
    try{
        const items = await NewsItemModel.find()
        res.json(items)
    }catch(err){
        res.json({message : err})
    }
    
})

router.post('/',(req,res) =>{
    const item = new NewsItemModel({
        date : new Date().toLocaleString().replace(',',''),
        url: req.body.url,
        des: req.body.des,
        adminApproved : req.body.adminApproved,
        edate : req.body.edate,
        image : req.body.image,
        name : req.body.name
    })

    item.save().then(data =>{
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})

router.delete('/delete/:id',(req,res) =>{
    const id = req.params.id;
    console.log(id);

    NewsItemModel.findByIdAndDelete(id, function(err){
        if(err){
            res.status(500).send({"message" : "error"})
        }

        res.status(201).send({"message" : "deleted"})
    })
})


router.post('/sendToAdmin',async (req,res) =>{

    myCache.del( "eventNews" );
    var value = myCache.get( "eventNews" );
    console.log(req.body)

    if ( value == undefined ){
        // set new values

        const item = new NewsItemModel({
            date : new Date().toLocaleString().replace(',',''),
            latest : "yes",
            adminApproved : "no",
            des : req.body.des,
            url : req.body.url,
            image : req.body.image,
            edate : req.body.edate,
            name : req.body.name
        })

        const success = myCache.set( "eventNews", item, 172800000 );

       if(success){
           //deleating all the db data relevent to about from notification table

           const rslt = await EditorNotificationModel.deleteMany({cacheName : 'eventNews'})

        const noti = new EditorNotificationModel({
            date : new Date().toLocaleString().replace(',',''),
            cacheName : 'eventNews',
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