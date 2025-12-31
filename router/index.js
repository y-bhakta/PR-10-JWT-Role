import { Router } from "express";
import userrouter from "./userrouter.js";

const router = Router();

router.use('/user',userrouter);

export default router;