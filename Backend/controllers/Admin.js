const {   admin } = require("../models/Admin")
const bcrypt=require('bcrypt')
const { generateTokens } = require("../middleware/Auth")
const { students } = require("../models/Student")

const cookieOption={
    httpOnly:true,
    secure: true,
    sameSite:'None'
}

let registerAdmin=async(req,res)=>{
    let {adminname,contactnumber,gmail,address,adminusername,password}=req.body
    try {
        let userexist=await admin.findOne({ $and: [{ adminname }, { adminusername }] })
        if(userexist)
        {
            return res.status(404).json({messege:"Admin Already Exits,Try Another Name"})
        }
        let securePassword=await bcrypt.hash(password,10)
        let newAdmin=new admin({adminname,contactnumber,gmail,address,adminusername,password:securePassword})
        await newAdmin.save()
        res.status(201).json({messege:"Admin Registered Successfully",newAdmin:newAdmin})
    } catch (error) {
        if (error.name === "ValidationError") {
            // Log the error details
            console.error("Validation Error Details:", error.errors);
        
            // Extract and send a meaningful message to the client
            const errorMessages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ messege: "Validation failed", errors: errorMessages });
          }
        
          // Log and handle general errors
          console.error("An unexpected error occurred:", error.message);
          res.status(500).json({ message: "Internal Server Error" });
    }
}


let adminLogin=async(req,res)=>{
    let{adminusername,password}=req.body;
    // console.log(adminusername,password)
    try {
        let admindata=await admin.findOne({adminusername})
    console.log(admindata)
    if(admindata&&(await bcrypt.compare(password,admindata.password)))
    {
        // console.log("Ohk...")
        let payload={
            id:admindata._id,
            usename:admindata.adminusername,
        }
        let tokens=generateTokens(payload)
        res.cookie('token',tokens,cookieOption)
        res.status(200).json({messege:"Admin Login Successfully",tokens,payload})
    }
    else{
        res.status(404).json({error:"Invalid Credentials"})
    }
    } catch (error) {
        console.log(error)
        res.status(500).json({messege:"Internal server Error"})
    }
    
}

let getStudent=async(req,res)=>{
    try {
        let allStudent=await students.find();
        if(!allStudent)
        {
           return res.status(404).json({messege:"Students Not Found"})
        }
        res.status(200).json({messege:"Students Found Successfully",allStudent:allStudent})
    } catch (error) {
        console.log(error)
        res.status(500).json({messege:"Internal Server Error"})
    }
}
const adminLogout=async(req,res)=>{
    res.clearCookie('token',cookieOption).status(200).json({messege:"Admin Logout Successfully"})
}

module.exports={
    registerAdmin,
    adminLogin,
    getStudent,
    adminLogout
}