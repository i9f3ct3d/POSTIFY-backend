const Router=require("express").Router();
var jwt=require("jsonwebtoken");
const upload  = require('../middleware/multerMiddleWare')

const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserModel = require("../models/userModel");

Router.get("/",async(req, res)=>{
    return res.status(200).json({"get":"true"});
})


Router.post("/", upload.single('profilePic') ,async(req, res)=>{

    const username=req.body.username;
    const email=req.body.email;
    let password=req.body.password;
    let isProfilePic=req.body.isProfilePic;

    if(!username || !email || !password)
    {
        return res.status(404).json({"credentials":"invalid"});
    }

    try {
        const hash=await bcrypt.hash(password, saltRounds);
        password=hash;

        const response=await UserModel.findOne({email:email})
        if(response)
        {
            //when entered email already exist
            return res.status(200).json({"credentials":"invalid"});
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(404);
    }

    const newUser=new UserModel({
        username:username,
        email:email,
        password:password,
        isProfilePic:isProfilePic,
        profilePic: req.file===undefined?null:req.file.path,
    })
    
    newUser.save();
    const JWT=jwt.sign({ userid: newUser._id }, process.env.JWTSECRET);
    res.status(200).json({"credentials":"valid","token":JWT});

})

module.exports=Router;