
const jwt = require('jsonwebtoken');



exports.requireSignIn = (req , res , next) =>{
    if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    console.log(user)
        
    } else {
        return res.status(400).json({message: "authorization reqired"})
    }
    next ();
    
}

exports.userMiddleware = (req, res, next) =>{

    if(req.user.role !== 'user'){
        return res.status(400).json({message: 'User Access Denied'});
    }
next();

}

exports.teacherMiddleware = (req, res, next) =>{

    if(req.user.role !== 'teacher'){
        return res.status(400).json({message: 'User Access Denied'});
    }
next();

}