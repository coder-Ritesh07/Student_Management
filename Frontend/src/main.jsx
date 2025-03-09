import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import HomePage from './Components/HomePage.jsx'
import StudentDetails from './Components/StudentDetails.jsx'
import Payment from './Components/Payment.jsx'
import PaymentReceipt from './Components/PaymentReceipt.jsx'
import AdminOptionPage from './Components/Admin/AdminOptionPage.jsx'
import StudentRegister from './Components/Admin/StudentRegister.jsx'
import ShowStudentData from './Components/Admin/ShowStudentData.jsx'
import AdminDashBoard from './Components/Admin/AdminDashBoard.jsx'
import ShowSpecificData from './Components/Admin/ShowSpecificData.jsx'
import AddminRegister from './Components/Admin/AdminRegister.jsx'


const route=createBrowserRouter([
  {
    path:'/',
    element:<HomePage/>
  },
  {
    path:'/login/studentdetails/:userid',
    element:<StudentDetails/>
  },
  {
    path:'/admin/register',
    element:<AddminRegister/>
  },
  {
    path:'/student/payment/:userid',
    element:<Payment/>
  },
  {
    path:'/student/paymentreceipt/:userid',
    element:<PaymentReceipt/>
  },
  {
    path:'/admin/:adminid',
    element:<AdminOptionPage/>
  },
  {
    path:'/admin/student/register',
    element:<StudentRegister/>
  },
  {
    path:'/student/register/:studentid',
    element:<ShowStudentData/>
  },
  {
    path:'/admin/dashboard',
    element:<AdminDashBoard/>
  },
  {
    path:'/admin/dashboard/:studentid',
    element:<ShowSpecificData/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route} ></RouterProvider>
  </StrictMode>,
)
