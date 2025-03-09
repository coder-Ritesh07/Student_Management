let express=require('express')
const { registerAdmin, adminLogin, getStudent, adminLogout } = require('../controllers/Admin')
const { jwtMiddleWareAuthentication } = require('../middleware/Auth')

let adminRoute=express.Router()

adminRoute.post('/admin',registerAdmin)
adminRoute.post('/adminlogin',adminLogin)
adminRoute.get('/admin/getstudent', jwtMiddleWareAuthentication ,getStudent)
adminRoute.post('/adminlogout',adminLogout)

module.exports={
    adminRoute
}