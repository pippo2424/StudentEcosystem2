const { ifError } = require("assert");
const Teacher = require("../modals/teacher");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

exports.signupTeacher = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNo,
      email,
      profilePicture,
      password,
      subject,
      bio,
    } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const checkUser = await Teacher.findOne({ email: email });
    if (checkUser) {
      return res.status(400).json({ message: " Teacher already exist" });
    }

    const newUser = new Teacher({
      firstName,
      lastName,
      phoneNo,
      email,
      profilePicture,
      hash_password,
      subject,
      bio,
      teacherId: "SE-" + shortid()
    });

    const savedUser = await newUser.save();
    console.log(savedUser)
    const token = generateJwtToken(savedUser._id, savedUser.role);
    return res.status(201).json({
      token,
      teacher: savedUser
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json(error);
  }
};

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