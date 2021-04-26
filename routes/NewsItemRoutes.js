const express = require('express')
const NewsItem = require('../models/NewsItem')
const router = express.Router()

//importing models
const NewsItemModel = require('../models/NewsItem')

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
        date : new Date(req.body.date),
        url: req.body.url,
        des: req.body.des
    })

    item.save().then(data =>{
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})

module.exports = router;