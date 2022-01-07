require('./routes/auth')
const express=require("express");
const passport = require('passport')
const session = require('express-session');
const cors=require("cors");

require("dotenv").config();

const LogIn= require("./routes/login");
const SignUp=require("./routes/signup");
const Home=require("./routes/home")
const NewPost=require("./routes/newpost")
const MyPost=require("./routes/mypost");
const PostInfo =require("./routes/postInfo");
const likePost=require("./routes/likePost");
const FindUsers=require('./routes/findUsers');
const SendFriendReq=require('./routes/sendFriendReq');
const RemoveSentFriendReq = require('./routes/removeSentFriendReq');
const RemoveRecievedFriendReq = require('./routes/removeRecievedFriendReq');
const AcceptFriendReq = require('./routes/acceptFriendReq');
const RemoveFriend = require('./routes/removeFriend');
const GetUser = require('./routes/getUser');
const GetMyProfile = require('./routes/getMyProfile');
const GetOnlyUserData = require('./routes/getOnlyUserData');
const SendMessage = require('./routes/sendMessage');
const GetMessages = require('./routes/getMessages');
const Conversation = require('./routes/coversation');
const SignupUsingGoogle = require('./routes/signupUsingGoogle');
const FetchUser = require('./routes/fetchUser');
const GetNotifications = require('./routes/getNotifications')
const SavePost = require('./routes/savePost')
const GetSavgedPosts = require('./routes/getSavedPosts')
const NotificationSeen = require('./routes/notificationSeen')
const GetOnlineUsers = require('./routes/getOnlineUsers')
const GetReceivedRequestUserData = require('./routes/getReceivedRequestUserData');
const GetMessagePageUserData = require('./routes/getmessagepageuserdata');
const MessageSeen = require('./routes/messageSeen');
const LeftNavbar = require('./routes/leftnavbar');
const GetPaginatedPosts = require('./routes/getPaginatedPosts');
const GetSingleOnlineUser = require('./routes/getSingleOnlineUser');
const IsAuthenticated = require('./routes/isAuthenticated')

const path = require ('path');

const app=express();
app.use(cors());
app.use(express.json());
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());


/////////monogDB/////////

const mongoose=require("mongoose");
mongoose.connect(process.env.MONGODBSERVER, {useNewUrlParser: true, useUnifiedTopology: true});

/////////monogDB/////////

app.use("/uploads/images" , express.static(path.join('uploads' , 'images')));

app.use("/login",LogIn);
app.use("/signup",SignUp);
app.use("/home",Home);
app.use("/newpost",NewPost);
app.use("/mypost",MyPost);
app.use("/postinfo",PostInfo);
app.use("/likepost",likePost);
app.use("/findusers",FindUsers);
app.use('/sendfriendreq',SendFriendReq);
app.use('/removesentfriendreq',RemoveSentFriendReq);
app.use('/removerecievedfriendreq',RemoveRecievedFriendReq);
app.use('/acceptfriendreq',AcceptFriendReq);
app.use('/removefriend',RemoveFriend);
app.use('/getuser',GetUser);
app.use('/getmyprofile',GetMyProfile);
app.use('/getonlyuserdata', GetOnlyUserData);
app.use('/sendmessage', SendMessage);
app.use('/getmessages', GetMessages);
app.use('/conversation', Conversation);
app.use('/signupusinggoogle', SignupUsingGoogle);
app.use('/fetchuser', FetchUser);
app.use('/getnotifications', GetNotifications);
app.use('/savepost', SavePost);
app.use('/getsavedposts', GetSavgedPosts);
app.use('/notificationseen', NotificationSeen);
app.use('/getonlineusers', GetOnlineUsers);
app.use('/getreceivedrequestuserdata', GetReceivedRequestUserData);
app.use('/getmessagepageuserdata', GetMessagePageUserData);
app.use('/messageseen', MessageSeen);
app.use('/leftnavbar', LeftNavbar);
app.use('/getposts', GetPaginatedPosts);
app.use('/getsingleonlineuser', GetSingleOnlineUser);
app.use('/isauthenticated', IsAuthenticated);


const PORT=process.env.PORT||5000;

app.listen(PORT,()=>
{
    console.log(`server started on port ${PORT}`);
})
