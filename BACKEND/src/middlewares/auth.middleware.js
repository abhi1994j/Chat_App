import jwt from "jsonwebtoken"
import { authModel } from "../models/auth.model.js";
import { genarateErrors } from "../constants/message.js";

const protectedRoute = async (req, res, next) => {
  try {
    // console.log(req.cookies.jwt);
    const token = req.cookies.jwt;
    if (!token) { // if client don't have a token
      return res.status(401).json({
        success: false,
        message: "No token provided"
      })
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) { // check if the client token has a valid or not
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      })
    }
    const user = await authModel.findById(decode.id).select("-password");
    console.log(decode, user);
    if (!user) { // check if the user is exist or not
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }
    req.user = user;
    next()
  } catch (error) {
      console.log(error.message);
      res.status(500).json(genarateErrors("Server Error", err))
  }
}

export { protectedRoute };
