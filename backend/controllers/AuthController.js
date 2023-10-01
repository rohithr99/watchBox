const User = require('../models/userModel');
const { createSecretToken } = require('../util/SecretToken');
const bcrypt = require('bcrypt');

signUp = async (req, res, next) => {
    try{
        const { username, email, password , createdAt} = req.body;
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(401).json({message: 'User already exists',success: false});
        }
        const user = await User.create({username, email, password, createdAt});
        const token = createSecretToken(user._id);
        res.cookie("token",token,{
            withCredentials : true,
            httpOnly : false
        });
        res.status(201).json({message: "User signed in successfully",success: true, user});
        next();

    }catch(error){
        console.log(error);
        res.status(404).json({message: "failed to add a new user",success: false,error});
    }
}

login = async (req, res ,next) => {
    try{
        const { email , password } = req.body;
        if( !email || !password ){
            return res.json({message: "All fields are required",success: false});
        }
        const user = await User.findOne({email});
        if( !user ){
            return res.status(404).json({message : "User not found", success :false});
        }
        const auth = await bcrypt.compare(password,user.password);
        if( !auth ){
            return res.status(404).json({ message: "Incorrect password or email" ,success :false });
        }
        const token = createSecretToken(user._id);
        res.cookie("token",token,{
            withCredentials: true,
            httpOnly: false
        });
        res.status(202).json({ message: "User logged in successfully", success: true });
        next();
    }catch(err){
        res.status(404).json({message: "failed to login", success: false });
    }
}

module.exports = { signUp, login };