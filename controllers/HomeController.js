const JWT = require("jsonwebtoken");

class HomeController {
  async index(req, res) {
    res.send("APP EXPRESS! - Guia do programador");
  }

  async validate(req, res) {
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
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      res.status(200).json({ msg: "Token is valid" });
    } catch (err) {
      return res.status(401).json({ err: "Invalid authorization token!" });
    }
  }
}

module.exports = new HomeController();
