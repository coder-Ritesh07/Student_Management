import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
function HeaderAdmin(){
 let navigate=useNavigate()

  async function handleLogout(){
    localStorage.clear()
    try {
        let res=await axios.post(`http://localhost:8000/student/logout`,{},{withCredentials:true})
        console.log(res.data)
        toast.success("Logout Successfully....")
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 2000);
    } catch (error) {
      console.log(error);
    }

 }

    return<>
      <header className="bg-[#E9762B] md:h-20 min-[320px]:h-[60px] md:px-5 min-[320px]:px-1 ">
        <nav className="flex justify-between items-center h-full">
          <Link to="/">
          <div>
            <h1 className="md:text-3xl sm:text-xl min-[320px]:text-[16px] min-[425px]:text-[18px] md:font-bold sm:font-bold min-[320px]:font-semibold">
              Student{" "}
              <span className="md:text-2xl sm:text-[18px] sm:font-bold min-[320px]:text-[15px] min-[425px]:text-[17px] text-[#E9762B] bg-white rounded-md p-1 font-bold min-[320px]:font-semibold">
                Management
              </span>{" "}
            </h1>
          </div>
          
          </Link>
          <button onClick={handleLogout}  className="md:text-2xl min-[320px]:text-[16px] font-bold text-[#E9762B] bg-white md:rounded-md min-[320px]:rounded mt-3 hover:scale-105 transition md:px-4 md:py-2 min-[320px]:px-2 min-[320px]:py-1">
            Logout
          </button>
        </nav>
        <ToastContainer/>
      </header>
    </>
}
export default HeaderAdmin;