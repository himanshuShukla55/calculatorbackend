const { getUserController } = require("../controllers/getUser.controller");
const { loginController } = require("../controllers/login.controller");
const { signUpController } = require("../controllers/signUp.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const userRouter = require("express").Router();

userRouter.post("/signup", signUpController);
userRouter.post("/login", loginController);

userRouter.use(authenticate);

userRouter.get("/", getUserController);

module.exports = { userRouter };
