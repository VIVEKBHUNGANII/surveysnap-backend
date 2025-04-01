const userModel = require("../models/UserModel");
const mailUtil = require("../utils/MailUtil");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/cloudineryUtil");
const jwt = require("jsonwebtoken");
const secret = "secret";
//storage engine

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//multer object....

const upload = multer({
  storage: storage,
  //fileFilter:
}).single("image");

const LoginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const foundUserFromEmail = await userModel
    .findOne({ email: email })
    .populate("roleId");

  if (foundUserFromEmail != null) {
    const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);

    if (isMatch == true) {
      res.status(200).json({
        message: "user login successfully",
        data: foundUserFromEmail,
      });
    } else {
      res.status(404).json({
        message: "invalid cred..",
      });
    }
  } else {
    res.status(404).json({
      message: "user not found",
    });
  }
};

const signUp = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    console.log(req.body);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // console.log(hashedPassword);
    req.body.password = hashedPassword;

    const createdUser = await userModel.create(req.body);
    // console.log(req.body);

    //send mail to user...
    // const mailResponse = await mailUtil.sendingMail(createdUser.email,"welcome to eadvertisement","this is welcome mail")
    await mailUtil.sendingMail(
      createdUser.email,
      "welcome to eadvertisement",
      "this is welcome mail"
    );

    res.status(201).json({
      message: "user created",
      data: createdUser,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "error",
      data: err,
    });
  }
};

const addUserWithFile = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(500).json({ message: err.message });
      }

      try {
        // Upload file to Cloudinary
        const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(
          req.file
        );
        console.log("Cloudinary Response:", cloudinaryResponse);
        console.log("Request Body:", req.body);

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashedPassword;

        // Store data in the database
        req.body.photoUrl = cloudinaryResponse.secure_url;
        const savedUser = await userModel.create(req.body);

        // Send welcome email
        await mailUtil.sendingMail(
          savedUser.email,
          "Welcome to SurveySnap",
          "This is a welcome mail"
        );

        res.status(201).json({
          message: "User created successfully",
          data: savedUser,
        });
      } catch (error) {
        console.error("Error processing user registration:", error);
        res
          .status(500)
          .json({ message: "Internal Server Error", error: error.message });
      }
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  // console.log(req.body);

  try {
    const getAllUsers = await userModel.find().populate("roleId");

    res.status(201).json({
      message: "data fetched successfully",
      data: getAllUsers,
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
      data: err,
    });
  }
};

const addUsers = async (req, res) => {
  const addedUser = await userModel.create(req.body);

  res.json({
    message: "user added successfully",
    data: addedUser,
  });
};

const deleteUser = async (req, res) => {
  const deletedUser = await userModel.findByIdAndDelete(req.params.id);

  res.json({
    message: "user added successfully",
    data: deletedUser,
  });
};

const getUserById = async (req, res) => {
  const foundUser = await userModel.findById(req.params.id);

  res.json({
    message: "user added successfully",
    data: foundUser,
  });
};

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const foundUser = await userModel.findOne({ email: email });

  if (foundUser) {
    const token = jwt.sign(foundUser.toObject(), secret);
    console.log(token);
    const url = `http://localhost:5173/resetpassword/${token}`;
    const mailContent = `<html>
                          <a href ="${url}">rest password</a>
                          </html>`;
    //email...
    await mailUtil.sendingMail(foundUser.email, "reset password", mailContent);
    res.json({
      message: "reset password link sent to mail.",
    });
  } else {
    res.json({
      message: "user not found register first..",
    });
  }
};

const resetpassword = async (req, res) => {
  const token = req.body.token; //decode --> email | id
  const newPassword = req.body.password;

  const userFromToken = jwt.verify(token, secret);
  //object -->email,id..
  //password encrypt...
  const salt = bcrypt.genSaltSync(10);
  const hashedPasseord = bcrypt.hashSync(newPassword, salt);

  const updatedUser = await userModel.findByIdAndUpdate(userFromToken._id, {
    password: hashedPasseord,
  });
  res.json({
    message: "password updated successfully..",
  });
};

module.exports = {
  getAllUsers,
  deleteUser,
  addUsers,
  getUserById,
  signUp,
  LoginUser,
  resetpassword,
  forgotPassword,
  addUserWithFile,
};

//kacharo
// const addUserWithFile = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       console.log(err);
//       res.status(500).json({
//         message: err.message,
//       });
//     } else {
//       // database data store
//       //cloundinary

//       const cloundinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(
//         req.file
//       );
//       // console.log(cloundinaryResponse);
//       // console.log(req.body);

//       // hasing password
//       const salt = bcrypt.genSaltSync(10);
//       const hashedPassword = bcrypt.hashSync(req.body.password, salt);
//       req.body.password = hashedPassword;

//       //store data in database
//       req.body.photoUrl = cloundinaryResponse.secure_url;
//       const savedUser = await userModel.create(req.body);

//       //send mail to user...
//       await mailUtil.sendingMail(
//         savedUser.email,
//         "welcome to surveysnap",
//         "this is welcome mail"
//       );

//       res.status(201).json({
//         message: "user created successfully",
//         data: savedUser,
//       });
//     }
//   });
// };
