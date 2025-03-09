let express=require('express')
const { sendStudent, userLogin, userLogout, getAllStudents,  deleteStudent } = require('../controllers/Student')
const { jwtMiddleWareAuthentication } = require('../middleware/Auth')
const upload = require('../middleware/Multer')


let studentRoute=express.Router()

studentRoute.post('/register',jwtMiddleWareAuthentication,upload.single("profilepic"),sendStudent)
studentRoute.post('/login',userLogin)
studentRoute.post('/logout',userLogout)
studentRoute.get('/fetchStudent/:userid',jwtMiddleWareAuthentication,getAllStudents)
studentRoute.delete('/studentdelete/:userid',jwtMiddleWareAuthentication,deleteStudent)


module.exports={
    studentRoute
}