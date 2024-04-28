const User = require("../models/User");

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

    if (!email || !name || !password) {
      const errMessages = [];
      if (!email) errMessages.push("No email provided!");
      if (!name) errMessages.push("No name provided!");
      if (!password) errMessages.push("No password provided!");

      return res.status(400).json({ err: errMessages.join(" ") });
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
}

module.exports = new UserController();
