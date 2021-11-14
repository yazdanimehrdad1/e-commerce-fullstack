

require('dotenv').config();
// const {upload} = require('./middleware/fileHelper')
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')("sk_test_51JtljkCLhsRRew9Gta3nQJtpC7ouMcMItzHnViYW3pcwZ1ClbywFHPHEsF2Zq7xpEXpXDy8ClTf935rdqPHCczLh00ERUcayhA")
const { uuid } = require('uuidv4');

const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 8000

// setup express
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}))// for post request 
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000",
}))
app.use(fileUpload({
    useTempFiles: true
}))



// const fileRoutes = require('./routes/fileUploadRoutes');
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/api', fileRoutes.routes);
// connect to the mongoDB
const URI = process.env.MONGODB_URL
const DB_name = process.env.DB_NAME
// mongoose.connect(URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }, err=>{
//     if(err) throw err;
//     console.log('connected to MongoDB')
// } )

require('./config/mongoose.config')(URI)
// require('./config/mongoose.config')(DB_name)
require('./routes/user.routes')(app)
require('./routes/product.routes')(app)
require('./routes/category.routes')(app)
require('./routes/fileUploadRoutes')(app)
require('./routes/payment.routes')(app)

// app.use('/api', require('./routes/category.routes'))




app.listen(PORT, ()=>{
    console.log(' server is running on port', PORT)
})






