import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderAdmin from "./Admin/HeaderAdmin";

function Payment() {
  let { userid } = useParams();
  let [payment, setPayment] = useState([]);
  let [select,setSelect]=useState('')
  let navigate=useNavigate()
  let[cashPayment,setCashPayment]=useState({"payamount":""})

   function handlePayment(e,name){
      setCashPayment({...cashPayment,[name]:Number(e.target.value)})
   }
   
   
   function handleSelection(e){
       let newRole=e.target.value;
       setSelect(newRole)
    }
    
    function handlePaymentButton(){
      if(cashPayment.payamount==="")
      {
        toast.error("Enter Amounts Fast")
        return
      }else{

        apiCallForPayment(userid)
        navigate(`/student/paymentreceipt/${userid}`)
      }
    }
    
    
    async function apiCallForPayment(userId) {
      console.log(cashPayment)
      try {
          let res=await axios.post(`http://localhost:8000/student/receipt/${userId}`,cashPayment,{withCredentials:true})
          console.log(res.data)
          toast.success(res.data.message)
          setTimeout(()=>{
            location.reload()
          },1000)
      } catch (error) {
        console.log(error)
        toast.error("Payment Failed,Try After Sometimes")
        return
      }
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8000/student/receipt/${userid}`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data);
        setPayment(res.data.userdata);
      });
  }, []);

  return (
    <>
      <div className="bg-[#f1c6aae4] min-h-screen overflow-hidden ">
        <HeaderAdmin/>
        <div className="max-w-[90%] mx-auto my-5 md:flex md:flex-row min-[320px]:flex min-[320px]:flex-col-reverse justify-center gap-x-5 items-center">
          <div>

          {
            payment==null?(<div>
                <p className="mb-3 text-xl font-bold">Student Id-<span className="bg-orange-500 rounded p-1 text-white">{userid}</span></p>
                <p className="mb-3 text-xl font-bold">
                Choose Payment Option- 
                <select defaultValue="" onChange={handleSelection} className="focus:outline-none rounded md:w-36 md:h-8 min-[320px]:w-28 min-[320px]:h-8 md:text-xl min-[320px]:text-[18px] font-semibold ">
                <option value="" disabled hidden>
                      --Select--
                    </option>
                    <option value="cash">Cash</option>
                    <option value="upi">UPI</option>
                </select>
                
              </p>
                <div className={`${select==="cash"||select==="upi"?"block":"hidden"}`}>
              {
                select==="cash"?(<div className="flex-col items-center ">
                    <input type="number" className="inline-block text-xl font-semibold pl-1 md:w-60 md:h-9 min-[320px]:w-48 min-[320px]:h-8  rounded focus:outline-none" name="payamount" value={cashPayment.payamount} placeholder="Enter Amount" onChange={(e)=>handlePayment(e,"payamount")} />
                    <button onClick={handlePaymentButton} className="md:text-2xl min-[320px]:text-xl ml-4 font-bold bg-[#E9762B] text-white rounded-md mt-3 hover:scale-105 transition md:px-4 md:py-2 min-[320px]:px-3 min-[320px]:py-1" >Pay</button>
                  </div>):(<div>
                    <p className="text-red-500 md:text-xl min-[320px]:text-[17px] font-bold">Sorry,Now UPI Is Not Available  </p>
                  </div>)
              }

              </div>
            </div>):
            (<div>
              <p className="mb-3 md:text-xl min-[320px]:text-[16px] font-bold">
                Student Id-
                <span className="bg-orange-500 rounded p-1  text-white">
                  {payment?.student?._id?payment?.student?._id:"Loading....."}
                </span>
              </p>
              <p className="mb-3 md:text-xl min-[320px]:text-[16px] font-bold">
                Total Annual Amount-
                <span className="bg-orange-500 rounded p-1 text-white">
                  {payment?.student?.annualamount?payment?.student?.annualamount:"Loading..."}
                </span>
              </p>
              <p className="mb-3 md:text-xl min-[320px]:text-[16px] font-bold">
                Contact Number-
                <span className="bg-orange-500 rounded p-1 text-white">
                  {payment?.student?.contactnumber?payment?.student?.contactnumber:'Loading...'}
                </span>
              </p>

              <p className="mb-3 md:text-xl min-[320px]:text-[16px] font-bold">
                Rest Of Amount-
                <span className="bg-orange-500 rounded p-1 text-white">
                  {payment?.restofamount?payment?.restofamount:"Loading...."||payment?.restofamount<0?"Payment Already Clear":payment?.restofamount}
                </span>
              </p>
              <p className="mb-3 md:text-xl min-[320px]:text-[16px]  font-bold">
                Choose Payment Option- 
                <select defaultValue="" onChange={handleSelection} className="focus:outline-none rounded md:w-36 md:h-8 min-[320px]:self-center min-[320px]:w-28 min-[320px]:h-8 md:text-xl min-[320px]:text-[18px] font-semibold ">
                <option value="" disabled hidden>
                      --Select--
                    </option>
                    <option value="cash">Cash</option>
                    <option value="upi">UPI</option>
                </select>
                
              </p>
              <div className={`${select==="cash"||select==="upi"?"block":"hidden"}`}>
              {
                select==="cash"?(<div className="flex-col items-center ">
                    <input type="number" className="inline-block text-xl font-semibold pl-1 md:w-60 md:h-9 min-[320px]:w-48 min-[320px]:h-8 rounded focus:outline-none" name="payamount" value={cashPayment.payamount} placeholder="Enter Amount" onChange={(e)=>handlePayment(e,"payamount")} />
                    <button onClick={handlePaymentButton} className="md:text-2xl min-[320px]:text-xl ml-4 font-bold bg-[#E9762B] text-white rounded-md mt-3 hover:scale-105 transition md:px-4 md:py-2 min-[320px]:px-3 min-[320px]:py-1" >Pay</button>
                  </div>):(<div>
                    <p className="text-red-700 md:text-xl min-[320px]:text-[17px] font-bold">Sorry,Now UPI Is Not Available  </p>
                  </div>)
              }

              </div>
              
            </div>)
          }
          {/* end here */}

          {/* Img section start here */}
          </div>
          <div>
            <img src="/img/Payment.png" alt="paymentimg" className="md:w-[450px] md:h-96 min-[320px]:w-64 min-[320px]:h-60" />
          </div>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
}
export default Payment;
