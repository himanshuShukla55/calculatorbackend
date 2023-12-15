const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");

const signUpController = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 4);
    await UserModel.create({ ...req.body, password: hash });
    res
      .status(201)
      .json({ success: true, msg: "User successfully signed up!" });
  } catch (error) {
    console.error("error in singing up user ", error);
    next(error);
  }
};

module.exports = { signUpController };
