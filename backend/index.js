require("dotenv").config() ;
import express from "express" ;
const app = express();
app.use(express.json()) ;
import {PORT , MONGO_URL} from "./config.js" ;
import {userRouter} from "./routes/user.js" ;
import cors from "cors" ;
app.use(cors()) ;

app.use("/api/v1/user" , userRouter) ;

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`) ;
})