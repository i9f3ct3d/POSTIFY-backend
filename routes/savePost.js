const Router=require("express").Router();
const jwt=require("jsonwebtoken");
const UserModel = require("../models/userModel");
const PostModel  = require('../models/postModel');

Router.post("/",async(req, res)=>
{
    
    const token=req.query.token;
    const postid = req.body.postid;

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
        const foundPost = await PostModel.findById(postid);

        if(foundUser.savedPosts.includes(userid)){

            return res.sendStatus(200);

        }

        foundPost.postSavedBy.push(userid);
        foundUser.savedPosts = [...foundUser.savedPosts , postid];

        await foundPost.save();
        await foundUser.save();


        // let flag = true;

        // for await(eachPost of foundUser.savedPosts){
        //     if(eachPost._id === req.body.post._id){
        //         flag = false;
        //         break;
        //     }
        // }

        // if(flag){
        //     foundUser.savedPosts = [...foundUser.savedPosts , req.body.post];
        
        //     await foundUser.save();
        // }

        return res.sendStatus(200);
        
    } catch (error) {
        console.log({"error" : error});
        return res.sendStatus(404);
        
    }
    
})



module.exports=Router;
