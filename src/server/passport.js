const {User} = require('./register');
const _ = require('lodash');
const bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;


module.exports = function (passport){
    //console.log("inside passport");

    // used to serialize the user for session
    passport.serializeUser((user,done)=>{
        //console.log("inside serial");
        done(null,user._id);
    });

    // used to deserialize for proving you're logged in
    passport.deserializeUser( (id,done) =>{
        //console.log("inside deserial");
         User.findById(id , (err,user)=>{
             done(err,user);
         });
    });

    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    //sign up

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'aadharno',
        passwordField : 'voterid',
        passReqToCallback : true
    }, async (req , aadharno , voterid ,done)=>{
        //console.log("inside sign up auth");
        var user = await  User.findOne({'aadharno': aadharno});
        //console.log("inside signup auth",user);
        if (user){
            return done(null,false);
        }
        else{
            user = new User(_.pick(req.body,['name','alloted_ward_number','email','phoneno','aadharno','voterid','name_of_sponsoring','designation','dropdownOpen']));
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.voterid,salt);

            await user.save();
            return done(null,user);
        }
    }));


    passport.use('local-login',new LocalStrategy({
        usernameField : 'aadharno',
        passwordField : 'password',
        passReqToCallback : true
    }, async(req,aadharno,voterid,done)=>{
        //console.log("inside login auth");
        const user = await User.findOne({'aadharno': aadharno});
        //console.log("inside pass",user);
        if (!user) return done(null,false);
        else{
            const validPassword = await bcrypt.compare(req.body.password,user.voterid);
            //console.log("password",validPassword);
            if (!validPassword) return done(null,false);

            return done(null,user);
        }
    }));

}