const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../secret.json')

//importing models
const NormalUser = require('../models/NormalUser')

router.get('/',async (req,res) =>{
    try{
        const items = await NormalUser.find()
        res.json(items)
    }catch(err){
        res.json({message : err})
    }
    
})


router.post('/login', async (req,res) =>{
    const {username, password} = req.body;
    console.log(req.body);

    const user = await NormalUser.findOne({username : username}).lean()

    if(await bcrypt.compare(password,user.password)){
        //user is there

        const token = jwt.sign({id : user._id, username : user.username},config.SEC_KEY)
        console.log(user);

        return res.json({"token":token, "id":user._id, "username":user.username,"proImg" : user.proImg})
    }else{
        res.status(401).send("user not found")
    }
})

router.post('/reg',async (req,res) =>{
   const {username, password, proImg, email} = req.body
   

   const pass = await bcrypt.hash(password,10)

   try{
        const rslt = await NormalUser.create({
            username : username,
            password : pass, 
            proImg : proImg,
            email : email
        })

        console.log(rslt)
        res.status(200)
        res.json({"message" : "ok"})
   }catch(err){
       console.log(err)
       res.json({error: err})
   }
   console.log(pass)
})

module.exports = router;