import { Router } from "express";
import clientctl from "../controller/clientctl.js";
import checkClientAuth from "../middlewares/clientAuth.js";
import upload from "../middlewares/upload.js";

const clientrout=Router();

//Login ROute
clientrout.get('/login',clientctl.loginpage);
clientrout.post('/login',clientctl.login);
clientrout.get('/logout',clientctl.logout);

clientrout.use(checkClientAuth);
// Dashboard Route
clientrout.get('/',clientctl.dashboard);
clientrout.get('/addPerson',clientctl.addPersonPage);
clientrout.post('/addPerson',clientctl.addPerson);
clientrout.get('/view-managers',clientctl.viewManagersPage);
clientrout.get('/delete/:id',clientctl.deleteManager);
clientrout.get('/edit/:id',clientctl.editManagerPage);
clientrout.post('/edit/:id',clientctl.editManager);
clientrout.get('/view-employee',clientctl.viewEmployeePage);
clientrout.get('/makemanager/:id',clientctl.makeManager);
clientrout.get('/changepassword',clientctl.changePasswordPage);
clientrout.post('/changepassword',clientctl.changePassword);
clientrout.get('/profile',clientctl.profile);
clientrout.get('/edit-profile',clientctl.editprofilepage);
clientrout.post('/edit-profile', upload, clientctl.editprofile);

export default clientrout;