const { User,user_router } = require('./register');
const mongoose = require('mongoose');
const express = require('express');
const bycrypt = require('bcrypt');
const Joi = require('joi');
const router = express.Router();
const passport = require('passport');

router.post('/', (req,res,next)=>{
    //console.log(req.sessionID,req.session.user);
    passport.authenticate('local-login', (err,user,d)=>{
        if(err) return next(err);
        //console.log("user",user,err,d);
        if(!user) return res.send({ success : false, message : 'authentication failed' });

        req.login( user , loginerr => {
            if(loginerr) return next(loginerr);
            return res.send({ success : true , message : "authentication succeeded"});
        });
    })(req,res,next);

/*async (req,res) => {
   console.log(req.session.user,req.sessionID);

    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({aadharno:req.body.aadharno});
    if (!user) return res.status(400).send('Invalid Credentials');

    const validPassword = await bycrypt.compare(req.body.password,user.voterid);
    if (!validPassword) return res.status(400).send('Invalid Credentials');
    console.log(req.session.regenerate);
    req.session.regenerate(function(err){
        if (err){
           console.log(err);
        }
     });
    req.session.user = user;
    await req.session.save();
    session.user = user;
    console.log(req.session.user,req.sessionID);
    res.send(user.user_type);*/
});

router.get('/',async(req,res) => {


    console.log(req.session.passport,req.sessionID);
    if ( ! req.isAuthenticated() ){
        res.status(403).send("not login");
    }
    else{
        res.send("you're login ");
    }
});

router.get('/l',async(req,res)=>{

    req.logout();
    /*req.session.destroy((err)=>{
        if(err){
            console.log(err);
        }
    });*/
    console.log("log out");
    res.send("loged out");
})

function validation(user) {
    const valid = {
        aadharno: Joi.string().min(12).max(12).required(),
        password: Joi.string().min(1).max(255).required(),
        account_type: Joi.string(),
        dropdownOpen:Joi.bool()
    };
    return Joi.validate(user, valid);
}

module.exports = router;
