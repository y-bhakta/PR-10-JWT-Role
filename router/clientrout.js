import { Router } from "express";
import clientctl from "../controller/clientctl.js";
import checkClientAuth from "../middlewares/clientAuth.js";

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
clientrout.get('/makeadmin/:id',clientctl.makeAdmin);
clientrout.get('/view-employee',clientctl.viewEmployeePage);
clientrout.get('/makemanager/:id',clientctl.makeManager);

export default clientrout;