const express = require('express')
const router = express.Router()
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

//importing models
const Price = require('../models/PriceModal')
const EditorNotificationModel = require('../models/EditorNotificationModel')

router.get('/:role',async (req,res) =>{

    const role = req.params.role;
    try{
        const items = await Price.findOne({userType : role})
        res.json(items)
    }catch(err){
        res.json({message : err})
    }
    
})

router.post('/',(req,res) =>{
    const item = new Price({
        date : new Date().toLocaleString().replace(',',''),
        price : req.body.price,
        userType : req.body.userType
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

router.patch('/update/:id',(req,res)=>{
    const id = req.params.id;
     Price.findOneAndUpdate(id,{price : req.body.price},function(err,doc){
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully updated.');
    })
})

module.exports = router;