const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const authToken = req.headers["authorization"];

  if (!authToken) {
    return res.status(401).json({ err: "No authorization token provided!" });
  }

  const bearer = authToken.split(" ");
  const token = bearer[1];

  if (!token) {
    return res.status(401).json({ err: "No authorization token provided!" });
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (decoded.role !== 1) {
      return res.status(401).json({ err: "Not an admin!" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ err: "Invalid authorization token!" });
  }
};
