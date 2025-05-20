const { ifError } = require('assert');
const User = require('../modals/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
}


exports.signup = async(req, res) => {
    try {
        const {firstName,lastName,rollNo,phoneNo,email,profilePicture,classes,password}=req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const checkUser = await User.findOne({email:email});
        if (checkUser) {
           return res.status(400).json({message:" User already exist"})
        }
    
        const newUser = new User({
            firstName,
            lastName,
            rollNo,
            phoneNo,
            email,
            profilePicture,
            classes,
            hash_password
        })
        
        const savedUser = await newUser.save()
        const token = generateJwtToken(savedUser._id,savedUser.role)
        return res.status(201).json({
            token,
            user:savedUser
        })
        

        
    } catch (error) {
        return res.status(400).json(error);  
    }

}

exports.signin = async(req, res) =>{
    try {
        const {email,password} = req.body
        console.log(email,password);
        const user = await User.findOne({email:email});
        console.log(user)
        if (user){
            
            const isPassword = await user.authenticate(password);
            console.log(isPassword);
            if(isPassword && user.role==="user"){
                const token = generateJwtToken(user._id, user.role)
                return res.status(200).json({
                    token,
                    user:user
                })
                


            }
            else{
                return res.status(400).json({message:"Wrong Password"});
            }
        }
        else{
            return res.status(400).json({message:"something went wrong"})
        }

    } catch (error) {
        return res.status(400).json(error);
        
    }
}

