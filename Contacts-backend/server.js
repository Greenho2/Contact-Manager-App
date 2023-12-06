//import express and dotenv (for outside variables)
//Require is used to obtain (acquire) not a sanity check
const express = require("express");
const dotenv = require("dotenv").config();

const connectDB = require("./config/dbConnection")
connectDB();

const {errorHandler} = require("./midWare/errorHandler")
//Create server/env 
const app = express();
//Choose port and default port using ||
const port = process.env.PORT || 5000;
//midware to read json
app.use(express.json());

/*Create response for a path can also use (req,res)=>
OLD
app.get("/api/contacts", function(req,res){
    res.status(200).json({message:"Get All Contactz"});
})             */
//first param is path u put into middleware (2nd param)
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler)

//Start Server
//()=> does same thing as function()
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});
