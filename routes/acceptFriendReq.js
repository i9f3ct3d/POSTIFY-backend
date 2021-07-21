const Router = require('express').Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

Router.post("/" , async (req , res)=>{

    const token  = req.query.token;

    if(!token){
        return res.sendStatus(204);
    }
    if(token === undefined){
        return res.sendStatus(204);
    }

    try {
        
        const verify=await jwt.verify(token , process.env.JWTSECRET);

        if(!verify)
        {
            return res.sendStatus(204);
        }

        const userId = verify.userid;
        const friendUserId = req.body.friendUserId;

        if(userId){

            const foundUser = await UserModel.findById(userId);

            if(foundUser)
            {
                const friendUser = await UserModel.findById(friendUserId);

                if(friendUser)
                {

                    if(!foundUser.friends.includes(friendUserId) && !friendUser.friends.includes(userId) && foundUser.friendReqRecieved.includes(friendUserId))
                    {
                        foundUser.friends=[...foundUser.friends , friendUserId];
                        friendUser.friends=[...friendUser.friends , userId];
                        
                        foundUser.friendReqRecieved.remove(friendUserId);
                        friendUser.friendReqSent.remove(userId);

                        foundUser.save();
                        friendUser.save();
    
                        return res.sendStatus(200);
                    }

                }
            }

        }

        return res.sendStatus(204);


    } catch (error) {
        console.log({"error":error});
        return res.sendStatus(400);
    }

});

module.exports=Router;