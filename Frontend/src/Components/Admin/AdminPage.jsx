import { useState } from "react";
import Header from "../Header";
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { TbLoader3 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function AdminPage() {
   let [admin,setAdmin]=useState({"adminusername":"","password":""})
   const[loding,setloding]=useState(false)
   let navigate=useNavigate()

   function handleAdminLogin(e,name){
      setAdmin({...admin,[name]:e.target.value})
   }
   console.log(admin)
   
   async function handleAdminButton(){
    console.log("Clicked.....")
    if(admin.adminusername===""|| admin.password==="")
    {
      toast.error("Fill Up Form Properly!");
      return;
    }else{
      try {
        setloding(true)
        let res=await axios.post(`http://localhost:8000/register/adminlogin`,admin,{withCredentials:true})
        setloding(false)
        localStorage.setItem("tokens",res.data.tokens)
        localStorage.setItem("adminId",res.data.payload.id)
        localStorage.setItem("adminName",res.data.payload.usename)
        // console.log("adminName",res.data.payload.usename)
        toast.success(res.data.messege)
        navigate(`/admin/${res.data.payload.id}`)
        console.log(res)
      } catch (error) {
        console.log(error)
        toast.error("Invalid Credentials");
                setloding(false)
      }
    }
   }

  return (
    <>
      <div className="bg-[#f1c6aae4] min-h-screen overflow-hidden relative">
          <div className="text-center mt-3">
          <h1 className=" font-bold md:text-3xl min-[425px]:text-2xl min-[320px]:text-xl">Admin Page</h1>
          </div>
        <div className=" max-w-[90%] mx-auto my-3 flex justify-center">
          <div className="flex-col">
            {/* Admin box section */}
            <div className="md:flex md:flex-row min-[320px]:flex min-[320px]:flex-col-reverse items-center">
              <div className="flex-col ">
                <div ><input
                  type="text"
                  placeholder="Admin Name"
                  name="adminusername"
                  value={admin.adminusername}
                  className="text-xl md:w-72 md:h-9 sm:w-80 sm:h-8 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-60  font-semibold pl-2 focus:outline-none rounded-md  "
                  onChange={(e)=>handleAdminLogin(e,"adminusername")}
                  required
                /></div>
                <div className="mt-5"> <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={admin.password}
                  className="text-xl md:w-72 md:h-9 sm:w-80 sm:h-8 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-60  font-semibold pl-2 focus:outline-none rounded-md"
                  onChange={(e)=>handleAdminLogin(e,"password")}
                  required
                /></div>
                
               
              </div>
              <div>
                <img
                  src="/img/Admin.png"
                  alt="Adminimg"
                  className="md:w-[500px] md:h-[420px] min-[320px]:w-80 min-[320px]:h-64"
                />
              </div>
            </div>
             {loding&&<TbLoader3 className="text-[#000000] text-5xl animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  "/>}
             <div className="text-center min-[320px]:mt-4 ">

            <button onClick={handleAdminButton} className="md:text-2xl sm:text-2xl min-[320px]:text-xl  font-bold bg-[#E9762B] text-white rounded-md mt-3 hover:scale-105 transition md:px-4 md:py-2 sm:px-2 sm:py-2 min-[320px]:px-2 min-[320px]:py-1" >LogIn</button>
             </div>
          </div>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
}

export default AdminPage;
