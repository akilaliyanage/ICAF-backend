const express = require('express');
const router = express.Router()

const bcrypt = require('bcryptjs')
const jasonWT = require('jsonwebtoken')

//importing models
const WorkCoordinator = require('../models/WorkCoordinator')


//login work conductor
router.post('/workCon-login', async (req,res) =>{
    const {email, password} = req.body;

    const workCond = await WorkCoordinator.findOne({email : email}).lean()

    if(await bcrypt.compare(password,workCond.password)){
        //user is there

        const token = jasonWT.sign({id : workCond._id, username : workCond.email})

        return res.json({"token":token, "id":workCond._id, "username":workCond.email})
    }
})


//register workshop coordinator
router.post('/workCon-register',async(req,res) => {

    const {name, studyFeild, email, password} = req.body

    const pwd = await bcrypt.hash(password,10)

    try{
            const rslt = await WorkCoordinator.create({
                name: name,
                studyField: studyField,
                email : email,
                password:  pwd
            })

            console.log(rslt)
            res.status(200)
            res.json({"message" : "ok"})
    }catch(err){
        console.log(err)
        res.json({error: err})
    }
    console.log(pawd)
})

//retrieve all workshop coordinators
// router.get('/pending',async (req,res) =>{
//     try{
//         const data = await data.find()
//         res.json(data)
//     }catch(err){
//         res.json({message : err})
//     }
    
// })






module.exports = router;