const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();


const cors = require('cors');

const port = process.env.PORT || 3000;



app
    .use(bodyParser.json())
   
    // This is the basic express session ({..}) initialization.
 
   
   
  
    .use((req, res, next) => {
        res.setHeader("Access-Controll-Allow-Origin", "*");
        res.setHeader(
            "Access-Control_Allow_Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
        );
        res.setHeader(
            "Access-Control_Allow_Methods",
            "POST, GET, PUT, PATCH, OPTIONS, DELETE"
        );
        next();
    })
    .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
    .use(cors({ origin: '*' }))
    .use("/", require("./routes/index.js"));





mongodb.initDb((err, mongoDB) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`app started on Port ${port}`);
    }    
});   
