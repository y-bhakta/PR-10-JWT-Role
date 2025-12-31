import axiosInstance from "../configs/axios.js";
import bcrypt from "bcrypt";
import Usermodel from "../models/usermodel.js";
import env from "dotenv";
env.config();

const clientctl={
    // dasboard
    dashboard(req,res){
        return res.render('./index.ejs');
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
    // Makeing A Manager As Admin
    async makeAdmin(req,res){
        try {
            const {id}=req.params;
            let data=await Usermodel.findById(id);
            data.role="Admin";
            await data.save();
            return res.redirect('/view-managers');
        } catch (error) {
            console.log(error);
            return res.redirect('/view-managers');
        }
    },
    // View Employee Page
    async viewEmployeePage(req,res){
        try {
            let ress= await fetch('http://localhost:8547/api/user/',{
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
    }
};

export default clientctl;