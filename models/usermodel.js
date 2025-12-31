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
});

const Usermodel = mongoose.model("User",userSchema);

export default Usermodel;