const User = require("../models/User");
const PasswordToken = require("../models/PasswordToken");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

class UserController {
  async index(req, res) {
    const users = await User.findAll();
    res.status(200).json({ users });
  }

  async find(req, res) {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ err: "User not found!" });
    }

    res.status(200).json(user);
  }

  async create(req, res) {
    const { email, name, password } = req.body;

    const missingFields = [];
    if (!email || email.trim() === "") missingFields.push("Email");
    if (!name || name.trim() === "") missingFields.push("Name");
    if (!password || password.trim() === "") missingFields.push("Password");

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({
          err: `${missingFields.join(", ")} fields are missing or empty`,
        });
    }

    const emailExists = await User.findEmail(email);

    if (emailExists) {
      return res
        .status(406)
        .json({ err: "User with this email already exists!" });
    }

    await User.create(email, password, name);
    res.status(200).json({ msg: "User created!" });
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const user = await User.update(id, name, email, role);

    if (!user.status) {
      return res.status(406).json({ err: user.err });
    }

    res.status(200).json({ msg: user.msg });
  }

  async delete(req, res) {
    const { id } = req.params;

    const user = await User.delete(id);

    if (!user.status) {
      return res.status(406).json({ err: user.err });
    }

    res.status(200).json({ msg: user.msg });
  }

  async recoverPassword(req, res) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ err: "No email provided!" });
    }

    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({ err: "User not found!" });
    }

    const token = await PasswordToken.create(email);

    if (!token.status) {
      return res.status(406).json({ err: token.err });
    }

    res.status(200).json(token);
  }

  async changePassword(req, res) {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ err: "No token or password provided!" });
    }

    const passwordToken = await PasswordToken.validate(token);
    const isValid = passwordToken.status;

    if (!isValid) {
      return res.status(406).json({ err: passwordToken.err });
    }

    await User.changePassword(
      passwordToken.userId,
      password,
      passwordToken.token
    );
    res.status(200).json({ msg: "Password changed!" });
  }

  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ err: "No email or password provided!" });
    }

    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({ err: "User not found!" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(406).json({ err: "Invalid password!" });
    }

    const token = JWT.sign({ email: user.email, role: user.role }, secret);

    res.status(200).json({ token });
  }
}

module.exports = new UserController();
