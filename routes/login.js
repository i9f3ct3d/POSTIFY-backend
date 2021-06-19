const Router=require("express").Router();
const UserModel=require("../models/userModel");
const jwt=require("jsonwebtoken");

const bcrypt = require('bcrypt');

Router.post("/",async(req, res)=>{
    const email=req.body.email;
    const password=req.body.password;

    if(!email || !password)
    {
        return res.status(200).json({"credentials":"unknown error"});
    }
    
    try {
        let foundUser=await UserModel.findOne({email:email});

        if(foundUser)
        {
            const validPassword = await bcrypt.compare(password, foundUser.password);
            if(validPassword){
                const JWT=jwt.sign({ userid: foundUser._id }, process.env.JWTSECRET);
                return res.status(200).json({"credentials":"valid","token":JWT})
            }
            else{
                return res.status(200).json({"credentials":"invalid password"});
            }
        }
        return res.status(200).json({"credentials":"not found"});

    } catch (error) {
        console.log(error);
        return res.sendStatus(404);
    }
    
})

module.exports=Router;