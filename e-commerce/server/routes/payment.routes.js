const paymentController = require('../controllers/payment.controller')
const { authenticate } = require("../config/jwt.config")


module.exports = (app)=>{
    app.get('/api/payment/health', paymentController.health), 
    app.post('/api/payment',paymentController.payment)
}
