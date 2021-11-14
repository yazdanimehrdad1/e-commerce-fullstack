const mongoose = require('mongoose');

// const db_name = 'author'


module.exports = (URI)=>{

    mongoose.connect(URI , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex:true,
        // useFindAndModify:true,
    })
        .then(() => console.log(`Established a connection to the ${URI}`))
        .catch(err => console.log(`Something went wrong when connecting to the ${URI}`, err));

}




// module.exports = (DB_NAME)=>{

//     mongoose.connect(`mongodb://localhost/`+DB_NAME , {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//         .then(() => console.log(`Established a connection to the ${DB_NAME}`))
//         .catch(err => console.log(`Something went wrong when connecting to the ${DB_NAME}`, err));

// }