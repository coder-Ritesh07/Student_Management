import HeaderAdmin from "./HeaderAdmin";
import { Link } from "react-router-dom";

function AdminOptionPage() {
  return (
    <>
      <div className="bg-[#f1c6aae4] min-h-screen overflow-hidden">
        <HeaderAdmin />
        <div className="max-w-[90%] mx-auto my-3 flex flex-col justify-center items-center">
          <div>
            <img src="/img/Add.png" alt="addimg" className="md:w-[450px] md:h-96 min-[320px]:w-72 min-[320px]:h-80" />
          </div>
          <div className="flex md:gap-x-16 min-[320px]:gap-x-6">
            <Link to="/admin/student/register">
            <button className="md:text-2xl min-[320px]:text-xl font-bold text-[#E9762B] bg-white rounded-md mt-3 hover:scale-105 transition md:px-4 md:py-2 min-[320px]:px-3 min-[320px]:py-1">
              Add Student
            </button>
            </Link>
            <Link to="/admin/dashboard">
            <button className="md:text-2xl min-[320px]:text-xl font-bold text-[#E9762B] bg-white rounded-md mt-3 hover:scale-105 transition md:px-4 md:py-2 min-[320px]:px-3 min-[320px]:py-1">
              Show Students
            </button></Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminOptionPage;
