import bcrypt from "bcrypt";
import Usermodel from "../models/usermodel.js";
import jwt from "jsonwebtoken";

const userctl={
    async getallusers(req,res){
        try {
            const user=await Usermodel.find({});
            return res.json(user);
        } catch (error) {
            return res.json(error);
        }
    },
    async createuser(req,res){
        try {
            req.body.password=await bcrypt.hash(req.body.password,10);
            await Usermodel.create(req.body); 
            return res.json({message:"User Created !"});
        } catch (error) {
            return res.json(error);
        }
    },
    async getoneuser(req,res){
        try {
            const {id}=req.params;
            const user=await Usermodel.findById(id);
            return res.json(user);
        } catch (error) {
            return res.json(error);
        }
    },
    async deleteuser(req,res){
        try {
            const {id}=req.params;
            const user=await Usermodel.findByIdAndDelete(id);
            return res.json({message:"User Deleted !",data:user});
        } catch (error) {
            return res.json(error);
        }
    },
    async updateuser(req,res){
        try {
            const {id}=req.params;
            const user=await Usermodel.findByIdAndUpdate(id,req.body);
            return res.json({message:"User Updated !",data:user});
        } catch (error) {
            return res.json(error);
        }
    },
    async loginuser(req,res){
        try {
            const {email,password}=req.body;
            let user=await Usermodel.findOne({email});
            if(!user){
                return res.json({message:"User not found !"});
            }
            const isValid=await bcrypt.compare(password,user.password);
            if(!isValid){
                return res.json({message:"Invalid Credentials !"});
            }
            let payload={
                userId:user._id,
                Role:user.role
            };
            const token=jwt.sign(payload,"myTokenKey");
            return res.json({message:"Login Successful !",token:token});
        } catch (error) {
            return res.json(error);
        }
    },
    logout(req,res){
        return res.clearCookie("token").json({message:"Logout Successful !"});
    }
}

export default userctl;