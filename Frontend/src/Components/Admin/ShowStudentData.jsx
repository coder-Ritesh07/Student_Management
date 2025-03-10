import { useEffect, useState } from "react";
import HeaderAdmin from "./HeaderAdmin";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ShowStudentData() {
  let { studentid } = useParams();
  let [showStudent, setShowStudent] = useState([]);
  useEffect(() => {
    axios
      .get(`https://student-management-backend-n9ri.onrender.com/student/fetchStudent/${studentid}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.getStudents);
        setShowStudent(res.data.getStudents);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(showStudent);
  return (
    <>
      <div className="bg-[#f1c6aae4] min-h-screen border">
        <HeaderAdmin />
        <Link to="/admin/dashboard">
        <button className="text-2xl ml-4 font-semibold bg-[#E9762B] text-white rounded-md mt-3 hover:scale-105 transition px-3 py-1">
          Dashboard
        </button>
        </Link>
        <div className=" max-w-[90%] mx-auto my-4 flex justify-center">
          {showStudent.length > 0 ? (
            showStudent.map((student) => (
              <div key={student._id}>
                <img
                  src={`http://localhost:8000/uploads/${student.profilepic}`} // Adjust if the image is served from a static route
                  alt="fetchimg"
                  className="w-32 h-32 rounded-full shadow-md mb-4 border-2 border-[#E9762B]"
                />
                <p className="text-xl font-bold mb-3">
                  Login Username-
                  <span className="bg-orange-600 p-1 rounded">
                    {student.username}
                  </span>
                </p>
                <p className="text-xl font-bold mb-3">
                  Name-
                  <span className="bg-orange-600 p-1 rounded">
                    {student.name}
                  </span>
                </p>
                <p className="text-xl font-bold mb-3">
                  Father Name-
                  <span className="bg-orange-600 p-1 rounded">
                    {" "}
                    {student.fathername}
                  </span>
                </p>
                <p className="text-xl font-bold mb-3">
                  Mother Name-
                  <span className="bg-orange-600 p-1 rounded">
                    {student.mothername}
                  </span>
                </p>
                <p className="text-xl font-bold mb-3">
                  Class-
                  <span className="bg-orange-600 p-1 rounded">
                    {student.studentclass}
                  </span>
                </p>
                <p className="text-xl font-bold mb-3">
                  Section-
                  <span className="bg-orange-600 p-1 rounded">
                    {student.section}
                  </span>
                </p>
                <p className="text-xl font-bold mb-3">
                  Address-
                  <span className="bg-orange-600 p-1 rounded">
                    {student.address}
                  </span>
                </p>
                <p className="text-xl font-bold mb-3">
                  Conatct Number-
                  <span className="bg-orange-600 p-1 rounded">
                    {student.contactnumber}
                  </span>
                </p>
                <p className="text-xl font-bold mb-3">
                  Gender-
                  <span className="bg-orange-600 p-1 rounded">
                    {student.gender}
                  </span>
                </p>
                <p className="text-xl font-bold mb-3">
                  D.O.B-
                  <span className="bg-orange-600 p-1 rounded">
                    {student.DOB}
                  </span>
                </p>
                <p className="text-xl font-bold mb-3">
                  Course Amount-
                  <span className="bg-orange-600 p-1 rounded">
                    {" "}
                    {`${student.annualamount}Rs`}
                  </span>
                </p>
                <p className="text-xl font-bold mb-3">
                  Register Date-
                  <span className="bg-orange-600 p-1 rounded">
                    {student.createdAt.slice(0, 10)}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p>Loading student data...</p>
          )}
        </div>
      </div>
    </>
  );
}
export default ShowStudentData;
