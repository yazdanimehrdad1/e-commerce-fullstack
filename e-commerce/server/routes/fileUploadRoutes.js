'use strict'
const {upload} = require('../middleware/fileHelper')
const express = require('express');
const router = express.Router();
const  fileUploadController = require("../controllers/fileUploadController")



module.exports = (app)=>{    
    app.get("/api/file/health", fileUploadController.health),
    app.post("/api/singleFile", upload.single('file'), fileUploadController.singleFileUpload),
    app.post("/api/multipleFileUpload" , upload.array('files'), fileUploadController.multipleFileUpload)

}