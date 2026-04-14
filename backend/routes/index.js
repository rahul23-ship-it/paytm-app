const express = require("express");
const app = express();
app.use(express.json()) ;
const { userRouter } = require("./routes/user.js") ;
const Router = express.Router() ;
const mainRouter = Router() ;


Router.use("/user" , userRouter) ;