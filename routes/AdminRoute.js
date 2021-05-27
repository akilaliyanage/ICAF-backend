const router = require('express').Router();
let EventDate= require("../models/EventDateModel");
const EditorNotificationModel = require('../models/EditorNotificationModel')


router.post('/date',async (req,res) =>{

    const editID = req.body.editID;
    const item = new EventDate({
        date : req.body.date,
        adminApproved : 'yes',
        latest: 'yes;'
    })

    EditorNotificationModel.updateOne({_id:editID,"data._id":"60adedcf64e7644119cc5914"},{$set:{"data.$.adminApproved":"yes"}}).then((res) =>{
        console.log(res)
}).catch(err =>{
    console.log(err)
});

    // await EventDate.updateMany({},{$set:{latest:"no"}});

//     item.save().then(() =>{
//          EditorNotificationModel.updateOne({_id:editID},{$set:{approved:"yes"}}).then(() =>{
//              EditorNotificationModel.updateOne({_id:editID},{$set:{approved:"yes"}}).then(() =>{
//                  res.json({status: 200})
//              })
//         })
//         }).catch(err =>{
//             res.json(err)
//         });
})

router.route("/:ID").get((req,res) => {

    let ID = req.params.ID;

    EditorNotificationModel.find({approved:"yes"}).then((items) => {
        res.json(items[0])
    }).catch((err) => {
        console.log(err)
    })

})

module.exports = router;