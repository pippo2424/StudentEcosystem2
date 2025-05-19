const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName : {
        type:String
    },
    lastName : {
        type:String
    },
    email : {
        type:String
    },
    hash_password: {
        type:String,
        required:true
    },
    role: {
        type:String,
        required:true,
        default: 'user'
    },
    phoneNo: {
        type:String
    },
    profilePicture: {
        type:String
    },
    classes: {
        type:String
    },
    totalMark: {
        type:Number,
        default:0,
        required:true
    },
    annualMark: {
        type:Number,
        default:0,
        required:true
    },
    halfYearlyMark: {
        type:Number,
        default:0,
        required:true
    },
    rollNo: {
        type:String,
        required:true
    },
    attendance: {
        type:Number,
        required:true,
        default:0
    },
    ranking: {
        type:Number,
        required:true,
        default:0
    },

},{timestamps:true}
);

userSchema.methods = {
    authenticate: async function(password){
        return await bcrypt.compare(password, this.hash_password)
    }

}

module.exports=mongoose.model('User',userSchema)