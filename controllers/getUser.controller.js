const { UserModel } = require("../models/user.model");
const { generateError } = require("../utils/generateError");

const getUserController = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ _id: req.userID });
    if (!user) generateError(404, "No user found!");
    const { password, ...data } = user._doc;
    res.status(200).json({ success: true, msg: "user data", data });
  } catch (error) {
    console.error("error in getting user ", error);
    next(error);
  }
};

module.exports = { getUserController };
