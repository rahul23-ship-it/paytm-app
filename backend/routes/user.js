const express = require("express");
const app = express();
app.use(express.json()) ;
import { UserModel } from "./db.js" ;
const PORT = process.env.PORT || 3000 ;
const MONGO_URL = process.env.MONGO_URL ;   
const jwt = require("jsonwebtoken") ;
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key" ;
const Router = express.Router() ;
const userRouter = Router() ;
import zod from "zod" ;


const signupSchema = zod.object({
    username : zod.string().min(3).email() ,
    password : zod.string().min(6) ,
    firstname : zod.string().min(1) ,
    lastname : zod.string().min(1) 
}) ;

userRouter.post("/signup" , async (req , res) => {
    const  result  = signupSchema.safeParse(req.body) ;
    if(!result.success){
        return res.status(400).json({message : "Invalid input"}) ;
    }
    try {
        const existingUser = await UserModel.findOne({username: result.data.username}) ;
        if(existingUser){
            return res.status(400).json({message : "Username already exists"}) ;
        }
        const newUser = await UserModel.create({username: result.data.username , password: result.data.password , firstname: result.data.firstname , lastname: result.data.lastname}) ;
        res.status(201).json({message : "User created successfully"}) ;
    } catch (error) {
        res.status(500).json({message : "Internal server error"}) ;
    }
}) ;

userRouter.post("/login" , async (req , res) => {
    const {username , password} = req.body ;
    try{
        const existingUser = await UserModel.findOne({username: username , password: password}) ;
        if(existingUser){
            const token = jwt.sign({
                id : existingUser._id 
            },JWT_SECRET) ;
            return res.json({
                token : token ,
                message : "Login successful"
            })
        }else{
            return res.status(400).json({message : "Invalid username or password"}) ;
        }
    } catch (error) {
        res.status(500).json({message : "Internal server error"}) ;
    }
})

module.exports = {
    userRouter
}