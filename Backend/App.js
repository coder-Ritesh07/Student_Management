let express=require('express')
let mongoose=require('mongoose')
const { studentRoute } = require('./routers/Student')
const cookieParser=require('cookie-parser')
const { paymentRoute } = require('./routers/Payment')
const cors=require('cors')
const { adminRoute } = require('./routers/Admin')
const fs = require("fs");
const path = require("path");

// --> Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads"); 
if (!fs.existsSync(uploadsDir)) { 
  fs.mkdirSync(uploadsDir); // --> Automatically create the directory if it doesn't exist
}


mongoose.connect('mongodb+srv://ritesh:Ritesh123@cluster0.0zvkn.mongodb.net/studentInformations')

let db=mongoose.connection

db.on('open',()=>{
    console.log("Database Connection Successfully.....")
})

db.on('error',()=>{
    console.log("Something went Wrong")
})

let app=express()

// const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
    origin:"https://student-management-rose-delta.vercel.app",
    credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, "uploads")));


app.use((req,res,next)=>{
   console.log(req.method,req.url)
   next()
})
app.get('/',(req,res)=>{
    res.json("This is the First Page")
})

// All Routes Here
app.use('/student',studentRoute)
app.use('/student',paymentRoute)
app.use('/register',adminRoute)

let PORT=8000
app.listen(PORT,()=>{
    console.log(`Server Running on http://localhost:${PORT}`)
})