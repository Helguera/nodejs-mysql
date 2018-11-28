//poder ejecutar todo el servidor

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const flash = require('express-flash');

app.use(session({
    secret: "sosecret",
    saveUninitialized: false,
    resave: false
  }));
var sess;



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


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
  }));

app.use(cookieParser());
app.use(session({
    secret: 'super-secret-key',
    key: 'super-secret-cookie',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }));
app.use(flash());


//routes

app.get('/admin',function(req,res){
    sess = req.session;
    console.log(req.session);
    if(req.session.mail) {
        //console.log("ERES ADMIN");
        res.send("ERES EL PUTO ADMIN");
    }
    else {
        //console.log("NO ERES ADMIN");
        res.redirect('/');
    }
});

app.use('/', customerRoutes);
app.get('/login', (req, res) => {
    res.render('login', {
        data: {},
        errors: {}
      })
});

app.post('/login', (req, res) => {
    /*res.render('login', {
        data: req.body, // { message, email }
        errors: {
          message: {
            msg: 'A message is required'
          },
          email: {
            msg: 'That email doesn‘t look right'
          }
        }
      })*/
    //console.log(req.body.mail);
    req.session.mail = req.body.mail;
    req.flash('success', 'Login succesfuly!')
    res.redirect('/');
})

app.get('/logout',function(req,res){
    if(req.session){
        req.session.destroy(function(err) {
            if (err) return console.log(err);
            return res.redirect('/login');
        });
    }else{
        res.redirect('/login');
    }
}); 

//static files
app.use(express.static(path.join(__dirname, 'public')));

//starting server
app.listen(3000, () => {
    console.log('Server on port 3000');
});