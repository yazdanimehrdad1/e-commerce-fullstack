const Category = require('../models/category.model')



const categoryController = {
    index:(req, res)=>{
        res.json({message: "category back end working"})
    },

    getCategories: async (req,res)=>{
        try {
            const categories = await Category.find({})
            res.json(categories)

            
        } catch (error) {
           return res.status(400).json({message: error.message })
        }

    },

    createCategory: async (req, res)=>{
        try {

            console.log("categorrry", req.body)
            const{name} = req.body;
            const category  = await Category.findOne({name})
            if(category){return res.status(400).json({message: "The category already exist"})}

            const newCategory = new Category({name})

            await newCategory.save()
            res.json({message: "New category created"})



        } catch (error) {
            console.log("catagory")
            return res.status(400).json({message: error.message})
            
        }
    },

    deleteCategory: async(req, res)=>{
        try {
            
            // const products = await Products.findOne({category: req.params.id})
            // if(products){ return res.status(400).json({message: "Delete all products with a relationship"})}

            await Category.findByIdAndDelete(req.params.id)
            res.json({message: "Deleted a category"})

        } catch (error) {
            return res.status(400).json({message: error.message })
            
        }

    },

    updateCategory: async(req, res)=>{
        try{

            // console.log(req.params)
            const{name} = req.body
            await Category.findOneAndUpdate({_id:req.params.id}, {name})
            res.json({message: "Updated a category"})
        }catch(error){
            return res.status(500).json({message: console.error.message})
        }

    }


}

module.exports = categoryController