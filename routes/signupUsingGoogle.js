const Router=require("express").Router();
const passport = require('passport')
var jwt=require("jsonwebtoken");
const UserModel = require("../models/userModel");
require('./auth');
require("dotenv").config();

Router.get('/',passport.authenticate('google',{
    scope : ['email' , 'profile']
}))

Router.get('/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  async(req, res)=>{
    res.redirect(process.env.FRONT_END_API_URL+"/authcheck/"+req.user.token);

});

module.exports = Router;