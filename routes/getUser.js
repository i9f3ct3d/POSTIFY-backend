const Router = require('express').Router();
const jwt = require('jsonwebtoken');

const UserModel = require('../models/userModel');
const PostModel = require('../models/postModel');

Router.post("/", async (req, res) => {

    console.log('coming');

    const token = req.query.token;

    if (token === undefined) {
        return res.sendStatus(204);
    }

    try {

        if (token) {

            const verified = await jwt.verify(token, process.env.JWTSECRET);

            if (verified) {
                const userid = verified.userid;

                if (userid) {

                    const user = await UserModel.findById(userid);

                    if (user) {


                        const searchedUserid = req.body.searchedUserid;
                        
                        const searchedUser =await UserModel.findById(searchedUserid);
                        
                        if(searchedUser)
                        {
                            const searchedUserPosts = await PostModel.find({
                                userid:searchedUserid
                            });

                            return res.status(200).json({
                                "searchedUser": searchedUser ,
                                "searchedUserPosts":searchedUserPosts,
                                "myUserid":userid
                            });
                        }
                        else{
                            return res.sendStatus(400);
                        }
                    }

                }

            }

        }
        else return res.sendStatus(204);


    } catch (error) {
        console.log({ "error": error });
        res.sendStatus(400);
    }

})



module.exports = Router;