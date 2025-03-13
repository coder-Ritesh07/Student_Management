let mongoose = require("mongoose");

let studentSchema=new mongoose.Schema({
  Stid:{
    type:String,
    default:0
  },
  firstname:{
    type:String,
    require:true,
  },
  lastname:{
    type:String,
    require:true,
  },
  fathername:{
    type:String,
    require:true,
  },
  mothername:{
    type:String,
    require:true,
  },
  studentclass:{
    type:String,
    require:true,
  },
  section:{
    type:String,
    require:true,
  },
  rollnumber:{
    type:String,
    default:0
  },
  address:{
    type:String,
    require:true,
  },
  gmail:{
    type:String,
    require:true,
    match: [/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Gmail ID must be a valid Gmail address']
  },
  contactnumber:{
    type:String,
    require:true,
    match: [/^\d{10}$/, 'Contact number must be exactly 10 digits']
  },
  alternativecontactnumber:{
    type:String,
    require:true,
    match: [/^\d{10}$/, 'Contact number must be exactly 10 digits']
  },
  addharnumberofstudent:{
    type: String,
    required: true,
    match: [/^\d{12}$/, 'Aadhaar number must be exactly 12 digits']
  },
  addharnumberofparents:{
    type: String,
    required: true,
    match: [/^\d{12}$/, 'Aadhaar number must be exactly 12 digits']
  },
  gender:{
    type:String,
    require:true,
  },
  cast:{
    type:String,
    require:true,
  },
  DOB:{
    type:String,
    require:true,
  },
  profilepic:{
    type:String,
    require:true,
  },
  username:{
    type:String,
    require:true,
  },
  password:{
    type:String,
    require:true,
  },
  annualamount:{
    type:Number,
    default:100000,
  },
},{timestamps:true})

let students=mongoose.model('Studentdatas',studentSchema)

module.exports={
    students
}


