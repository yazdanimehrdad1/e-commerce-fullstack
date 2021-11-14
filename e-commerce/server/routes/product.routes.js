const productController = require("../controllers/product.controller")
const { authenticate } = require("../config/jwt.config")
const {authenticateAdmin} = require("../config/authenticateAdmin")
const {upload} = require('../middleware/fileHelper')

// const {imageStorage, imageUpload} =require("../controllers/product.controller")
const multer = require('multer')
const { uploadImage } = require("../controllers/product.controller")
console.log(authenticateAdmin)



const imageStorage = multer.diskStorage({
    destination: 'images',
    filename: (req,file, cb)=>{
        cb(null, file.fieldname + '_'+ Date.now() + Path2D.extname(file.originalname))
    }
})


const imageUpload = multer({
    storage: imageStorage,
    limits:{ fileSize: 1000000},
    fileFilter(req, file, cb){
        if(!file.originalname,match(/\.(ong|jpg)$/)){
            return cb(new Error('Please upload  jpg or png format image'))
        }
        cb(undefined, true)
    }
})





module.exports = (app)=>{   
    
    app.get("/api/product" , productController.getProduct)
    app.post("/api/product" ,authenticate ,productController.createProduct)//authenticate, authenticateAdmin
    app.delete("/api/product/:id", productController.deleteProduct)//authenticate
    app.put("/api/product/:id", authenticate, productController.updateProduct )
    app.get("/api/product/:id", productController.getOneProduct )//authenticate
    app.patch("/api/product/uploadfiles", upload.array('files'), productController.multipleFileUpload) 

}

