const jwt=require('jsonwebtoken')
require('dotenv').config();

let JWT_SECRETKEY=process.env.JWT_SECRET_KEY
async function jwtMiddleWareAuthentication(req,res,next) {
    let token=req.cookies.token;
    if(!token){
       return res.status(404).json({error:"Token not found,Authorization denied"})
    }
    try {
        let decode=jwt.verify(token,JWT_SECRETKEY)
        req.user=decode
        next()
    } catch (error) {
        console.error(error)
        res.status(404).json({messege:"Invalid Token"})
    }
    
}

function generateTokens(userdata){
    // console.log(userdata)
    return jwt.sign(userdata,JWT_SECRETKEY,{expiresIn:30000})
}

module.exports={
    jwtMiddleWareAuthentication,
    generateTokens
}