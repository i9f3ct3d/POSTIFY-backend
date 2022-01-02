const Router=require("express").Router();
const UserModel=require("../models/userModel");
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

                
                return res.status(200).json({"credentials":"valid" , "user" : foundUser});
                
                
            }
            return res.status(200).json({"credentials":"invalid"});
            
        

        
    } catch (error) {

        console.log({error : error});
        return res.sendStatus(404);
        
    }
    
})



module.exports=Router;
