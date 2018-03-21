
var express = require('express');
var path = require('path');
 var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');




app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());
app.options('*', cors());

mongoose.connect('mongodb://localhost:27017/myshop');
//mongoose.Promise = global.Promise;

// handling cors errors 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Accept,Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});


// app.use(function(req, res, next) {
//     var oneof = false;
//     if(req.headers.origin) {
//         res.header('Access-Control-Allow-Origin', req.headers.origin);
//         oneof = true;
//     }
//     if(req.headers['access-control-request-method']) {
//         res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
//         oneof = true;
//     }
//     if(req.headers['access-control-request-headers']) {
//         res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
//         oneof = true;
//     }
//     if(oneof) {
//         res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
//     }

//     // intercept OPTIONS method
//     if (oneof && req.method == 'OPTIONS') {
//         res.send(200);
//     }
//     else {
//         next();
//     }
// });

 

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const categoryRoutes = require('./routes/categories');
const userRoutes = require('./routes/user');


// //routes
app.use('/uploads',express.static(--__dirname + '/assets'));
app.use('/products', productRoutes);
app.use('/orders', orderRoutes );
app.use('/categories', categoryRoutes);
app.use('/user', userRoutes);


app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
           message: error.message
        }
    });

});

// app.use((req, res, next)=>{
//          res.status(200).json({
//              message: 'it works'
//          });
//      });


module.exports = app;

