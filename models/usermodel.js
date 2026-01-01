import mongoose from "mongoose";
import { type } from "os";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Admin','Manager','Employee'],
        default:'Employee'
    },
    image:{
        type:String,
        default:''
    },
    Bio:{
        type:String,
        default:''
    },
    DOB:{
        type:String,
        default:''
    },
    Mobile:{
        type:String,
        default:''
    },
    gender:{
        enum:['Male','Female'],
        type: String,
        default:'Male'
    }
});

const Usermodel = mongoose.model("User",userSchema);

export default Usermodel;