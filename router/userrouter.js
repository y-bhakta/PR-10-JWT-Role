import { Router } from "express";
import userctl from "../controller/userctl.js";

const userrouter=Router();

// before middleware
userrouter.post('/login',userctl.loginuser);
userrouter.get('/logout',userctl.logout);

// after middleware
userrouter.get('/',userctl.getallusers);
userrouter.post('/',userctl.createuser);
userrouter.get('/:id',userctl.getoneuser);
userrouter.delete('/:id',userctl.deleteuser);
userrouter.patch('/:id',userctl.updateuser);


export default userrouter;