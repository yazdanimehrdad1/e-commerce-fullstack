const MultipleFile = require('../models/multipleFile.model');
const SingleFile = require('../models/singlefile');






const singleFileUpload = async (req, res, next) => {
    console.log(req.files.file)
    console.dir(req.file)
    try{

        const file = new SingleFile({
            fileName: req.files.file.name,
            filePath: req.files.file.tempFilePath,// actual end location  : uploads/"filename" ../../uploads/filename
            fileType: req.files.file.mimetype,
            fileSize: fileSizeFormatter(req.files.file.size, 2) // 0.00
        });
        await file.save();
        res.status(201).send('File Uploaded Successfully');
    }catch(error) {
        res.status(400).json(error.message);
    }
}


const multipleFileUpload = async (req, res, next) => {
    try{
        let filesArray = [];
        console.log("req.files",req.files)
        console.log("req.body.title", req.body.title)
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });
        const multipleFiles = new MultipleFile({
            title: req.body.title,
            files: filesArray 
        });
        await multipleFiles.save();
        res.status(201).send('Files Uploaded Successfully');
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

const health = (req,res)=>{
    res.json("fileUploadpath is fine")
}

module.exports = {
    health,
    singleFileUpload,
    multipleFileUpload,

}