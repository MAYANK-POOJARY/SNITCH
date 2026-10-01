import jwt from "jsonwebtoken"
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";

export async function authenticateSeller(req, res, next){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if(!user){
            return res.status(401).json({
                message: "unauthorized"
        })
        }

        if(user.role !== "seller"){
            return res.status(403).json({
                message: "Forbidden"
            })
        }

        req.user = user;
        next()
        
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized" })
    }
}



// middleware to verify the user 
export async function authenticateUser(req, res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if(!user){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Unauthorized" })
    }
}