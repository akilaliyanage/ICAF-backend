const express = require('express')
const router = express.Router()

//importing models
const NavBarItemModel = require('../models/NavBarItemModel')

router.get('/',async (req,res) =>{
    try{
        const items = await NavBarItemModel.find()
        res.json(items)
    }catch(err){
        res.json({message : err})
    }
    
})

router.post('/',(req,res) =>{
    const item = new NavBarItemModel({
        name : req.body.name,
        url : req.body.url
    })

    item.save().then(data =>{
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})

module.exports = router;