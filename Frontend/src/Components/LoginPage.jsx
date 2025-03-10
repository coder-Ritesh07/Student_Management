import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { TbLoader3 } from "react-icons/tb";

function LoginPage() {
    const[login,setLogin]=useState({"username":"","password":""})
    let navigate=useNavigate()
    const[loding,setloding]=useState(false)

     function handleLogin(e,name){
        setLogin({...login,[name]:e.target.value})
     }
     console.log(login)

    async function handleLoginButton(){
        if(login.username===""|| login.password==="")
        {
            toast.error("Fill Up Form Properly!");
            return
        }else{
            try {
                setloding(true)
                let res=await axios.post('https://student-management-backend-n9ri.onrender.com/student/login',login,{withCredentials:true})
                // console.log(res.data.messege,res.data.tokens,res.data.payload.id)
                setloding(false)
                localStorage.setItem("tokens",res.data.tokens)
                localStorage.setItem("userId",res.data.payload.id);
                localStorage.setItem("username",res.data.payload.username)
                toast.success(res.data.messege)
                navigate(`/login/studentdetails/${res.data.payload.id}`)
            } catch (error) {
                console.log(error)
                toast.error("Invalid Credentials");
                setloding(false)
            }
        }
     }

  return (
    <div className="max-w-[90%] mx-auto my-3 flex-col items-center justify-center    relative">
      <div>
        <h1 className="text-center font-bold md:text-3xl min-[320px]:text-xl min-[375px]:text-2xl  ">Login Page</h1>
      </div>
      <div className="flex-col justify-center max-w-[70%] mx-auto items-center ">
        <div className="md:flex md:flex-row min-[320px]:flex min-[320px]:flex-col-reverse justify-center items-center">
        <div className="flex-col">
          <div className="md:mb-5 min-[320px]:mb-3 ">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={login.username}
              onChange={(e)=>handleLogin(e,"username")}
              required
              className="text-xl md:w-72 md:h-9 sm:w-80 sm:h-8 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-60  font-semibold pl-2 focus:outline-none rounded-md"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={login.password}
              onChange={(e)=>handleLogin(e,"password")}
              required
              className="text-xl md:w-72 md:h-9 sm:w-80 sm:h-8 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-60   font-semibold pl-2 focus:outline-none rounded-md"
            />
          </div>
        </div>
        <div>
          <img
            src="/img/Login.png"
            alt="login-img"
            className="md:w-[500px] md:h-[400px] sm:w-96 min-[320px]:w-72 min-[320px]:h-64 min-[375px]:w-80 "
          />
        </div>
        </div>
           {loding&&<TbLoader3 className="text-[#000000] text-5xl animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  "/>}
        <div className="text-center min-[320px]:mt-4">
           {/* <Link to=> */}
           <button className="md:text-2xl sm:text-2xl sm:px-3 sm:py-1 min-[320px]:text-[18px] min-[320px]:font-semibold min-[375px]:text-[19px] min-[375px]:font-bold  font-bold bg-[#E9762B] text-white rounded-md mt-3 hover:scale-105 transition md:px-4 md:py-2 min-[320px]:px-2 min-[320px]:py-1" onClick={handleLoginButton}  >LogIn</button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default LoginPage;
