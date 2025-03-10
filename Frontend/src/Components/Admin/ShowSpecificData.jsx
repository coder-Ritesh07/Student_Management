import { useEffect, useState } from "react";
import HeaderAdmin from "./HeaderAdmin";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { TbLoader3 } from "react-icons/tb";

function ShowSpecificData() {
  let navigate=useNavigate()
  let { studentid } = useParams();
  let [response, setResponse] = useState([]); // Initialize as an empty array
  const[loding,setloding]=useState(false)
  const [selectone, setSelectone] = useState("");
  let [receipt, setReceipt] = useState();

  useEffect(() => {
    setloding(true)
    axios
      .get(`https://student-management-backend-n9ri.onrender.com/student/fetchStudent/${studentid}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data.getStudents);
        setloding(false)
        setResponse(res.data.getStudents); // Assuming 'getStudents' is an array
      })
      .catch((err) => {
        console.log(err);
        setloding(false)
      });
  }, []);

  async function fetchReceipt(userId) {
    try {
      setloding(true);
      let res = await axios.get(
        `https://student-management-backend-n9ri.onrender.com/student/receipt/${userId}`,
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
      fetchReceipt(studentid);
    }else if(value==="payment")
    {
       navigate(`/student/payment/${studentid}`)
    }
  }


  console.log(response);

  return (
    <>
      <div className="bg-[#f1c6aae4] min-h-screen overflow-hidden ">
        <HeaderAdmin />
        <Link to="/admin/dashboard">
        <button className="md:text-2xl min-[320px]:text-xl ml-4 font-semibold bg-[#E9762B] text-white rounded-md mt-3 hover:scale-105 transition md:px-3 md:py-1 min-[320px]:px-2 min-[320px]:py-1">
          Dashboard
        </button>
        </Link>
        <h1 className="text-orange-600 md:text-3xl min-[320px]:text-2xl font-bold text-center">Student Details</h1>
        <div className="max-w-[90%] mx-auto my-5 md:flex md:flex-row min-[320px]:flex min-[320px]:flex-col-reverse justify-center items-center relative">
          {response.length > 0 ? ( // Check if there's data in the response
            <>
            <div className="">
                <div className="min-[320px]:self-center">
                <img
                  src={`https://student-management-backend-n9ri.onrender.com/uploads/${response[0].profilepic}`} // Adjust if the image is served from a static route
                  alt="fetchimg"
                  className="md:w-32 md:h-32 min-[320px]:w-24 min-[320px]:h-24  rounded-full shadow-md mb-4 border-2 border-[#141414]"
                />
                </div>
            <p className="md:text-2xl min-[320px]:text-xl text-[#2e2e2e] font-bold">
                NAME-<span className="text-black">{response[0].name}</span>
              </p>
              <p className="md:text-2xl min-[320px]:text-xl text-[#2e2e2e] font-bold">
                FATHER NAME-<span className="text-black">{response[0].fathername}</span>
              </p>
              <p className="md:text-2xl min-[320px]:text-xl text-[#2e2e2e] font-bold">
                MOTHER NAME-<span className="text-black">{response[0].mothername}</span>
              </p>
              <p className="md:text-2xl min-[320px]:text-xl text-[#2e2e2e] font-bold">
                CLASS-<span className="text-black">{response[0].studentclass}</span>
              </p>
              <p className="md:text-2xl min-[320px]:text-xl text-[#2e2e2e] font-bold">
                SECTION-<span className="text-black">{response[0].section}</span>
              </p>
              <p className="md:text-2xl min-[320px]:text-xl text-[#2e2e2e] font-bold">
                ADDRESS-<span className="text-black">{response[0].address}</span>
              </p>
              <p className="md:text-2xl min-[320px]:text-xl text-[#2e2e2e] font-bold">
                CONTACT NUMBER-<span className="text-black">{response[0].contactnumber}</span>
              </p>
              <p className="md:text-2xl min-[320px]:text-xl text-[#2e2e2e] font-bold">
                GENDER-<span className="text-black">{response[0].gender}</span>
              </p>
              <p className="md:text-2xl min-[320px]:text-xl text-[#2e2e2e] font-bold">
                CAST-<span className="text-black">{response[0].cast}</span>
              </p>
              <p className="md:text-2xl min-[320px]:text-xl text-[#2e2e2e] font-bold">
                ADMISSION DATE-<span className="text-black">{response[0].createdAt.slice(0, 10)}</span>
              </p>
              <p className="md:text-2xl min-[320px]:text-xl text-[#2e2e2e] font-bold">
                ANNUAL AMOUNT-<span className="text-black">{response[0].annualamount}</span>
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
              
            </>
          ) : (
            loding && (
                <TbLoader3 className="text-[#000000] text-5xl animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              )
              
          )}
          <div>
            <img src="/img/Information.png" alt="information" className="md:w-[400px] md:h-[400px] min-[320px]:w-80 min-[320px]:h-80" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowSpecificData;
