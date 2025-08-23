import { genarateErrors } from "../constants/message.js";
import Message from "../models/message.model.js"
import cloudinaryConfig from "../config/cloudinary.js";

const getUsersForSiderbars = async (req, res) => {
  try {
    const loggedinUserid = req.user._id;
    const users = await Message.find({ _id: { $ne: { loggedinUserid } } });
    res.status(200).json({
      success: true,
      message: "all users get successfully",
      result: users
    })

  } catch (error) {
    res.status(500).json(genarateErrors("Server Error", err));
  }

}

const getMessages = async (req, res) => {
  try {
    const { id: receriverId } = req.params;
    const senderId = req.user._id;
    const allMessages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receriverId },
        { senderId: receriverId, receiverId: senderId }
      ]
    })
    res.status(200).json({
      success: true,
      result: allMessages
    })
  } catch (error) {
    res.status(500).json(genarateErrors("Server Error", err));
  }
}

const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageFile;
    if (image) {
      const uploadFile = await cloudinaryConfig.uploader.upload(image);
      imageFile: uploadFile
    }
    const newMessages = new Message({
      senderId,
      receiverId,
      text,
      imageFile
    });
    await newMessages.save();
    res.status(201).json({
      success: true,
      result: newMessages
    });
  } catch (error) {
    res.status(500).json(genarateErrors("Server Error", err));
  }
}

export { getUsersForSiderbars, getMessages, sendMessages }