const express = require("express");
const app = express();
app.use(express.json()) ;
import { UserModel } from "./db.js" ;
const PORT = process.env.PORT || 3000 ;
const MONGO_URL = process.env.MONGO_URL ;   
const jwt = require("jsonwebtoken") ;
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key" ;
const Routes = express.Router() ;