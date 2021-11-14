const User = require("../models/user.model");
// const Payments = require('../models/paymentModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



module.exports = {




    register:async (req, res)=>{

        try{

            const user = await User.findOne({ email: req.body.email})
            if(user){
                // return res.status(400).json({message: "The email already exists"})
                return res.status(400).json(
                    {
                    error:{
                        errors:{
                            email:{
                                message:"Email already exist" 
                            }
                        }
                    }
                    }
                )
            }
            const newUser = await new User(req.body);
            await newUser.save()
            res.json({ message:"Success", user:newUser})

        }
        catch(error){
            return res.status(400).json({error})
        }


    },



    login(req, res){
        User.findOne( {email: req.body.email} )
        .then( user =>{


            if (user === null){
                res.status(400).json(
                    {
                        error:{
                            errors:{
                                email:{
                                    message:"You are not registere, Please register!"
                                }
                            }
                        }
                    }
                )
            } else{

                bcrypt
                .compare(req.body.password, user.password)

                .then ( passwordIsValid =>{

                    if(passwordIsValid){
                        res.cookie(
                            
                             "usertoken" , 
                             jwt.sign( {_id: user._id} , process.env.JWT_SECRET),
                             {
                                 httpOnly:true,
                                 expires: new Date(Date.now() + 9000000000 )
                             }
                        )
                        .json({
                            message: "Success!",
                            userLogged :{
                                username: `${user.firstName} ${user.lastName}`
                            }
                        })
                    } else{
                        // res.status(400).json({message: "Invalid login credentials! "})
                        res.status(400).json(
                            {
                                error:{
                                    errors:{
                                        login:{
                                            message:"Invalid email or password"
                                        }
                                    }
                                }
                            }
                        )
                    }
                })
                .catch(
                    // err => res.status(400).json( { message: "Invalid login credentials!"} )
                    err => res.status(400).json( 
                        {
                            error:{
                                errors:{
                                    login:{
                                        message:"Invalid email or password"
                                    }
                                }
                            }
                        }
                    )
                )
            } 
        } )
        .catch(err => res.json(err))
     
    },


    logout(req,res){
        console.log("Using logout")
        res.clearCookie("usertoken");
        res.json({message: "usertoken cookie cleared"});
    },

    logou2(req,res){
        res.cookie(
            "usertoken", 
            jwt.sign({_id:""} , process.env.JWT_SECRET), 
            {
                httpOnly:true,
                maxAge: 0
            } )
            .json({message: "Okay"});
    },


    getLoggedInUser(req, res){
        const decodedJWT = jwt.decode( req.cookies.usertoken , {complete:true});

        User.findById(decodedJWT.payload._id)
            .then( user => res.json(user))
            .catch( err => res.json(err));

    },




    addCart: async(req, res)=>{
        console.log(req.body.cart)
        
        try{
            const decodedJWT = jwt.decode( req.cookies.usertoken , {complete:true});
            const user = await User.findById(decodedJWT.payload._id)
            console.log(user)
            
            // const user = await User.findById({_id:req.user._id})
            if(!user) return res.status(400).json({message: "User does not exist."})
            await User.findOneAndUpdate({_id: user._id}, {
                cart: req.body.cart
            })
            return res.json({message: "Added to the cart"})


        }catch(err){
            console.log("addCart err")
            return res.status(500).json({message: err.message})
        }
    },

    // history: async(req, res) =>{
    //     try {
    //         const history = await Payments.find({user_id: req.user.id})

    //         res.json(history)
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },


 

};


const createAccessToken = (user)=>{
    return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '11m'})
}

const createRefreshToken = (user)=>{
    return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '7D'})
}