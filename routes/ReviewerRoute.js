const router = require('express').Router();
let Reviewer = require("../models/Reviewer");
const multer = require("multer");


const jasonWT = require('jsonwebtoken')

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


//reviewer login
router.post('/workCon-login', async (req,res) =>{
    const {username, password} = req.body;

    const reviewer = await Reviewer.findOne({username : username}).lean()

    if(await compare(password,reviewer.password)){

        const token = jasonWT.sign({id : reviewer._id, username : reviewer.username})

        return res.json({"token":token, "id":reviewer._id, "username":reviewer.username})
    }
})





module.exports = router;