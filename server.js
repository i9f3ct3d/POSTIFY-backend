const express=require("express");
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

const path = require ('path');

const app=express();
app.use(cors());
app.use(express.json());

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

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>
{
    console.log(`server started on port ${PORT}`);
})
