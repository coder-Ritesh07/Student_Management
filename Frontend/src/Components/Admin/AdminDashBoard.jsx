import { useEffect, useState } from "react";
import HeaderAdmin from "./HeaderAdmin";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";
import { Link } from "react-router-dom";
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { TbLoader3 } from "react-icons/tb";

function AdminDashBoard() {
  let [showStudent, setShowStudents] = useState([]);
  let [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
      axios.get('https://student-management-backend-n9ri.onrender.com/register/admin/getstudent', { withCredentials: true })
          .then((res) => {
            setLoading(false)
              setShowStudents(res.data.allStudent);
          })
          .catch((err) => {
              console.log(err);
              setLoading(false)
              toast.error("Data Not Found")
          });
  }, []);

  const handleStudentDelete = async (studentId) => {
      try {
          setLoading(true);
          let res = await axios.delete(`https://student-management-backend-n9ri.onrender.com/student/studentdelete/${studentId}`, { withCredentials: true });
          setLoading(false);
          toast.success(res.data.message);
          // setTimeout(()=>{
          //   location.reload()
          // },1000)
          setShowStudents(showStudent.filter(student => student._id !== studentId));
      } catch (error) {
          console.log(error);
          setLoading(false);
          toast.error("Data Not Found...");
      }
  };

  // Filter logic based on search input
  const filteredStudents = search
      ? showStudent.filter(student =>
          student.name.toLowerCase().includes(search.toLowerCase()) ||
          student._id.toLowerCase().includes(search.toLowerCase())
      )
      : showStudent;

  return (
      <>
          <div className="bg-[#f1c6aae4] min-h-screen overflow-hidden relative">
              <HeaderAdmin />
              <div className="max-w-[90%] mx-auto my-4">
                  <div className="flex items-center justify-between min-[320px]:mb-3">
                      <Link to="/admin/student/register">
                          <IoMdAddCircle className="md:text-5xl min-[320px]:text-3xl flex justify-center text-green-600 md:mb-4 min-[320px]:mb-2 cursor-pointer transition-transform duration-200 hover:scale-125" />
                      </Link>
                      <div>
                          <input
                              type="text"
                              onChange={(e) => setSearch(e.target.value)}
                              placeholder="Search Id or Name"
                              name="searchbox"
                              className="md:w-72 md:h-9 min-[320px]:w-52 min-[320px]:h-8 focus:outline-none pl-1 text-xl font-semibold rounded-md"
                          />
                      </div>
                  </div>
                  {filteredStudents.map((student, idx) => (
                      <div
                          key={idx}
                          className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-lg mb-5 cursor-pointer md:p-3 min-[320px]:p-[6px] flex justify-between items-center w-full h-28 rounded-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
                      >
                          <Link to={`/admin/dashboard/${student._id}`}>
                              <div className="flex flex-col hover:underline decoration-slate-100">
                                  <h1 className="md:text-2xl min-[320px]:text-[16px] text-white font-semibold">
                                      NAME - <span className="text-orange-400">{student.name}</span>
                                  </h1>
                                  <h1 className="text-lg min-[320px]:text-[16px] text-gray-300 font-medium">
                                      ID - <span className="text-orange-300">{student._id}</span>
                                  </h1>
                              </div>
                          </Link>
                          {loading && <TbLoader3 className="text-[#000000] text-5xl animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />}
                          <div className="flex items-center justify-between md:w-20 min-[320px]:w-14">
                              <MdModeEdit className="md:text-4xl min-[320px]:text-2xl text-orange-300 cursor-pointer transition-transform duration-200 hover:scale-125" />
                              <MdDeleteForever
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      handleStudentDelete(student._id);
                                  }}
                                  className="md:text-4xl min-[320px]:text-2xl text-red-500 cursor-pointer transition-transform duration-200 hover:scale-125"
                              />
                          </div>
                      </div>
                  ))}
              </div>
              <ToastContainer />
          </div>
      </>
  );
}

export default AdminDashBoard;