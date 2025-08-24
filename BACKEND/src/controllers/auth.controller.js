import cloudinary from "../config/cloudinary.js";
import { genarateErrors } from "../constants/message.js";
import { authModel } from "../models/auth.model.js";
import { comparePassword, genarateHashpassword } from "../utils/bcrypt.js";
import { genarateToken } from "../utils/token.js";
import { userValidatorsSchema } from "../validators/auth.validators.js";

const signupUser = async (req, res) => {
  try {
    const { error } = userValidatorsSchema.validate(req.body); // check validation errors
    console.log(error);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      })
    }
    // console.log(req.body);
    const { fullname, email, password, profilePic } = req.body;  // client send the data to the server

    const user = await authModel.findOne({ email }); // check if user already exist or not

    if (user) {
      return res.status(404).json({
        success: false,
        message: "User already registered"
      })
    }

    const hashPassword = await genarateHashpassword(password); // create hashpassword

    const newUser = {
      fullname: fullname,
      email: email,
      password: hashPassword,
      profilePic: profilePic
    }
    // console.log(newUser);

    const savedUser = await authModel.create(newUser);  // add new user in mongoDB
    // console.log(savedUser);
    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      id: savedUser._id,
      fullname: savedUser.fullname,
      email: savedUser.email,
      profilePic: savedUser.profilePic,
      token: genarateToken(savedUser._id, res)
    })

  } catch (err) {
    res.status(500).json(genarateErrors("Server Errors", err));
  }
}

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authModel.findOne({ email }); // find  user in the DB
  // console.log(user);
  try {
    if (!user) {   // Check if user is already exist or not
      return res.status(400).json({
        success: false,
        message: "User is not Registered , kindly register"
      })
    }
    const isComparePassword = await comparePassword(password, user.password); // compare the password
    // console.log(isComparePassword);
    if (!isComparePassword) {
      res.status(400).json({
        success: false,
        message: "Invalid Credentials"
      });
    }
    res.status(200).json({
      success: true,
      message: "Login Successfully",
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilePic: user.profilePic,
      token: genarateToken(user._id, res)
    })
  }
  catch (err) {
    res.status(500).json(genarateErrors("Server Error", err));
  }
}

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      success: true,
      message: "Logout Successfully"
    })
  } catch (error) {
    res.status(500).json(genarateErrors("Server Error", err))
  }
}

const updateProfile = async (req, res) => {
  try {
    // console.log("client data----------------------", req.body);
    const { profilePic } = req?.body;
    if (!profilePic) {
      return res.status(400).json({
        success: false,
        message: "Profile Image is required"
      })
    }
    const id = req.user._id;
    const uploadFile = await cloudinary.uploader.upload(profilePic); // upload image in cloudinary
    // console.log("uploaded file -------------------------", uploadFile);
    const updateUser = await authModel.findByIdAndUpdate(id, { profilePic: uploadFile.secure_url }, { new: true });
    res.status(200).json({
      success: true,
      message: "profile image uploaded successfully",
      result: updateUser
    })
  } catch (error) {
    console.error("updateProfile error:", error); // full object
    res.status(500).json(genarateErrors("Server Error", error));
  }
}

// const updateProfile = async (req, res) => {
//   try {
//     console.log("client data", req.body);
//     const { profilePic } = req.body;

//     if (!profilePic) {
//       return res.status(400).json({
//         success: false,
//         message: "Profile Image is required",
//       });
//     }

//     const id = req.user._id;

//     // upload base64 directly
//     const uploadFile = await cloudinaryConfig.uploader.upload(profilePic);

//     console.log("uploaded file", uploadFile);

//     const updateUser = await authModel.findByIdAndUpdate(
//       id,
//       { profilePic: uploadFile.secure_url },
//       { new: true }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Profile image uploaded successfully",
//       result: updateUser,
//     });
//   } catch (error) {
//     console.error("UpdateProfile error:", error);
//     return res
//       .status(500)
//       .json({ success: false, message: error.message || "Server Error" });
//   }
// };


const checkAuth = (req, res) => {
  try {
    if (!req.user) res.status(404).json({
      message: "User not Found"
    });
    res.status(200).json(req.user)
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export { signupUser, loginUser, logoutUser, updateProfile, checkAuth };
