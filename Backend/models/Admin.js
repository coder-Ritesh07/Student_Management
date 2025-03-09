let mongoose=require('mongoose')

let adminSchema=new mongoose.Schema({
    student:{
        type:String,
        ref:"Studentdatas",
        require:true
    },
    adminname:{
        type:String,
        require:true,
    },
    contactnumber:{
        type:String,
        require:true,
        match: [/^\d{10}$/, 'Contact number must be exactly 10 digits']
    },
    gmail:{
        type:String,
    require:true,
    match: [/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Gmail ID must be a valid Gmail address']
    },
    address:{
      type:String,
      require:true,
    },
    adminusername:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
},{timestamps:true})

let admin=mongoose.model("Admin",adminSchema)

module.exports={
    admin
}