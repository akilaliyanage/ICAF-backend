const express = require('express');
const WorkCoordinator = require('../models/WorkCoordinator');
const router = express.Router()

//importing models
const WorkCoordinatorModel = require('../models/WorkCoordinator')


//register workshop coordinator
router.post('/register',upload.single("picture"),async(req,res) => {

    const workCdn = new WorkCoordinatorModel({

        name: req.body.name,
        studyField: req.body.studyField,
        email : req.body.email,
        password:  req.body.password,
        aproveStatus: "Not approved"
    });

    workCdn.save().then(() => {
        res.json({status:200})
    }).catch((err) =>{
        console.log(err);
    })

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

router.get('/pending',async (req,res) =>{
    try{
        const data = await WorkCoordinatorModel.find()
        const array = [];
        data.forEach(item => {
            item.aproveStatus == 'Not approved' ? array.push(item) : array.push()
        });
        res.json(array)
    }catch(err){
        res.json({message : err})
    }
    
})


//update status of a coordiantor
router.patch('/:id',async (req,res) =>{
    try{
       const updatedUser =  await WorkCoordinatorModel.updateOne({_id:req.params.id}, {$set : {aproveStatus : "Approved"}})
       res.json(updatedUser)
    }catch(err){
        res.json(err)
    }
})


module.exports = router;