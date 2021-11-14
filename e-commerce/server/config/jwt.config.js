const jwt = require("jsonwebtoken")

// This file is used as a middleware to authenticate a user
// before we pass the request on to the controller, we will authenticate the request

module.exports = {
    authenticate(req, res, next){     // middleware = routes --> authenticate --> controller
        // jwt will verify that we are authorized to view this route
        jwt.verify(
            //token passed from the client to us - it is their "proof" of being authenticated
            req.cookies.usertoken,
            // this is the key we want to use for validation- anything we want
            process.env.JWT_SECRET,
            // we can store information in the payload if we want (payload is the validated data if we pass the validation process)
            (err, payload)=>{
                // if we don't pass the check, we send back a 401 unauthorized  response
                if(err){
                    res.status(401).json({verified:false});
                }else{
                // if we are valid, we will process to call the next / callback function
                // this will continue us down the process of accesing resources we are authorized to access
                    next(); // head of to the function in the controller
                }
            }
        );
    }
}