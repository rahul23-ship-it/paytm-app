require("dotenv").config();
import mongoose from "mongoose";
import { Schema , model } from "mongoose";
const objectId = Schema.ObjectId ;
const MONGO_URL = process.env.MONGO_URL ;
mongoose.connect(MONGO_URL) ;


const UserSchema = new Schema ({
    username : {type : String , required:true , unique:true} ,
    password : {type:String , required: true}  ,
    firstname : {type:String , required: true} ,
    lastname : {type:String , required: true} 
})

export const UserModel  = model("User" , UserSchema) ;

