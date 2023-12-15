const { UserModel } = require("../models/user.model");
const { generateError } = require("../utils/generateError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginController = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) generateError(404, "No such user exists!");
    const result = bcrypt.compareSync(req.body.password, user.password);
    if (!result) generateError(400, "Invalid Credentials!");
    const token = jwt.sign({ userID: user._id }, process.env.TOKENSECRET);
    res
      .status(200)
      .cookie("accessToken", token)
      .json({ success: true, msg: "successfully logged in!" });
  } catch (error) {
    console.error("error in signing in ", error);
    next(error);
  }
};

module.exports = { loginController };
