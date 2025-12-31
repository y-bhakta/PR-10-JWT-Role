import jwt from "jsonwebtoken";
import Usermodel from "../models/usermodel.js";

const checkClientAuth = async (req, res, next) => {
    let { token } = req.cookies;
    if (!token) {
        return res.redirect('/login');
    }
    let decode=jwt.verify(token,"myTokenKey");
    let oneuser = await Usermodel.findOne({_id:decode.userId});
    res.locals.user=oneuser;
    return next();
};

export default checkClientAuth;