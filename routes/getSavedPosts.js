const Router=require("express").Router();
const jwt=require("jsonwebtoken");
const UserModel = require("../models/userModel");
const PostModel = require('../models/postModel')

Router.get("/",async(req, res)=>
{

    const token=req.query.token;

    if(token === undefined)
    {
        return res.status(401);
    }
    if(!token)
    {
        return res.sendStatus(404);
        
    }

    try {

        const verified=await jwt.verify(token, process.env.JWTSECRET);

        if(!verified)
        {
            return res.status(401);
        }
        
        const userid = verified.userid;
        const foundUser = await UserModel.findById(userid);
        const allSavedPosts = await PostModel.find({_id : {$in : foundUser.savedPosts}});

        

        return res.status(200).json({
            "viewingUser":foundUser,
            "savedPosts" : allSavedPosts,
        });
        
    } catch (error) {
        return res.sendStatus(404);
        
    }
    
})



module.exports=Router;
