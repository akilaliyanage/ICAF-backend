const express = require('express')
const router = express.Router()

//importing models
const AboutModel = require('../models/AboutModel')

router.get('/',async (req,res) =>{
    try{
        const items = await AboutModel.find({latest : 'yes'})
        res.json(items)
    }catch(err){
        res.json({message : err})
    }
    
})

router.post('/',(req,res) =>{
    const item = new AboutModel({
        des : req.body.des,
        CreatedDate : new Date().toLocaleDateString(),
        latest : 'no'
    })

    item.save().then(data =>{
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})

module.exports = router;