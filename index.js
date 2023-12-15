const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { connection } = require("./utils/db");
const { userRouter } = require("./routes/users.router");
const { errorHandler } = require("./middlewares/errorHandler.middleware");
const { authenticate } = require("./middlewares/auth.middleware");
const { calculateController } = require("./controllers/calculate.controller");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/users", userRouter);
app.post("/api/calculate", authenticate, calculateController);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    await connection(process.env.DBURL);
    console.log("connected to DB");
  } catch (error) {
    console.error("error in connecting to db", error);
  }
  console.log("app is listening on port: ", PORT);
});
