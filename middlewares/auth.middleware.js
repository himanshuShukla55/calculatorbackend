const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const { cookies } = req;
  if (!cookies || !cookies.accessToken)
    return res.status(401).json({ success: false, msg: "Unauthorized" });

  jwt.verify(cookies.accessToken, process.env.TOKENSECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ success: false, msg: "Unauthorized!" });
    req.userID = decoded.userID;
    next();
  });
};

module.exports = { authenticate };
