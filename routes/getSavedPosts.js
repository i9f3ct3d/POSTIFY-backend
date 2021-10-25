const Router=require("express").Router();
const jwt=require("jsonwebtoken");
const UserModel = require("../models/userModel");

Router.get("/",async(req, res)=>
{
    console.log("coming");
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

        let allSavedPosts = [];

        for await(const savedPost of foundUser.savedPosts){
            allSavedPosts = [...allSavedPosts , savedPost];
        }
        

        return res.status(200).json({
            "viewingUser":foundUser,
            "savedPosts" : allSavedPosts,
        });
        
    } catch (error) {
        return res.sendStatus(404);
        
    }
    
})



module.exports=Router;
