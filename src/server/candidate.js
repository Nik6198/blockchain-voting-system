const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const bycrypt = require('bcrypt');
const router = express.Router();


router.post('/post',async (req,res) => {
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let candidate = await Candidate.findOne({name:req.body.name, partySymbol : req.body.partySymbol});
    if (candidate) return res.status(400).send('User already registered...');

    candidate = new Candidate({
        name: req.body.name,
        partySymbol: req.body.partySymbol,
        objectives: req.body.objectives,
 
    });



    await candidate.save();
    res.send('Candidate registered...');
});


router.get('/get',async(req,res)=>{
    const candidates = await Candidate.find();
    if(!candidates) return res.status(400).send("candidates not found");
    res.send(candidates);
});

const Candidate = mongoose.model('Candidate',new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30
    },
    partySymbol: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30
    },
    objectives: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    }
}));


function validation(user) {
    const valid = {
        name: Joi.string().min(1).max(30).required(),
        partySymbol: Joi.string().min(1).max(30).required(),
       
        objectives: Joi.string().min(7).max(255).required(),

    };
    return Joi.validate(user, valid);
}


exports.Candidate = Candidate;
module.exports.candidate_router = router;