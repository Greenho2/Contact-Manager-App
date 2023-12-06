const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
//for pswrd hash
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
//@desc Register a User
//@route POST /api/users/register
//@access public
const regUser =  asyncHandler(async function(req,res){
    const {username,email,password} = req.body;
    if (!username || !email || !password){
        res.status(400);
        throw new Error("Missing One or More Fields");
    }
    const userExists = await User.findOne({email});
    if (userExists){
        res.status(400);
        throw new Error("User Already Exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashPassword,
    });
    console.log(`User Created: ${user}`);
    if (user){
        res.status(201).json({_id:user.id, email: user.email});
    }else{
        res.status(400);
        throw new Error("User Data Not Valid");
    }
    res.json({message: "Register the User"});
});

//@desc Login a User
//@route POST /api/users/login
//@access public
const loginUser =  asyncHandler(async function(req,res){
    const {email,password} = req.body;
    if (!email||!password){
        res.status(400);
        throw new Error("Missing One or More Fields");
    }
    const user = await User.findOne({email});
    if (user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },

        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"});
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Invalid Email/Password");
    };
    res.json({message:"Login the User"});
});

//@desc Get Current User
//@route GET /api/users/current
//@access private
const curUser = asyncHandler(async (req,res)=>{
    res.json(req.user)
});

module.exports = {regUser,loginUser,curUser};