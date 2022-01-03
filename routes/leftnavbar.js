const Router=require("express").Router();
const UserModel=require("../models/userModel");
const jwt=require("jsonwebtoken");

Router.get("/",async(req, res) =>
{
    
    const token=req.query.token;

    if(token === undefined)
    {
        return res.sendStatus(204);
    }
    if(!token)
    {
        return res.sendStatus(404);
        
    }

    try {

        const verified=await jwt.verify(token, process.env.JWTSECRET);

        if(!verified)
        {
            return res.sendStatus(204)
        }
        

            const foundUser=await UserModel.findById(verified.userid);
            if(foundUser){
            
                return res.status(200).json({
                    username : foundUser.username , 
                    userProfilePic : foundUser.profilePic
                });
                
                
            }
            return res.sendStatus(204);
            
        

        
    } catch (error) {
        return res.sendStatus(404);
        
    }
    
})



module.exports=Router;
