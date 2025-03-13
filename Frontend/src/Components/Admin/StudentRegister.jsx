import { useState,useEffect } from "react";
import HeaderAdmin from "./HeaderAdmin";
import axios from "axios";
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { TbLoader3 } from "react-icons/tb";

function StudentRegister() {
   const[loding,setloding]=useState(false)
  let [image,setImage]=useState('https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg')
  let navigate=useNavigate()
  let[response,SetResponse]=useState([])
  let [register, setRegister] = useState({
    firstname: "",
    lastname:"",
    fathername: "",
    mothername: "",
    studentclass: "",
    section: "",
    address: "",
    gmail: "",
    contactnumber: "",
    alternativecontactnumber: "",
    addharnumberofstudent: "",
    addharnumberofparents:"",
    gender: "",
    cast: "",
    DOB: "",
    profilepic: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    return () => URL.revokeObjectURL(image); // Cleanup URL when component unmounts
  }, [image]);
  

  // Register function is here
  function handleRegister(e, name) {
    setRegister({ ...register, [name]: e.target.value });
  }

  //   this is function handle for gender dropdown
  function handleSelectionGender(e, name) {
    let value = e.target.value;
    if (value === "male") {
      setRegister({ ...register, [name]: value });
    } else if (value === "female") {
      setRegister({ ...register, [name]: value });
      console.log("female", name);
    } else if (value === "other") {
      setRegister({ ...register, [name]: value });
      console.log("other", name);
    }
  }
  //   this is function handle for cast dropdown
  function handleSelectionCast(e, name) {
    let value = e.target.value;
    if (value === "general") {
      setRegister({ ...register, [name]: value });
    } else if (value === "st") {
      setRegister({ ...register, [name]: value });
    } else if (value === "sc") {
      setRegister({ ...register, [name]: value });
    } else if (value === "obc") {
      setRegister({ ...register, [name]: value });
    }
  }

  function handleForDate(e, name) {
    let value = e.target.value;
    console.log("Date-", value);
    setRegister({ ...register, [name]: value });
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    setRegister({ ...register, profilepic: file });
    setImage(URL.createObjectURL(file));
  }

  async function handlSubmitData(e) {
    if(register.firstname===""||register.lastname===""|| register.fathername===""||register.mothername===""||register.studentclass===""||register.section===""||register.address===""||register.gmail===""||register.contactnumber===""||register.alternativecontactnumber===""||register.addharnumberofstudent===""||register.addharnumberofparents===""||register.gender===""||register.cast===""||register.DOB===""||register.profilepic===""||register.username===""||register.password==="")
    {
      toast.error("Fill Up the Form Properly")
      return;
    }
    e.preventDefault();

  const formData = new FormData();

  // Append all fields to FormData
  for (const key in register) {
    formData.append(key, register[key]);
  }

  // Log FormData entries for debugging
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    setloding(true)
    const res = await axios.post("https://student-management-backend-n9ri.onrender.com/student/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
      withCredentials: true,
    });
    setloding(false)
    console.log(res.data);
    SetResponse(res.data.newStudent)
    toast.success(res.data.messege)
    setTimeout(()=>{
     navigate(`/admin/dashboard`)
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

//   console.log(register);
  return (
    <>
      <div className="bg-[#f1c6aae4] min-h-screen overflow-hidden relative">
        <HeaderAdmin />
        <div className="max-w-[90%] mx-auto my-3  ">
          <h1 className="text-center  text-2xl font-bold">Student Register</h1>
          <div className="flex  justify-center my-3">
            <img
              src={image}
              alt="profileimg"
              className="md:w-40 md:h-40 min-[320px]:w-20 min-[320px]:h-20 min-[425px]:w-24 min-[425px]:h-24 rounded-full"
            />
          </div>
          <div className="flex justify-center min-[320px]:flex min-[320px]:flex-col min-[320px]:items-center">
            <div>
              <div className="md:flex md:flex-row min-[320px]:flex min-[320px]:flex-col justify-center items-center  lg:gap-x-5 md:gap-x-3">
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    name="firstname"
                    className="focus:outline-none lg:w-80 md:w-56 md:h-9 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-64 min-[375px]:h-8 min-[425px]:w-80  text-xl font-semibold pl-2 rounded-md"
                    value={register.firstname}
                    onChange={(e) => handleRegister(e, "firstname")}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    name="lastname"
                    className="focus:outline-none lg:w-80 md:w-56 md:h-9 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-64 min-[375px]:h-8 min-[425px]:w-80  text-xl font-semibold pl-2 rounded-md"
                    value={register.lastname}
                    onChange={(e) => handleRegister(e, "lastname")}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Father Name"
                    required
                    name="fathername"
                    className="focus:outline-none lg:w-80 md:w-56 md:h-9 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-64 min-[375px]:h-8 min-[425px]:w-80   text-xl font-semibold pl-2 rounded-md"
                    value={register.fathername}
                    onChange={(e) => handleRegister(e, "fathername")}
                  />
                </div>
              </div>
              <div className="md:flex md:flex-row min-[320px]:flex min-[320px]:flex-col  justify-center items-center gap-x-5">
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Mother Name"
                    required
                    name="mothername"
                    className="focus:outline-none lg:w-80 md:w-56 md:h-9 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-64 min-[375px]:h-8 min-[425px]:w-80   text-xl font-semibold pl-2 rounded-md"
                    value={register.mothername}
                    onChange={(e) => handleRegister(e, "mothername")}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    placeholder="Class"
                    required
                    name="studentclass"
                    className="focus:outline-none lg:w-80 md:w-56 md:h-9 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-64 min-[375px]:h-8 min-[425px]:w-80  text-xl font-semibold pl-2 rounded-md"
                    value={register.studentclass}
                    onChange={(e) => handleRegister(e, "studentclass")}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Section"
                    required
                    name="section"
                    className="focus:outline-none lg:w-80 md:w-56 md:h-9 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-64 min-[375px]:h-8 min-[425px]:w-80  text-xl font-semibold pl-2 rounded-md"
                    value={register.section}
                    onChange={(e) => handleRegister(e, "section")}
                  />
                </div>
              </div>
              <div className="md:flex md:flex-row min-[320px]:flex min-[320px]:flex-col  justify-center items-center gap-x-5">
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    name="address"
                    className="focus:outline-none lg:w-80 md:w-56 md:h-9 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-64 min-[375px]:h-8 min-[425px]:w-80  text-xl font-semibold pl-2 rounded-md"
                    value={register.address}
                    onChange={(e) => handleRegister(e, "address")}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="G-mail"
                    required
                    name="gmail"
                    className="focus:outline-none lg:w-80 md:w-56 md:h-9 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-64 min-[375px]:h-8 min-[425px]:w-80  text-xl font-semibold pl-2 rounded-md"
                    value={register.gmail}
                    onChange={(e) => handleRegister(e, "gmail")}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    placeholder="Contact Number"
                    required
                    name="contactnumber"
                    className="focus:outline-none lg:w-80 md:w-56 md:h-9 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-64 min-[375px]:h-8 min-[425px]:w-80  text-xl font-semibold pl-2 rounded-md"
                    value={register.contactnumber}
                    onChange={(e) => handleRegister(e, "contactnumber")}
                  />
                </div>
              </div>
              <div className="md:flex md:flex-row min-[320px]:flex min-[320px]:flex-col  justify-center items-center gap-x-5">
                <div className="mb-3">
                  <input
                    type="number"
                    placeholder="Alternative Number"
                    required
                    name="alternativecontactnumber"
                    className="focus:outline-none lg:w-80 md:w-56 md:h-9 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-64 min-[375px]:h-8 min-[425px]:w-80  text-xl font-semibold pl-2 rounded-md"
                    value={register.alternativecontactnumber}
                    onChange={(e) =>
                      handleRegister(e, "alternativecontactnumber")
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    placeholder="Student Addhar"
                    required
                    name="addharnumberofstudent"
                    className="focus:outline-none lg:w-80 md:w-56 md:h-9 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-64 min-[375px]:h-8 min-[425px]:w-80  text-xl font-semibold pl-2 rounded-md"
                    value={register.addharnumberofstudent}
                    onChange={(e) => handleRegister(e, "addharnumberofstudent")}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    placeholder="Parents Addhar"
                    required
                    name="addharnumberofparents"
                    className="focus:outline-none lg:w-80 md:w-56 md:h-9 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-64 min-[375px]:h-8 min-[425px]:w-80  text-xl font-semibold pl-2 rounded-md"
                    value={register.addharnumberofparents}
                    onChange={(e) => handleRegister(e, "addharnumberofparents")}
                  />
                </div>
              </div>
              <div className="md:flex md:flex-row min-[320px]:flex min-[320px]:flex-col  justify-center items-center gap-x-5">
                <div className="mb-3">
                  <select
                    name="gender"
                    defaultValue=""
                    className="focus:outline-none rounded text-xl font-semibold lg:w-60 md:w-56 md:h-9 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-64 min-[375px]:h-8 min-[425px]:w-80  "
                    onChange={(e) => handleSelectionGender(e, "gender")}
                  >
                    <option value="" disabled hidden>
                      --GENDER--
                    </option>
                    <option value="male" className="text-xl font-semibold">
                      Male
                    </option>
                    <option value="female" className="text-xl font-semibold">
                      Female
                    </option>
                    <option value="other" className="text-xl font-semibold">
                      Other
                    </option>
                  </select>
                </div>
                <div className="mb-3">
                  <select
                    name="cast"
                    defaultValue=""
                    className="focus:outline-none rounded text-xl font-semibold lg:w-60 md:w-56 md:h-9 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-64 min-[375px]:h-8 min-[425px]:w-80 "
                    onChange={(e) => handleSelectionCast(e, "cast")}
                  >
                    <option value="" disabled hidden>
                      --CAST--
                    </option>
                    <option value="general">GENERAL</option>
                    <option value="st" className="text-xl font-semibold">
                      ST
                    </option>
                    <option value="sc" className="text-xl font-semibold">
                      SC
                    </option>
                    <option value="obc" className="text-xl font-semibold">
                      OBC
                    </option>
                  </select>
                </div>
                <div className="mb-3 md:flex md:items-center">
                  <p  className="text-xl font-semibold mr-2">
                    D.O.B-
                  </p>
                  <input
                    type="date"
                    className="focus:outline-none rounded text-xl font-semibold lg:w-60 md:w-48 md:h-9 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-64 min-[375px]:h-8 min-[425px]:w-80 "
                    name="DOB"
                    onChange={(e) => handleForDate(e, "DOB")}
                  />
                </div>
              </div>
              <div className="md:flex md:flex-row min-[320px]:flex min-[320px]:flex-col  justify-center items-center gap-x-5">
                <div className="mb-3 ">
                  <p  className="md:text-xl min-[320px]:text-[18px] font-semibold md:mr-2">
                    Choose Profile-
                  </p>
                  <input
                    type="file"
                    className="focus:outline-none rounded  w-60 h-9"
                    name="profilepic"
                    onChange={(e) => handleImageUpload(e)}
                    accept="image/*"
                  />
                  <span className="text-red-600 min-[320px]:text-[16px] min-[320px]:block min-[320px]:w-56 ">(* Only JPEG, PNG, and JPG are allowed.)</span>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    name="username"
                    className="focus:outline-none lg:w-80 md:w-56 md:h-9 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-64 min-[375px]:h-8 min-[425px]:w-80   text-xl font-semibold pl-2 rounded-md"
                    value={register.username}
                    onChange={(e) => handleRegister(e, "username")}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    placeholder="password"
                    required
                    name="password"
                    className="focus:outline-none lg:w-80 md:w-56 md:h-9 min-[320px]:w-56 min-[320px]:h-8 min-[375px]:w-64 min-[375px]:h-8 min-[425px]:w-80  text-xl font-semibold pl-2 rounded-md"
                    value={register.password}
                    onChange={(e) => handleRegister(e, "password")}
                  />
                </div>
              </div>
              {loding&&<TbLoader3 className="text-[#000000] text-5xl animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  "/>}
              <div className="flex justify-center items-center gap-x-5">
                <button
                  onClick={handlSubmitData}
                  className="md:text-2xl min-[320px]:text-xl min-[375px]:text-2xl font-bold bg-[#E9762B] text-white rounded-md mt-3 hover:scale-105 transition md:px-4 md:py-2 min-[320px]:px-3 min-[320px]:py-1"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer/>
        {/* <ShowStudentData response={response}/> */}
      </div>
    </>
  );
}

export default StudentRegister;
