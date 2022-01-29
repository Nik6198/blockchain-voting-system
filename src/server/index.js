const {user_router,users} = require('./register');
const Joi = require('joi');
const login = require('./authorization');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const cookie_parser = require('cookie-parser'); 
const sms = require('./test_sms');
const {candidate_router} = require('./candidate');




mongoose.connect('mongodb://localhost/voting')
    .then(()=> console.log('Connected to MongoDB...'))
    .catch(err =>  console.error('Could not connect to MongoDB'));

require('./passport')(passport);


app.use(cors());
//app.use(cookie_parser);
app.use(express.json());
app.use(session({
    secret : "password",
    resave : false,
    saveUninitialized : true,
    cookie: {
        path: '/',
        httpOnly: true,
      //  secure: true
        maxAge:  120000
    },
    name : "id"
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/register', user_router);
app.use('/authorization', login);
app.use('/login',login);
app.use('/send',sms);
app.use('/candidate',candidate_router);
app.get('/',(req,res)=>{
    res.send("hi");
})


const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}`));





module.exports = passport;