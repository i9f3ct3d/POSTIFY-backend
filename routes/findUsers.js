const Router=require('express').Router();
const jwt = require('jsonwebtoken');
const UserModel  = require('../models/userModel');

/////////////recursion/////////////////////////
const findSimilarUsers = (matchedUsers , allUsers , searchedName , index)=>{


    if(index < allUsers.length)
    {   
        let partialName = allUsers[index].username.substr(0 , searchedName.length);
        if(searchedName.toLowerCase() === partialName.toLowerCase())
        {
            matchedUsers.push(allUsers[index]);
        }
        index++;
        findSimilarUsers(matchedUsers , allUsers , searchedName , index);
    }

    return matchedUsers;
}



Router.post("/", async(req, res)=>{
    const token = req.query.token;
    const searchedName = req.body.searchedName;

    if(token == undefined)
    {
        return res.status(200).json({"status" : "not logged in"});
    }
    if(!token)
    {
        return res.status(200).json({"status" : "not logged in"});
    }

    if(!searchedName)
    {
        return res.sendStatus(200);
    }

    try {
        
        const verified=await jwt.verify(token, process.env.JWTSECRET);

        if(!verified)
        {
            return res.status(200).json({"credentials":"invalid"});
        }

        const searchedUsers = await UserModel.find({});

        return res.status(200).json({"users":findSimilarUsers([] , searchedUsers , searchedName , 0)});


    } catch (error) {
        console.log({"error":error});
        return res.sendStatus(400);
    }
     

});

module.exports=Router;