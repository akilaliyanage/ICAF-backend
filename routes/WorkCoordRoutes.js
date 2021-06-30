const express = require('express');
const router = express.Router()

const bcrypt = require('bcryptjs')
const jasonWT = require('jsonwebtoken')
const config = require('../secret.json')

//importing models
const WorkCoordinator = require('../models/WorkCoordinator')


//login work conductor
router.post('/workCon-login', async (req,res) =>{
    const {email, password} = req.body;

    const workCond = await WorkCoordinator.findOne({email : email}).lean()

    if(await bcrypt.compare(password,workCond.password)){
        //user is there

        const token = jasonWT.sign({id : workCond._id, email : workCond.email},config.SEC_KEY)

        return res.json({"token":token, "id":workCond._id, "email":workCond.email})
    }
})


//register workshop coordinator
router.post('/workCon-register',async(req,res) => {

    const {name, studyField, email, password} = req.body

    const pwd = await bcrypt.hash(password,10)

    try{
            const rslt = await WorkCoordinator.create({
                name: name,
                studyField: studyField,
                email : email,
                password:  pwd
            })

            // console.log(rslt)
            res.status(200)
    }catch(err){
        console.log(err)
        res.json({error: err})
    }
    // console.log(pwd)
})

//retrieve all workshop coordinators

router.route("/all").get((req,res) => {
    
    WorkCoordinator.find()
    .then( (conductors) =>{
        res.json(conductors);
    }).catch((err) => {
        console.log(err);
    })
})






module.exports = router;