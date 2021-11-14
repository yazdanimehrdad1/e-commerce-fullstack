const userController = require("../controllers/user.controller")

const { authenticate } = require("../config/jwt.config")



module.exports = (app)=>{
    // app.get("/api/user/health", userController.index);
    app.post("/api/user/register", userController.register);
    app.post("/api/user/login", userController.login);
    app.post("/api/user/logout", userController.logout);
    // app.get("/api/user/refresh_token", userController.refreshToken);


    app.get("/api/user/loggedin", authenticate, userController.getLoggedInUser)//authenticate
    //add to cart
    app.patch("/api/user/addcart", userController.addCart)
    //history

}

