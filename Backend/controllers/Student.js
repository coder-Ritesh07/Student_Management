const { students } = require("../models/Student");
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const { generateTokens } = require("../middleware/Auth");

const cookieOption = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
};

const sendStudent = async (req, res) => {
  try {
    console.log(req.file)
    if (!req.file) {
        return res.status(400).json({ message: "File upload failed. Please upload an image." });
      }
    console.log(req.body);
    let {
      firstname,
      lastname,
      fathername,
      mothername,
      studentclass,
      section,
      address,
      gmail,
      contactnumber,
      alternativecontactnumber,
      addharnumberofstudent,
      addharnumberofparents,
      gender,
      cast,
      DOB,
      username,
      password,
      annualamount,
    } = req.body;
    //   console.log(Stid,firstname,lastname,fathername,mothername,studentclass,section,rollnumber,address,gmail,contactnumber,alternativecontactnumber,addharnumberofstudent,addharnumberofparents,gender,cast,DOB,username,password,annualamount)
    let roll = ["a"];
    if (
      typeof firstname === "string" &&
      typeof lastname === "string" &&
      typeof section === "string" &&
      typeof studentclass === "string"
    ) {
      // console.log(firstname.toLowerCase().charAt(0))
      roll.push(firstname.toLowerCase().charAt(0));
      roll.push(lastname.toLowerCase().charAt(0));
      roll.push(section.toLowerCase().charAt(0));
      roll.push(studentclass.toLowerCase().charAt(0));
      roll.push(studentclass.toLowerCase().charAt(1));
    }

    let countStudent = await students.countDocuments();
    let formattedCount;
    if (countStudent < 9) {
      formattedCount = `0${countStudent + 1}`; // Add leading zero for single digit
    } else if (countStudent >= 9 && countStudent < 99) {
      formattedCount = `${countStudent + 1}`; // Two-digit roll number
    }

    roll.push(formattedCount.charAt(0)); // Add the first digit of formatted roll
    roll.push(formattedCount.charAt(1));

    const currentYear = new Date().getFullYear(); // e.g., 2025
    const admissionYear = currentYear.toString().slice(-2); // "25"
    roll.push(admissionYear); // Add "25" to roll array

    let unquieId = roll.join("");
    console.log(unquieId);

      let userExist=await students.findOne({$and:[{firstname},{lastname}]})
      if(userExist)
      {
        return res.status(404).json({messege:"Student Already Exits"})
      }
      let securePassword=await bcrypt.hash(password,10)
      console.log(securePassword)

      let profilepic = req.file ? req.file.filename : "";

     let newStudent=new students({Stid:unquieId,firstname,lastname,fathername,mothername,studentclass,section,rollnumber:formattedCount,address,gmail,contactnumber,alternativecontactnumber,addharnumberofstudent,addharnumberofparents,gender,cast,DOB,profilepic,username,password:securePassword,annualamount})
     await newStudent.save();
     res.status(201).json({messege:"Student Registered Successfully",newStudent:newStudent})
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
        // Log the error details
        console.error("Validation Error Details:", error.errors);

        // Extract and send a meaningful message to the client
        const errorMessages = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ messege: "Validation failed", errors: errorMessages });
      }

      // Log and handle general errors
      console.error("An unexpected error occurred:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
  }
};
const userLogin = async (req, res) => {
  try {
    let { username, password } = req.body;
    // console.log(setUserName,password)
    let user = await students.findOne({ username });
    // console.log(user)
    if (user && (await bcrypt.compare(password, user.password))) {
      let payload = {
        id: user._id,
        username: user.username,
      };
      let tokens = generateTokens(payload);
      res.cookie("token", tokens, cookieOption);
      res
        .status(200)
        .json({ messege: "User Login Successfully", tokens, payload });
    } else {
      res.status(404).json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ messege: "Internal server Error" });
  }
};

const userLogout = async (req, res) => {
  res
    .clearCookie("token", cookieOption)
    .status(200)
    .json({ messege: "User Logout Successfully" });
};

const getAllStudents = async (req, res) => {
  let userId = req.params.userid;
  try {
    let getStudents = await students.find({ _id: userId });
    if (getStudents) {
      return res
        .status(200)
        .json({ messege: "Students Data Found Successfully", getStudents });
    }
    res.status(404).json({ messege: "Student Not Found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    let userId = req.params.userid;
    let finduser = await students.find({ Stid: userId });
    if (!finduser) {
      return res.status(404).json({ messege: "Student Not Found " });
    }
    console.log("user found");
    let deleteStudent = await students.findOneAndDelete({ Stid: userId });
    res.status(200).json({ messege: "Student Delete Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error" });
  }
};

module.exports = {
  sendStudent,
  userLogin,
  userLogout,
  getAllStudents,
  deleteStudent,
};
