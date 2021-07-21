const Router = require('express').Router();
const jwt = require('jsonwebtoken');
const ChatModel = require('../models/chatModel');

Router.post('/',async(req , res)=>{

    const token = req.query.token;

    if(token === undefined)
    {
        return res.sendStatus(204);
    }

    if(!token)
    {
        return res.sendStatus(204);
    }

    try {

        const verify = await jwt.verify(token ,process.env.JWTSECRET);

        if(!verify)
        {
            return res.sendStatus(204);
        }
    
        const conversationId = req.body.conversationId;

        const sentChats = await ChatModel.find({conversationId:conversationId});

        return res.status(200).json({"allChats":sentChats});
        
    } catch (error) {
        console.log({"error":error});
        return res.sendStatus(400);
    }

})

module.exports = Router;