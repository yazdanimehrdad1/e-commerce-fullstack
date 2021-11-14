const productController = require("../controllers/product.controller")
const { authenticate } = require("../config/jwt.config")
const {authenticateAdmin} = require("../config/authenticateAdmin")
const {upload} = require('../middleware/fileHelper')

// const {imageStorage, imageUpload} =require("../controllers/product.controller")
const multer = require('multer')
const { uploadImage } = require("../controllers/product.controller")
console.log(authenticateAdmin)







module.exports = (app)=>{   
    
    app.get("/api/product" , productController.getProduct)
    app.post("/api/product" ,authenticate ,productController.createProduct)//authenticate, authenticateAdmin
    app.delete("/api/product/:id", productController.deleteProduct)//authenticate
    app.put("/api/product/:id", authenticate, productController.updateProduct )
    app.get("/api/product/:id", productController.getOneProduct )//authenticate
    app.patch("/api/product/uploadfiles", upload.array('files'), productController.multipleFileUpload) 

}

