const Router = require('express').Router();
const PostModel = require('../models/postModel');
const jwt = require('jsonwebtoken')

const paginatedResults = require('../middleware/paginatedResults');

Router.get('/',paginatedResults(PostModel),async(req,res) => {


    const token = req.query.token;

    if(token == undefined){

        return res.sendStatus(204);

    }
    if(!token){

        return res.sendStatus(404);

    }

    const verfied = await jwt.verify(token , process.env.JWTSECRET);

    if(!verfied){

        return res.sendStatus(400);

    }

    res.status(200).json({posts : res.paginatedResults});
    

})

module.exports = Router;