import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbLoader3 } from "react-icons/tb";
import AnotherHeader from "./AnotherHeader";

function StudentDetails() {
  let { userid } = useParams();
  let [studentDetails, setStudentDetails] = useState([]);
  let [receipt, setReceipt] = useState();
  const [loding, setloding] = useState(false);
  let navigate=useNavigate()
  let [profile, setProfile] = useState(
    "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
  );
  const [selectone, setSelectone] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/student/fetchStudent/${userid}`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data.getStudents)
        setStudentDetails(res.data.getStudents);
      });
  }, []);
  async function fetchReceipt(userId) {
    try {
      setloding(true);
      let res = await axios.get(
        `http://localhost:8000/student/receipt/${userId}`,
        { withCredentials: true }
      );
      console.log(res.data.userdata);
      setReceipt(res?.data?.userdata);
    } catch (error) {
      console.log(error);
    } finally {
      setloding(false);
    }
  }

  function handleSelection(e) {
    const value = e.target.value;
    setSelectone(value); // Updates the state
    if (value === "checkbalance") {
      fetchReceipt(userid);
    }else if(value==="payment")
    {
       navigate(`/student/payment/${userid}`)
    }
  }

  // console.log(studentDetails);
  // console.log("receipt", receipt);
  return (
    <>
      <div className="bg-[#f1c6aae4] min-h-screen overflow-hidden ">
        <AnotherHeader/>
        <div className=" max-w-[90%] mx-auto my-5  flex justify-center">
          {studentDetails.map((student, idx) => {
            return (
              <div key={idx}>
                <img
                  src={`http://localhost:8000/uploads/${student.profilepic}`}
                  alt="profileimg"
                  className="md:w-40 md:h-40 min-[320px]:w-20 min-[320px]:h-20  min-[320px]:self-center rounded-full"
                />
                <h1 className="md:text-xl min-[320px]:text-[16px] font-bold mb-2">
                  Student Name-
                  <span className="bg-orange-500 rounded p-1 text-white">
                    {student.name}
                  </span>
                </h1>
                <h1 className="md:text-xl min-[320px]:text-[16px] font-bold mb-2">
                  Student Father Name-
                  <span className="bg-orange-500 rounded p-1 text-white">
                    {student.fathername}
                  </span>
                </h1>
                <span></span>
                <h1 className="md:text-xl min-[320px]:text-[16px] font-bold mb-2">
                  Student Mother Name-
                  <span className="bg-orange-500 rounded p-1 text-white">
                    {student.mothername}
                  </span>
                </h1>
                <p className="md:text-xl min-[320px]:text-[16px]  font-bold mb-2">
                  Student Class-
                  <span className="bg-orange-500 rounded p-1 text-white">
                    {student.studentclass}
                  </span>
                </p>
                <p className="md:text-xl min-[320px]:text-[16px]  font-bold mb-2">
                  Student Section-
                  <span className="bg-orange-500 rounded p-1 text-white">
                    {student.section}
                  </span>
                </p>
                <p className="md:text-xl min-[320px]:text-[16px]  font-bold mb-2">
                  Gender-
                  <span className="bg-orange-500 rounded p-1 text-white">
                    {student.gender}
                  </span>
                </p>
                <p className="md:text-xl min-[320px]:text-[16px]  font-bold mb-2">
                  Address-
                  <span className="bg-orange-500 rounded p-1 text-white">
                    {student.address}
                  </span>
                </p>
                <p className="md:text-xl min-[320px]:text-[16px]  font-bold mb-2">
                  Student Contact Number-
                  <span className="bg-orange-500 rounded p-1 text-white">
                    {student.contactnumber}
                  </span>
                </p>
                <p className="md:text-xl min-[320px]:text-[16px]  font-bold mb-2">
                  Student Alternative Conatct Number-
                  <span className="bg-orange-500 rounded p-1 text-white">
                    {student.alternativcontactnumber}
                  </span>
                </p>
                <div className="md:flex md:flex-row min-[320px]:flex min-[320px]:flex-col  gap-x-2">
                  <p className="md:text-xl min-[320px]:text-[16px]  font-bold">
                    Annual Amount-<span>{student.annualamount}</span>
                  </p>
                  <select
                    defaultValue=""
                    className="focus:outline-none rounded md:w-60 md:h-8 min-[320px]:w-52 min-[320px]:h-8 min-[320px]:self-center md:text-xl min-[320px]:text-[16px] min-[320px]:font-bold md:font-semibold"
                    onChange={handleSelection}
                  >
                    <option value="" disabled hidden>
                      --Select--
                    </option>
                    <option
                      value="checkbalance"
                      className="md:text-xl min-[320px]:text-[16px] font-semibold"
                    >
                      Check Available Balance
                    </option>
                    <option value="payment" className="md:text-xl min-[320px]:text-[16px] font-semibold">
                      Payment
                    </option>
                  </select>
                </div>
                <div
                  className={`${
                    selectone === "checkbalance" ? "block" : "hidden"
                  } flex-col `}
                >
                  {loding ? (
                    <TbLoader3 className="text-[#000000] text-5xl animate-spin" />
                  ) : receipt == null ? (
                    <p className="text-red-500 md:text-xl min-[320px]:text-[16px] font-bold mt-4">
                      You Didn't Pay Any Course Fees Yet
                    </p>
                  ) : (
                    <div className="text-black md:text-xl min-[320px]:text-[16px] font-bold mt-4">
                      <p className="mb-3">
                        Student Id-
                        <span className="bg-orange-500 rounded p-1 text-white">
                          {receipt.student._id}
                        </span>
                      </p>
                      <p className="mb-3">
                        Last Time Pay Amount-
                        <span className="bg-orange-500 rounded p-1 text-white">
                          {receipt.payamount}
                        </span>
                      </p>
                      <p className="mb-3">
                        Total Pay Amount-
                        <span className="bg-orange-500 rounded p-1 text-white">
                          {receipt.totalpayamount}
                        </span>
                      </p>
                      <p className="mb-3">
                        Rest Of Amount-
                        <span className="bg-orange-500 rounded p-1 text-white">
                          {receipt.restofamount}
                        </span>
                      </p>
                      <p>Last Pay Date-<span className="bg-orange-500 rounded p-1 text-white">{receipt.createdAt.slice(0,10)}</span></p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default StudentDetails;
