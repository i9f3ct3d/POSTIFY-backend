const Router = require('express').Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

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
    
        const foundUser = await UserModel.findById(req.body.userId);
        const viewingUser = await UserModel.findById(verify.userid);

        return res.status(200).json({
            "user":foundUser,
            "viewingUser":viewingUser,
        })
        
    } catch (error) {
        console.log({"error":error});
        return res.sendStatus(400);
    }

})

module.exports = Router;