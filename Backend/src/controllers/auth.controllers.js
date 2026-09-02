import userModel from "../models/user.model.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken"

// set token and return response
async function sendTokenResponse(user, res, statusCode, message){

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token);

    res.status(statusCode).json({
        message: message,
        success: true,
        user:{
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            contact: user.contact,
            role: user.role
        }
    })
}



export async function registerUser(req, res){ 

    try{
        const {email, password, contact, fullName, isSeller} = req.body;

        const IsUserAlreadyExists = await userModel.findOne({
            $or:[{email}, {contact}]
        });

        if(IsUserAlreadyExists){
            return res.status(400).json({
                message: "User with this email or contact already exists",
            })
        }

        const user = (await userModel.create({email, password, contact, fullName, role: isSeller ? "seller": "buyer"}));

        await sendTokenResponse(user, res, 201, "User registered successfully")

    }catch(error){
        console.error("error during register", error);
        return res.status(500).json({
            message: "Server error"
        })
    }
}



export async function loginUser(req, res){

    try{
        const { email, password } = req.body;

        const user = await userModel.findOne({email}).select("+password");

        if(!user){
            return res.status(400).json({
                message: "Invalid Email"
        })
        }

        const isPasswordMatch = await user.comparePassword(password);

        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Invalid Password"
            })
        }

        await sendTokenResponse(user, res, 200, "User logged in successfully")

    }catch(error){
        console.error("error during login", error);
        res.status(500).json({
            message: "Server error"
        })
    }
}