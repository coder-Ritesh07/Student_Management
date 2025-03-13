const { students } = require("../models/Student");
const { paymentreceipt } = require("../models/Payment");

let receipt = async (req, res) => {
  let userId = req.params.userid;
  try {
    let userdata = await paymentreceipt
      .findOne({ student: userId })
      .populate(
        "student",
        "Stid firstname lastname fathername studentclass studentclass section contactnumber profilepic annualamount"
      );
    res.status(200).json({ messege: "Data Fetch Successfully", userdata });
  } catch (error) {
    console.log(error);
    res.status(500).json({ messege: "Internal Server Error" });
  }
};

const sendpayment = async (req, res) => {
  let userId = req.params.userid;
  let { payamount } = req.body;
  try {
    let user = await students.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }

    let userPayment = await paymentreceipt.findOne({ student: userId });

    if (!userPayment) {
      // Create a new payment receipt if it doesn't exist
      let annualamount = user.annualamount;
      let restofamount = annualamount - payamount;

      userPayment = new paymentreceipt({
        student: userId,
        payamount,
        restofamount,
        totalpayamount: payamount, 
      });
    } else {
      // Check if the restofamount is already 0
      if (userPayment.restofamount === 0) {
        return res.status(400).json({ message: "Payment is already clear" });
      }

      // Update the restofamount and totalpayamount
      userPayment.totalpayamount += payamount;  
      userPayment.restofamount -= payamount;

      // Update the payamount to reflect the most recent payment
      userPayment.payamount = payamount; 

      // Check if the restofamount becomes negative (overpayment)
      if (userPayment.restofamount < 0) {
        userPayment.restofamount = 0;
      }
    }
    await userPayment.save();
    // Check if the restofamount is 0 after saving
    if (userPayment.restofamount === 0) {
      return res.status(201).json({ message: "Payment Successfully, Payment is clear", userPayment });
    }
    res.status(201).json({ message: "Payment Successfully", userPayment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};





// let updatepayment = async (req, res) => {
//   let userId = req.params.userid;
//   let { payamount } = req.body;

//   // Log the received payamount
//   console.log("Received payamount:", payamount);

//   // Check if payamount is a valid number
//   if (isNaN(payamount) || payamount <= 0) {
//     return res.status(400).json({ message: "Invalid payment amount" });
//   }

//   try {
//     let user = await students.findOne({ _id: userId });
//     let receipt = await paymentreceipt.findOne({ student: userId });

//     if (user && receipt) {
//       console.log("update", user, receipt);
//       if (user.annualamount !== undefined && receipt.payamount !== undefined) {
//         let annualAmount = user.annualamount;
//         let currentPayAmount = receipt.payamount;
//         let currentRestOfAmount = receipt.restofamount !== undefined ? receipt.restofamount : annualAmount - currentPayAmount;

//         // Log the calculated currentRestOfAmount
//         console.log("Current rest of amount:", currentRestOfAmount);

//         // Ensure that currentRestOfAmount and payamount are valid numbers
//         if (isNaN(currentRestOfAmount) || isNaN(payamount)) {
//           return res.status(400).json({ message: "Invalid payment or rest of amount" });
//         }

//         let newRestOfAmount = currentRestOfAmount - payamount;
//         newRestOfAmount = newRestOfAmount < 0 ? 0 : newRestOfAmount;

//         console.log(annualAmount, currentPayAmount, newRestOfAmount);

//         let updatePaymentReceipt = await paymentreceipt.findOneAndUpdate(
//           { student: userId },
//           { $set: { payamount: currentPayAmount + payamount, restofamount: newRestOfAmount } },
//           { new: true }
//         );

//         res.status(200).json({
//           message: "Payment updated successfully",
//           updatePaymentReceipt: updatePaymentReceipt,
//         });
//       } else {
//         console.log("Annual Amount or Pay Amount is undefined");
//         res.status(400).json({ message: "Annual Amount or Pay Amount is undefined" });
//       }
//     } else {
//       console.log("User not found");
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({
//       message: "An error occurred while updating the student",
//       error: error.message,
//     });
//   }
// };


module.exports = {
  receipt,
  sendpayment,
};
