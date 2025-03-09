let mongoose=require('mongoose')

let paymentSchema=new mongoose.Schema({
    student:{
        type:String,
        ref:"Studentdatas",
        require:true
    },
    payamount:{
        type:Number,
        require:true
    },
    restofamount:{
        type:Number,
    },
    totalpayamount: { type: Number, required: true, default: 0 }

},{timestamps:true})

let paymentreceipt=mongoose.model("receipt",paymentSchema)

module.exports={
    paymentreceipt
}