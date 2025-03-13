import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useParams } from "react-router-dom";
// import axios from "axios";
import {jsPDF} from "jspdf"
import HeaderAdmin from "./Admin/HeaderAdmin";
import { Link } from "react-router-dom";

function PaymentReceipt() {
  let { userid } = useParams();
  let [paymentReceipt, setPaymentReceipt] = useState([]);

  useEffect(() => {
    axios
      .get(`https://student-management-backend-n9ri.onrender.com/student/receipt/${userid}`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data);
        setPaymentReceipt(res.data.userdata);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(paymentReceipt);

//   hanlde receipt download section
  function handleDownload() {
    let pdf = new jsPDF();
  
    // Get page width
    const pageWidth = pdf.internal.pageSize.getWidth();
  
    // Function to calculate the center X position
    const centerX = (text) => (pageWidth - pdf.getTextWidth(text)) / 2;
  
    // Add horizontally centered content
    pdf.text("RECEIPT", centerX("RECEIPT"), 10); // Y position is fixed at 10
    pdf.text(`STUDENT ROLL NUMBER. - ${paymentReceipt?.student?.Stid}`, centerX(`STUDENT ID - ${paymentReceipt?.student?.Stid}`), 20);
    pdf.text(`FIRST NAME - ${paymentReceipt?.student?.firstname}`, centerX(`NAME - ${paymentReceipt?.student?.firstname}`), 30);
    pdf.text(`LAST NAME - ${paymentReceipt?.student?.lastname}`, centerX(`NAME - ${paymentReceipt?.student?.lastname}`), 40);
    pdf.text(`FATHER NAME - ${paymentReceipt?.student?.fathername}`, centerX(`FATHER NAME - ${paymentReceipt?.student?.fathername}`), 50);
    pdf.text(`CONTACT NUMBER - ${paymentReceipt?.student?.contactnumber}`, centerX(`CONTACT NUMBER - ${paymentReceipt?.student?.contactnumber}`), 60);
    pdf.text(`CLASS - ${paymentReceipt?.student?.studentclass}`, centerX(`CLASS - ${paymentReceipt?.student?.studentclass}`), 70);
    pdf.text(`SECTION - ${paymentReceipt?.student?.section}`, centerX(`SECTION - ${paymentReceipt?.student?.section}`), 80);
    pdf.text(`PAYMENT ID - ${paymentReceipt?._id}`, centerX(`PAYMENT ID - ${paymentReceipt?._id}`), 90);
    pdf.text(`PAY AMOUNT - ${paymentReceipt?.payamount}Rs`, centerX(`PAY AMOUNT - ${paymentReceipt?.payamount}`), 100);
    pdf.text(`REST OF AMOUNT - ${paymentReceipt?.restofamount}Rs`, centerX(`REST OF AMOUNT - ${paymentReceipt?.restofamount}`), 110);
    pdf.text(`PAYMENT DATE - ${paymentReceipt?.updatedAt?.slice(0, 10)}`, centerX(`PAYMENT DATE - ${paymentReceipt?.updatedAt?.slice(0, 10)}`), 120);
    pdf.text("------------------------------------------------------------", centerX("---------------------------------------------------------------------"), 130);
    pdf.text("THANK YOU...", centerX("THANK YOU..."), 140);
  
    // Save the PDF
    pdf.save("receipt.pdf");
  }

  return (
    <>
      <div>
        <HeaderAdmin/>
        <div className="bg-[#f1c6aae4] min-h-screen p-3">
        <Link to="/admin/dashboard">
        <button className="md:text-2xl min-[320px]:text-xl ml-4 font-semibold bg-[#E9762B] text-white rounded-md mt-3 hover:scale-105 transition md:px-3 md:py-1 min-[320px]:px-2 min-[320px]:py-1">
          Dashboard
        </button>
        </Link>
          <h1 className="text-center font-bold md:text-2xl min-[320px]:text-xl ">PAYMENT RECEIPT </h1>
          <div className="max-w-[90%] my-0 mx-auto  md:flex md:flex-row min-[320px]:flex min-[320px]:flex-col-reverse justify-center items-center">
            <div className="bg-white rounded-md p-3">
              <p className="md:text-[18px] min-[320px]:text-[16px] text-[#000] font-bold">
              STUDENT ROLL NO.-
                <span className=" text-[#202020]">{paymentReceipt?.student?.Stid?paymentReceipt?.student?.Stid:"Loading..."}</span>
              </p>
              <p className="md:text-[18px] min-[320px]:text-[16px] text-[#000] font-bold">
              FIRST NAME-
                <span className=" text-[#202020]">{paymentReceipt?.student?.firstname?paymentReceipt?.student?.firstname:"Loading...."}</span>
              </p>
              <p className="md:text-[18px] min-[320px]:text-[16px] text-[#000] font-bold">
              LAST NAME-
                <span className=" text-[#202020]">{paymentReceipt?.student?.lastname?paymentReceipt?.student?.lastname:"Loading...."}</span>
              </p>
              <p className="md:text-[18px] min-[320px]:text-[16px] text-[#000] font-bold">
              FATHER NAME-
                <span className=" text-[#202020]">{paymentReceipt?.student?.fathername?paymentReceipt?.student?.fathername:"Loading...."}</span>
              </p>
              < p className="md:text-[18px] min-[320px]:text-[16px] text-[#000] font-bold">
              CONTACT NUMBER-
                <span className=" text-[#202020]">
                  {paymentReceipt?.student?.contactnumber?paymentReceipt?.student?.contactnumber:"Loading..."}
                </span>
              </p>
              <p className="md:text-[18px] min-[320px]:text-[16px] text-[#000] font-bold">
              CLASS-
                <span className=" text-[#202020]">{paymentReceipt?.student?.studentclass?paymentReceipt?.student?.studentclass:"Loading..."}</span>
              </p>
              <p className="md:text-[18px] min-[320px]:text-[16px] text-[#000] font-bold">
              SECTION-
                <span className=" text-[#202020]">{paymentReceipt?.student?.section?paymentReceipt?.student?.section:"Loading...."}</span>
              </p>
              <p className="md:text-[18px] min-[320px]:text-[16px] text-[#000] font-bold">
              PAYMENT ID-
                <span className=" text-[#202020]">{paymentReceipt?._id?paymentReceipt?._id:"Loading...."}</span>
              </p>
              <p className="md:text-[18px] min-[320px]:text-[16px] text-[#000] font-bold">
              PAY AMOUNT-
                <span className=" text-[#202020]">{`₹${paymentReceipt?.payamount?paymentReceipt?.payamount:"Loading...."}`}</span>
              </p>
              <p className="md:text-[18px] min-[320px]:text-[16px] text-[#000] font-bold">
              REST OF AMOUNT-
                <span className=" text-[#202020]">{`₹${paymentReceipt?.restofamount?paymentReceipt?.restofamount:"Loading...."}`}</span>
              </p>
              <p className="md:text-[18px] min-[320px]:text-[16px] text-[#000] font-bold">
              PAYMENT DATE-
                <span className=" text-[#202020]">
                  {paymentReceipt?.updatedAt?.slice(0, 10)?paymentReceipt?.updatedAt?.slice(0, 10):"Loading..."}
                </span>
              </p>
            </div>
            <div>
              <img
                src="/img/Receipt.png"
                alt="Receiptmg"
                className="md:w-[400px] md:h-96 min-[320px]:w-[350px] min-[320px]:h-80"
              />
            </div>
          </div>
          <div className="flex justify-center">
          <button onClick={handleDownload} className="md:text-2xl min-[320px]:text-xl font-bold bg-[#E9762B] text-white rounded-md mt-3 hover:scale-105 transition md:px-4 md:py-2 min-[320px]:px-3 min-[320px]:py-1" >Download</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentReceipt;
