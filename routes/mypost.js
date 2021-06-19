const Router=require("express").Router();
const UserModel=require("../models/userModel");
const PostModel=require("../models/postModel");
const jwt=require("jsonwebtoken");

Router.get("/",async(req, res)=>
{
    const token=req.query.token;
    if(token==undefined)
    {
        return res.sendStatus(404);
    }
    if(!token)
    {
        return res.sendStatus(404);
    }

    try {

        const verified=await jwt.verify(token, process.env.JWTSECRET);

        if(!verified)
        {
            return res.sendStatus(404);
        }
        
        const MyPosts=await PostModel.find({userid:verified.userid});
        
        return res.status(200).json({"MyPosts":MyPosts});

        
    } catch (error) {
        return res.sendStatus(404);
        
    }
    
})


Router.post("/",async(req, res)=>{

    const token=req.query.token;
    if(token==undefined)
    {
        return res.sendStatus(404);
    }
    if(!token)
    {
        
        return res.sendStatus(404).json({"crdentials":"invalid"});
        
    }
    try {

        const verified=await jwt.verify(token, process.env.JWTSECRET);

        if(!verified)
        {
            
            return res.sendStatus(404).json({"crdentials":"invalid"});
        }

        await PostModel.deleteOne({_id : req.body.postid});
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(404);
    }

})

module.exports=Router;
