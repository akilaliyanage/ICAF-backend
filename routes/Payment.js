const express = require('express')
const router = express.Router()
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

//importing models
const Payment = require('../models/Payment')
const EditorNotificationModel = require('../models/EditorNotificationModel')

router.get('/',async (req,res) =>{
    try{
        const items = await Payment.find({latest : 'yes',adminApproved : 'yes'})
        res.json(items)
    }catch(err){
        res.json({message : err})
    }
    
})

router.post('/',(req,res) =>{
    const item = new Payment({
        date : new Date().toLocaleString().replace(',',''),
        cardName : req.body.cardName,
        cardNo : req.body.cardNo,
        month : req.body.month,
        year : req.body.year,
        cvv : req.body.cvv,
        zip : req.body.zip,
        userid : req.body.userid,
        amount : req.body.amount,
        role : req.body.role
    })

    item.save().then(data =>{
        res.json(data)
    }).catch(err =>{
        res.json(err)
    })
})

router.get('/:id',async(req,res) =>{
    const id = req.params.id;

    try{
        const items = await Payment.find({_id : id})
        res.json(items)
    }catch(err){
        res.json({message : err})
    }

})

module.exports = router;