const User = require("../models/UserModel")
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils");

// Register User

const registerUser = asyncHandler(async(req, res) => {
    
    const {name, email, password} = req.body

    if(!name || !email || !password) {
      return  res.status(400).json({message: "All field are required"})
    }

    const existing = await User.findOne({email});

    if(existing) {
      return  res.status(400).json({message: "Email already exist"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashPassword
    })


    const token = generateToken(user._id);

    res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expireIn: new Date(Date.now() + 1000 * 86400),  //24hrs
    sameSite: "none",
    secure: true
    });

    if(user) {
        const { _id, name, email, isAdmin, orderList, cartList} = user;
        res.status(201).json({
            _id,
            name,
            email,
            cartList,
            orderList,
            isAdmin
        })
    }else {
       return res.status(400).json({message: "Invalid user data"})
    }
    
});


const registerAdmin = asyncHandler(async(req, res) => {

    const {name, email, password} = req.body

    if(!name || !email || !password) {
     return res.status(400).json({message: "password must be at least 6 characters"})
    }

    const existing = await User.findOne({email});

    if(existing) {
     return  res.status(400).json({message: "Email already exist"})
        }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashPassword,
        isAdmin: true
    })

     
    const token = generateToken(user._id);

    res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),  //24hrs
    sameSite: "none",
    secure: true
    });

    if(user) {
        const { _id, name, email, isAdmin, orderList, cartList} = user;
        res.status(201).json({
            _id,
            name,
            email,
            cartList,
            orderList,
            isAdmin
        })
    }else {
      return  res.status(400).json({message: "Invalid user data"})
    }
    
});

const loginUser = asyncHandler(async (req, res) => {

    const { email, password} = req.body;

    if(!email || !password ) {
     return  res.status(400).json({message: "please provide your email anmd password"})
    }

    const user = await User.findOne({email});
    if(!user) {
     return  res.status(401).json({message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
       return res.status(401).json({message: "Invalid password"})
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),  //24hrs
    sameSite: "none",
    secure: true
    });

    if(user) {
        const { _id, name, email, isAdmin, orderList, cartList} = user;
        res.status(201).json({
            _id,
            name,
            email,
            cartList,
            orderList,
            isAdmin
        })

    }
    
});

const logoutUser = asyncHandler(async(req, res) => {

    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires:new Date(0),
        sameSite: "none",
        secure: true
    });

    res.status(200).json({message: "Logout Successfully"})
})

const getUserProfile = asyncHandler(async( req, res) => {
    const user = req.user;

    if(user) {
        const { name, email, _id, isAdmin, cartList, orderList} = user;

        res.status(200).json({
            _id,
            name,
            email,
            isAdmin,
            cartList,
            orderList
        })
    } else {
      return  res.status(404).json({message: "User not found"})
    }
})

const loginStatus = asyncHandler(async(req, res) => {
    const token = req.cookies.token;

    if(!token) {
       return res.json(false);
    }

    //VERIFY TOKEN IF IS AVAILABLE
     const verified = jwt.verify(token, process.env.JWT_TOKEN)
     if(verified){
        return res.json(true)
     }
     return res.json(false);
})

module.exports = {
    registerUser,
    registerAdmin,
    loginUser,
    loginStatus,
    logoutUser,
    getUserProfile
}