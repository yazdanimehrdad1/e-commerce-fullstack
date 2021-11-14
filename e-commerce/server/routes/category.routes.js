const  categoryController = require("../controllers/categoryController")
const {authenticate} = require('../config/jwt.config')
const {authenticateAdmin} = require('../config/authenticateAdmin')
const router = require('express').Router();


module.exports = (app)=>{
    app.get('/api/category/index', categoryController.index ),
    app.get('/api/category', categoryController.getCategories ),
    app.post('/api/category/:userid',categoryController.createCategory), // ,authenticate,authenticateAdmin
    app.delete('/api/category/:id/:userid', authenticateAdmin,categoryController.deleteCategory),//authenticateAdmin ,authenticate
    app.put('/api/category/:id/:userid', authenticate,authenticateAdmin,categoryController.updateCategory)



}

