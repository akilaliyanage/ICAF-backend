const express = require('express')
const router = express.Router()
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

//importing models
const EditorNotificationModel = require('../models/EditorNotificationModel')

router.get('/',async (req,res) =>{
    try{
        const items = await EditorNotificationModel.find({approved : 'no'})
        res.json(items)
    }catch(err){
        res.json({message : err})
    }
})

router.post('/',(req,res) =>{
    const item = new AboutModel({
        date : new Date().toLocaleDateString(),
        cacheName : req.body.cacheName,
        approved : 'no'
    })

    item.save().then(data =>{
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})

module.exports = router;