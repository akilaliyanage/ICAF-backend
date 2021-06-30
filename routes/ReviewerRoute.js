const router = require('express').Router();
let Reviewer = require("../models/Reviewer");
const multer = require("multer");
const bcrypt = require("bcrypt");

const Reserchers = require('../models/Researcher')


const jwt = require('jsonwebtoken')
const config = require('../secret.json')

const storage = multer.diskStorage({
    destination:(req,file,callback) => {
        callback(null,"./uploads")
    },
    filename:(req,file,callback) => {
        callback(null,file.originalname);
    }
})

//uploading images
const upload = multer({storage:storage});

router.post("/add",upload.single("picture"),async(req,res) => {

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(req.body.password, salt);

    const reviewer = new Reviewer({

        name: req.body.name,
        username : req.body.username,
        password:  hash,
        profileImage: req.file.originalname
    });

    reviewer.save().then(() => {
        res.json({status:200})
    }).catch((err) =>{
        console.log(err);
    })

})

router.route("/researchers").get((req,res) => {

    Reserchers.find().then( (reviewers) =>{

        res.json(reviewers);

    }).catch((err) => {
        console.log(err);
    })

})

router.route("/:ID").get((req,res) => {

    let ID = req.params.ID;
    Reviewer.find({_id:ID}).then( (reviewer) =>{

        res.json(reviewer);

    }).catch((err) => {
        console.log(err);
    })

})

router.put("/update/:reviewerID",upload.single("picture"),async (req,res) => {

    const ID = req.params.reviewerID;
    let updatedReviewer;

    if (!req.file){

        updatedReviewer = {
            name: req.body.name,
            username : req.body.username,

        };
    }
    else {
        updatedReviewer = {

            name: req.body.name,
            username : req.body.username,
            profileImage: req.file.originalname
        };
    }

    const  updateValue = await  Reviewer.findByIdAndUpdate(ID,updatedReviewer).then(() => {

        res.json({status:200});
    }).catch((err) => {
        console.log(err)
    })

})


router.route("/delete/:reviewerID").delete(async (req,res) =>{

    let ID = req.params.reviewerID;
    await Reviewer.findByIdAndDelete(ID).then(() => {
        res.json({status:200});
    }).catch((err) => {
        console.log(err);

    })

})


//reviewer login
router.post('/rv-login', async (req,res) =>{
    const {username, password} = req.body;

    const reviewer = await Reviewer.findOne({username : username}).lean()

    if(await bcrypt.compare(password,reviewer.password)){

        const token = jwt.sign({id : reviewer._id, username : reviewer.username},config.SEC_KEY)

        return res.json({"token":token, "id":reviewer._id, "username":reviewer.username})
    }
})





module.exports = router;