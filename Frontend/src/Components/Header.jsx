import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  let navigate = useNavigate();
  let location = useLocation();
  const [selectedRole, setSelectedRole] = useState("User");

  function handleSelectionChange(e) {
    let newrole = e.target.value;
    setSelectedRole(newrole);
    if (newrole === "User") {
      navigate("/");
    } else if (newrole === "Admin") {
      navigate("/admin");
    }
  }

  useEffect(() => {
    if (location.pathname === "/admin") {
      setSelectedRole("Admin");
    } else if (location.pathname === "/") {
      setSelectedRole("User");
    }
  }, [location]);

  return (
    <>
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
          <div>
            {/* <select
              value={selectedRole}
              onChange={handleSelectionChange}
              className=" focus:outline-none md:w-28 md:h-9 sm:w-24 min-[320px]:w-20 min-[320px]:h-8 rounded-md md:text-xl min-[320px]:text-[16px] min-[320px]:font-semibold min-[425px]:font-bold md:font-bold"
            >
              <option value="User" className="md:text-xl sm:text-xl min-[320px]:text-[16px] min-[320px]:font-semibold min-[425px]:font-semibold md:font-bold ">
                User
              </option>
              <option value="Admin" className="md:text-xl sm:text-xl min-[320px]:text-[16px] min-[320px]:font-semibold min-[425px]:font-semibold  md:font-bold ">
                Admin
              </option>
            </select> */}
            <Link to="/admin/register">
             <button  className="md:text-2xl sm:text-2xl min-[320px]:text-xl  font-bold text-[#E9762B] bg-white rounded-md mt-3 hover:scale-105 transition md:px-4 md:py-2 sm:px-2 sm:py-2 min-[320px]:px-2 min-[320px]:py-1" >SignUp</button>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
export default Header;
