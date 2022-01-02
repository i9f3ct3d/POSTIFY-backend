const Router=require("express").Router();
const PostModel=require("../models/postModel");
const PostReactNotificationModel = require("../models/postReactNotificationModel");

Router.post("/", async(req, res)=>{
    ///// send username too ////// for faster execution /////

    const postid = req.body.postid;
    const userid = req.body.userid;
    const username = req.body.username;
    const userProfilePic = req.body.userProfilePic;

    try {

        const FoundPost=await PostModel.findById(postid);

        if(!FoundPost)
        {
            return res.sendStatus(404);
        }
        
        let flag=false;

        for await(const ele of FoundPost.likeArray){
            if(ele === userid){
                flag = true;
                break;
            }
        }

        let n_flag=true;

        if(flag)
        {
            n_flag = false;
            FoundPost.likeArray.remove(userid);
        }
        else{
            
            FoundPost.likeArray=[...FoundPost.likeArray,userid];

        }

        await FoundPost.save();
        if(n_flag && FoundPost.userid != userid){

            const foundSameNotification = await PostReactNotificationModel.findOne({postid : postid , reactorid : userid});
            // const reactor = await UserModel.findById(userid);

            if(!foundSameNotification){
                const newNotification=new PostReactNotificationModel({
                    type : "react",
                    postid : postid,
                    postOwnerid : FoundPost.userid,
                    reactorid : userid,
                    reactorUsername : username,
                    reactorProfilePic : userProfilePic,
                    isSeen : false,
                    time : new Date()
                })
                await newNotification.save();
            }

        }
        return res.status(200).json(FoundPost.likeArray);
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(404);
    }
})

module.exports=Router;