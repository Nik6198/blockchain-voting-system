
const express = require('express');
const router = express.Router();	
const Nexmo = require('nexmo');
const randomize = require('randomatic');
let otp = 0000;
let flag = true;
var sinchAuth = require('sinch-auth');
var sinchSms = require('sinch-messaging');
var auth = sinchAuth("6ab93004-0f1f-41c5-9ddd-b440fcb45714", "PGyzmaydCEqg5+6+EcBYPQ==");


function timeOut(){
  flag = false;
  console.log("timeout");
}

function sendOtp(){
  flag = true;
  otp = randomize('0',4);
  setTimeout(timeOut,60000);
  sinchSms.sendMessage("91832917909", `Your otp is ${otp}`); 

}

router.post('/',(req,res)=>{
  
  sendOtp();
  res.send("otp sent");
  console.log("otp sent");
  
});

router.post('/verify',(req,res)=>{
  console.log(req.body);
  if(!req.body.otp) return res.status(400).send("please send otp");

  if (req.body.otp == otp && flag == true){
    return res.send("verified");
  }
  return res.send("invalid otp");
});

router.post('/resend',(req,res)=>{
  sendOtp();
  res.send("otp resent");
  console.log("otp resent");
});

module.exports = router;