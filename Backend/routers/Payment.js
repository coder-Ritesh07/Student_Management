let express=require('express')
const { receipt, sendpayment, updatepayment } = require('../controllers/Payment')
const { jwtMiddleWareAuthentication } = require('../middleware/Auth')

let paymentRoute=express.Router()

paymentRoute.get('/receipt/:userid',jwtMiddleWareAuthentication,receipt)
paymentRoute.post('/receipt/:userid', jwtMiddleWareAuthentication ,sendpayment)
// paymentRoute.put('/receipt/:userid',updatepayment)

module.exports={
    paymentRoute
}