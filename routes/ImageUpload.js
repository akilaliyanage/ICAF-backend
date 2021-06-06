const express = require('express')
const router = express.Router()
const multer = require('multer')
const AWS = require('aws-sdk')
const config = require('../secret.json')

const s3 = new AWS.S3({
    accessKeyId : config.AWS_S3_K,
    secretAccessKey : config.AWS_S3_SK
})

const storage = multer.memoryStorage({
    destination : function(req,file,callback){
        callback(null,'')
    }
})

const upload = multer({storage: storage}).single('image')

router.post('/',upload,async(req,res)=>{

    console.log(req.file);

    let myImage = req.file.originalname.split('.')
    const extension = myImage[myImage.length - 1]

    const params = {
        ACL : "public-read",
        Bucket : config.BKT_NAME,
        Key : Date.now() + "." + extension,
        Body : req.file.buffer
    }


    s3.upload(params,(error,data) =>{
        if(error){
            res.status(500).send(error)
        }

        res.status(201).send(data)
    })

})

module.exports = router;
