const Router=require("express").Router();
const UserModel = require('../models/userModel');

Router.post("/",async(req, res)=>
{
    
    const onlineUsersidArray = req.body.onlineUsersidArray;


    try {
        
        const onlineUsersData = await UserModel.find({'_id' : { $in : onlineUsersidArray }});
        return res.status(200).json({
            "onlineUsersData" : onlineUsersData,
        });
        
    } catch (error) {
        return res.sendStatus(404);
        
    }
    
})


module.exports=Router;
