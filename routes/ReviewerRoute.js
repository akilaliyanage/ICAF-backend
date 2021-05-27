const router = require('express').Router();
let Reviewer = require("../models/Reviewer");
const multer = require("multer");

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

    const reviewer = new Reviewer({

        name: req.body.name,
        username : req.body.username,
        password:  req.body.password,
        profileImage: req.file.originalname
    });

    reviewer.save().then(() => {
        res.json({status:200})
    }).catch((err) =>{
        console.log(err);
    })

})

router.route("/").get((req,res) => {

    Reviewer.find().then( (reviewers) =>{

        res.json(reviewers);

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
            password:  req.body.password,
        };
    }
    else {
        updatedReviewer = {

            name: req.body.name,
            username : req.body.username,
            password:  req.body.password,
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





















module.exports = router;