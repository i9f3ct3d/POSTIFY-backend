const Router=require("express").Router();
const UserModel=require("../models/userModel");
const PostModel=require("../models/postModel");
const jwt=require("jsonwebtoken");

Router.get("/",async(req, res)=>
{
    const token=req.query.token;

    if(token === undefined)
    {
        return res.status(200).json({"credentials":"not logged in"});
    }
    if(!token)
    {
        return res.sendStatus(404);
        
    }

    try {

        const verified=await jwt.verify(token, process.env.JWTSECRET);

        if(!verified)
        {
            return res.status(200).json({"credentials":"invalid"});
        }
        

            const foundUser=await UserModel.findById(verified.userid);
            if(foundUser){
                
                    // const allUsers=await UserModel.find({});
                    const allPost=await PostModel.find({});
                    
                    return res.status(200).json({
                        "credentials":"valid",
                        "user" : foundUser,
                        "Posts":allPost,
                    });
                
                
            }
            return res.status(200).json({"credentials":"invalid"});
            
        

        
    } catch (error) {
        return res.sendStatus(404);
        
    }
    
})



module.exports=Router;
