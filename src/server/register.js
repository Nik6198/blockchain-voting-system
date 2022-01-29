const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const bycrypt = require('bcrypt');
const router = express.Router();


router.post('/',async (req,res) => {
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({email:req.body.email});
    if (user) return res.status(400).send('User already registered...');

    user = new User({
        name: req.body.name,
        alloted_ward_number: req.body.alloted_ward_number,
        email: req.body.email,
        phoneno: req.body.phoneno,
        aadharno: req.body.aadharno,
        voterid: req.body.voterid,
        name_of_sponsoring: req.body.name_of_sponsoring,
        designation: req.body.designation,
        dropdownOpen: req.body.dropdownOpen
    });

    const salt = await bycrypt.genSalt(10);
    user.voterid = await bycrypt.hash(user.voterid,salt);

    await user.save();
    res.send('User registered...');
});


const User = mongoose.model('Register',new mongoose.Schema({
    dropdownOpen: {type:Boolean},
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30
    },
    alloted_ward_number: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 255,
        unique: true
    },
    phoneno: {
        type: String,
        required: true,
        min: 8,
        max: 10
    },
    aadharno: {
        type: String,
        required: true,
        minlength: 12,
        maxlength: 12
    },
    voterid: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    name_of_sponsoring: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30
    },
    designation: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    }
}));


function validation(user) {
    const valid = {
        name: Joi.string().min(1).max(30).required(),
        alloted_ward_number: Joi.string().min(1).max(30).required(),
        email: Joi.string().min(7).max(255).required().email(),
        phoneno: Joi.string().min(7).max(255).required(),
        aadharno: Joi.string().min(7).max(255).required(),
        voterid: Joi.string().min(1).max(255).required(),
        name_of_sponsoring: Joi.string().min(7).max(30).required(),
        designation: Joi.string().min(7).max(30).required(),
        dropdownOpen:Joi.bool()
    };
    return Joi.validate(user, valid);
}


exports.User = User;
module.exports.user_router = router;