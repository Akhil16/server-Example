require('./config/config');
require('./db/db');


const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const routes = require('./routes/routes');
var app = express();

// middleware
app.use(bodyParser.json());
// app.use(cors());

app.all('/*', function (req, res, next) {
    //console.log('Request');
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS ');
    res.header('Access-Control-Allow-Headers', ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Auth-Token', 'X-CSRF-TOKEN']);
    next();
});

//using routes 
app.use('/admin', routes );

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});


// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));
// .........

// //listening to port
// app.listen(3000, function (req, res, next) {
//     console.log('listening on 3000')
// })
