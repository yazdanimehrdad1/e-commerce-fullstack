const User = require('../models/user.model')

// const authenticateAdmin = async (req, res, next)=>{
//     try{
//         const user = await User.findOne({
//             _id: req.user.id
//         })
//         console.log("user",user)
//         if(user.role === 0){
//             return res.status(400).json({message: "Admin access denied"})
//         }
//         next()

//     }catch (err){
//         return res.status(400).json({message: err.message})
//     }
// }

// module.exports = authenticateAdmin


module.exports ={

     authenticateAdmin : async (req, res, next)=>{
        console.log(req.user)
        try{
            const user = await User.findOne({_id: req.params.userid})
            console.log("useeer", user)
            if(user.role === 0){
                return res.status(400).json({message: "Admin access denied"})
            }
            next()
    
        }catch (err){
            
            return res.status(400).json({message: err.message})
        }
    }

}




