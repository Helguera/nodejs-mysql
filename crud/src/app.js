//poder ejecutar todo el servidor

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//importing routes
const customerRoutes = require('./routes/customer');

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql,{
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'crudnodejsmysql'
}, 'single'));


//routes
app.use('/', customerRoutes);


//static files
app.use(express.static(path.join(__dirname, 'public')));




//starting server
app.listen(3000, () => {
    console.log('Server on port 3000');
});