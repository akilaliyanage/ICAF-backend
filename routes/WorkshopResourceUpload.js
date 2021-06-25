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
