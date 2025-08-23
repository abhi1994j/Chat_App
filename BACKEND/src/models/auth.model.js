import mongoose from "mongoose";

const userinfo = {
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePic:{
    type:String,
    default : ""
  }
}
const authSchema = mongoose.Schema(userinfo, {
  timestamps: true
})

const authModel = mongoose.model("User", authSchema);

export { authModel };