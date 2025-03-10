import { useState } from "react"
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { TbLoader3 } from "react-icons/tb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AnotherHeader from "../AnotherHeader";

function AddminRegister(){
    let [admindata,setAdminData]=useState({"adminname":"","contactnumber":"","gmail":"","address":"","adminusername":"","password":""})
    const[loding,setloding]=useState(false)
    let navigate=useNavigate()

    function handleAdminData(e,name){
       setAdminData({...admindata,[name]:e.target.value})
    }

    async function handleAdminSignUp(){
       console.log(admindata)
       if (
        !admindata.adminname.trim() ||
        !admindata.contactnumber.trim() ||
        !admindata.gmail.trim() ||
        !admindata.address.trim() ||
        !admindata.adminusername.trim() ||
        !admindata.password.trim()
    ) {
        toast.error("Fill Up the Form Properly");
        return;
    }
    
       try {
        setloding(true)
           let res=await axios.post(`http://localhost:8000/register/admin`,admindata,{withCredentials:true})
        //    console.log(res.data.messege)
        setloding(false)
           toast.success(res.data.messege)
           setTimeout(()=>{
             navigate('/')
           },1000)
       } catch (error) {
        console.log(error);
         setloding(false)
  // Handle errors coming from the server
  if (error.response && error.response.data) {
    // Display the main error message
    toast.error(error.response.data.messege);

    // Iterate through the errors array and display individual messages
    if (Array.isArray(error.response.data.errors)) {
      for (const err of error.response.data.errors) {
        console.log(err); // Log each error message
        toast.error(err); // Display each error in a toast
      }
    }
  } else {
    // Handle cases where no response or data is returned
    console.error("Unexpected error:", error);
    toast.error("Internal Server Error");
  }
       }

    }


    return<>
    <div className="bg-[#f1c6aae4] min-h-screen overflow-hidden relative">
        <AnotherHeader/>
        <div className="max-w-[90%] mx-auto my-3 flex-col items-center justify-center    relative">
      <div>
        <h1 className="text-center font-bold md:text-3xl min-[320px]:text-xl min-[375px]:text-2xl text-orange-600  ">SignUp Page</h1>
      </div>
      <div className="flex-col justify-center max-w-[70%] mx-auto items-center ">
        <div className="md:flex md:flex-row min-[320px]:flex min-[320px]:flex-col-reverse justify-center items-center">
        <div className="flex-col">
          <div className="md:mb-5 min-[320px]:mb-3 ">
            <input
              type="text"
              name="adminusername"
              placeholder="Admin Username"
              value={admindata.adminusername}
              onChange={(e)=>handleAdminData(e,"adminusername")}
              required
              className="text-xl md:w-72 md:h-9 sm:w-80 sm:h-8 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-60  font-semibold pl-2 focus:outline-none rounded-md"
            />
          </div>
          <div className="md:mb-5 min-[320px]:mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={admindata.password}
              onChange={(e)=>handleAdminData(e,"password")}
              required
              className="text-xl md:w-72 md:h-9 sm:w-80 sm:h-8 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-60   font-semibold pl-2 focus:outline-none rounded-md"
            />
          </div>
          <div className="md:mb-5 min-[320px]:mb-3">
            <input
              type="text"
              name="adminname"
              placeholder="Admin Name"
              value={admindata.adminname}
              onChange={(e)=>handleAdminData(e,"adminname")}
              required
              className="text-xl md:w-72 md:h-9 sm:w-80 sm:h-8 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-60   font-semibold pl-2 focus:outline-none rounded-md"
            />
          </div>
          <div className="md:mb-5 min-[320px]:mb-3">
            <input
              type="number"
              name="contactnumber"
              placeholder="Contactnumber"
              value={admindata.contactnumber}
              onChange={(e)=>handleAdminData(e,"contactnumber")}
              required
              className="text-xl md:w-72 md:h-9 sm:w-80 sm:h-8 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-60   font-semibold pl-2 focus:outline-none rounded-md"
            />
          </div>
          <div className="md:mb-5 min-[320px]:mb-3">
            <input
              type="email"
              name="gmail"
              placeholder="G-mail"
              value={admindata.gmail}
              onChange={(e)=>handleAdminData(e,"gmail")}
              required
              className="text-xl md:w-72 md:h-9 sm:w-80 sm:h-8 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-60   font-semibold pl-2 focus:outline-none rounded-md"
            />
          </div>
          <div className="md:mb-5 min-[320px]:mb-3">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={admindata.address}
              onChange={(e)=>handleAdminData(e,"address")}
              required
              className="text-xl md:w-72 md:h-9 sm:w-80 sm:h-8 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-60   font-semibold pl-2 focus:outline-none rounded-md"
            />
          </div>
        </div>
        <div>
          <img
            src="/img/Signup.png"
            alt="signup-img"
            className="md:w-[500px] md:h-[450px] sm:w-96 min-[320px]:w-72 min-[320px]:h-64 min-[375px]:w-80 "
          />
        </div>
        </div>
           {loding&&<TbLoader3 className="text-[#000000] text-5xl animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  "/>}
        <div className="text-center min-[320px]:mt-4">
           {/* <Link to=> */}
           <button className="md:text-2xl sm:text-2xl sm:px-3 sm:py-1 min-[320px]:text-[18px] min-[320px]:font-semibold min-[375px]:text-[19px] min-[375px]:font-bold  font-bold bg-[#E9762B] text-white rounded-md mt-3 hover:scale-105 transition md:px-4 md:py-2 min-[320px]:px-2 min-[320px]:py-1"  onClick={handleAdminSignUp}  >SignUp</button>
        </div>
      </div>
      <ToastContainer/>
    </div>
    </div>
    </>
}

export default AddminRegister