import axiosInstance from "../configs/axios.js";
import bcrypt from "bcrypt";
import Usermodel from "../models/usermodel.js";
import env from "dotenv";
import jwt from "jsonwebtoken";
env.config();

const clientctl={
    // dasboard
    async dashboard(req,res){
        try {
            let totalUsers=await Usermodel.countDocuments();
            let totalManagers=await Usermodel.countDocuments({role:"Manager"});
            let totalEmployees=await Usermodel.countDocuments({role:"Employee"});
            return res.render('./index.ejs',{
                totalUsers,
                totalManagers,
                totalEmployees
            });
        } catch (error) {
            return res.render('./index.ejs',{
                totalUsers:0,
                totalManagers:0,
                totalEmployees:0
            });
        }
    },
    // login page
    loginpage(req,res){
        return res.render('./pages/login.ejs');
    },
    async login(req,res){
        try {
            let response = await fetch(`${process.env.API_URL}api/user/login`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(req.body)
            });
            let data=await response.json();          
            res.cookie('token',data.token);
            return res.redirect('/');
        } catch (error) {
            console.log(error);
            return res.redirect('/login');
        }
    },
    //logout
    logout(req,res){
        return res.clearCookie('token').redirect('/login');
    },
    //Adding The Manager And Employee By Admin Only
    addPersonPage(req,res){
        return res.render('./pages/addPerson.ejs');
    },
    async addPerson(req,res){
        try {
            console.log(req.body);            
            const token = req.cookies && req.cookies.token;
            const headers = { "Content-Type": "application/json" };
            if (token) headers.Cookie = `token=${token}`;
            let Response = await fetch(`${process.env.API_URL}api/user/`, {
                method: "POST",
                headers,
                body: JSON.stringify(req.body)
            });
            const result = await Response.json().catch(()=>null);
            console.log('Create user response:', Response.status, result);
            if (!Response.ok) {
                console.log('Create failed:', result);
                return res.redirect(req.get('Referer') || '/');
            }
            return res.redirect(req.get('Referer') || '/');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referer') || '/')
        }
    },
    // View Managers Page
    async viewManagersPage(req,res){
        try {
            let ress= await fetch(`${process.env.API_URL}api/user/`,{
                method:"GET"
            })
            let data = await ress.json();
            let manager=data.filter((item)=>item.role==="Manager");
            return res.render('./pages/viewManagers.ejs',{
                manager
            });
        } catch (error) {
            console.log(error);
            return res.render('./pages/viewManagers.ejs',{
                manager:[]
            });
        }
    },
    // Delete Manager
    async deleteManager(req,res){
        try {
            await axiosInstance.delete(`/user/${req.params.id}`);
            return res.redirect(req.get('Referer') || '/');
        } catch (error) {
            console.log(error);
            return res.redirect(req.get('Referer') || '/');
        }
    },
    // Edit Manager
    async editManagerPage(req,res){
        try {
            let data= await axiosInstance.get(`/user/${req.params.id}`);
            return res.render('./pages/editManager.ejs',{
                manager:data.data
            });
        } catch (error) {
            console.log(error);
            return res.redirect('/view-managers');  
        }
    },
    async editManager(req,res){
        try {
            req.body.password=await bcrypt.hash(req.body.password,10);
            await axiosInstance.patch(`/user/${req.params.id}`,req.body);
            return res.redirect(req.get('Referer') || '/');
        } catch (error) {
            console.log(error);
            return res.redirect(req.get('Referer') || '/');
        }
    },
    // View Employee Page
    async viewEmployeePage(req,res){
        try {
            let ress= await fetch(`${process.env.API_URL}api/user/`,{
                method:"GET"
            })
            let data = await ress.json();
            let Emp=data.filter((item)=>item.role==="Employee");
            return res.render('./pages/viewEmployee.ejs',{
                Emp
            });
        } catch (error) {
            console.log(error);
            return res.render('./pages/viewEmployee.ejs',{
                Emp:[]
            });
        }
    },
    // Make MAnager
    async makeManager(req,res){
        try {
            const {id}=req.params;
            let data=await Usermodel.findById(id);
            data.role="Manager";
            await data.save();
            return res.redirect('/view-employee');
        } catch (error) {
            console.log(error);
            return res.redirect('/view-employee');
        }
    },
    // Change Password
    changePasswordPage(req,res){
        return res.render('./pages/changePassword.ejs');
    },
    async changePassword(req,res){
        try {
            const { currentPassword, newPassword, confirmPassword } = req.body;
            const { token } = req.cookies;
            let decoded=jwt.verify(token,"myTokenKey");
            let user=await Usermodel.findById(decoded.userId);
            let isValid = await bcrypt.compare(currentPassword, user.password);
            if (isValid) {
                if (newPassword == confirmPassword) {
                    user.password = await bcrypt.hash(newPassword, 10);
                    await user.save();
                    return res.redirect('/logout');
                } else {
                    console.log('error', 'new password and confirm password not match');
                    return res.redirect('/changepassword');
                }
            } else {
                console.log('error', 'Current Password Not Match');
                return res.redirect('/changepassword');
            }
        } catch (error) {
            console.log(error);
            return res.redirect('/changepassword');
        }
    },
    profile(req, res) {
        return res.render('./pages/profilepage.ejs');
    },
    editprofilepage(req, res) {
        return res.render('./pages/editprofilepage.ejs');
    },
    async editprofile(req, res) {
        try {
            let oneuser = res.locals.user;
            const updateData = { ...req.body };
            if (req.file) {
                updateData.image = `uploads/${req.file.filename}`;
                console.log(`[editprofile] Image uploaded: ${updateData.image}`);
            } else {
                console.log('[editprofile] No file received from multer');
            }
            let dbuser = await Usermodel.findByIdAndUpdate(oneuser.id, updateData, { new: true });
            console.log(`[editprofile] User updated. Image field in DB: ${dbuser.image}`);
            return res.redirect('/profile');
        } catch (error) {
            console.error('[editprofile] Error:', error);
            return res.redirect('/edit-profile');
        }
    }
};

export default clientctl;