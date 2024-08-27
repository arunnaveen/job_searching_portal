const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async(req,res) => {
    const { name, email, usertype, password} = req.body;

    try{
        if (!name || !email || !usertype || !password) {
            return res.status(400).json({message: "Please Enter all Fields"});
        }
    
        let user = await User.findOne({email});
        if(user) {
            return res.status(400).json({message: "User already exists"});
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = await User.create({
            name,
            email,
            usertype,
            password: hashedPassword
        });
        
        if(newUser) {
            return res.status(201).json({
                _id: newUser.id,
                name: newUser.name,
                usertype: newUser.usertype,
                token: generateJwt(newUser.id)
            });
        }
    } catch(error) {
       console.error(error.message);
       return res.status(500).send("Server error");
    }
}

const login = async(req,res) => {
    const {email, password} = req.body;

    try{
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "Invalid Credentials"});
        }
         
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch) {
            return res.status(200).json({
                _id: user.id,
                name: user.name,
                usertype: user.usertype,
                token: generateJwt(user.id)
            });
        } else {
            return res.status(400).json({message: "Invalid credentials"});
        }
    } catch(error) {
        console.error(error.message);
        return res.status(500).send("Server Error");
    }
}

const generateJwt = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '20d'});
}

module.exports = {signup, login}