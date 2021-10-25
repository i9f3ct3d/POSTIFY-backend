const Router=require("express").Router();
const UserModel = require('../models/userModel');

Router.post("/",async(req, res)=>
{
    
    const friendReqRecievedidArray = req.body.friendReqRecieved;

    try {
        
        const friendReqRecievedUsersArray = await UserModel.find({'_id' : { $in : friendReqRecievedidArray }});
        return res.status(200).json({
            "friendReqRecievedUsersArray" : friendReqRecievedUsersArray,
        });
        
    } catch (error) {
        return res.sendStatus(404);
        
    }
    
})


module.exports=Router;
