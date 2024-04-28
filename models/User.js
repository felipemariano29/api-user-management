const knex = require("../database/connection");
const bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");

class User {
  static async findAll() {
    try {
      const users = knex.select("id", "email", "name", "role").from("users");
      return users;
    } catch (err) {
      console.log("Error while finding users: " + err);
    }
  }

  static async findById(id) {
    try {
      const user = await knex
        .select("id", "email", "name", "role")
        .from("users")
        .where("id", id)
        .first();
      return user;
    } catch (err) {
      console.log("Error while finding user: " + err);
    }
  }

  static async findByEmail(email) {
    try {
      const user = await knex
        .select("id", "email", "name", "role")
        .from("users")
        .where("email", email)
        .first();
      return user;
    } catch (err) {
      console.log("Error while finding user: " + err);
    }
  }

  static async create(email, password, name) {
    try {
      const hash = await bcrypt.hash(password, 10);
      await knex
        .insert({ email, password: hash, name, role: 0 })
        .table("users");
    } catch (err) {
      console.log("Error while creating user: " + err);
    }
  }

  static async findEmail(email) {
    try {
      const user = await knex.select("*").from("users").where("email", email);
      return user.length !== 0;
    } catch (err) {
      console.log("Error while finding user: " + err);
    }
  }

  static async update(id, name, email, role) {
    const user = await this.findById(id);

    if (!user) {
      return { status: false, err: "User not found!" };
    }

    const emailExists = await this.findEmail(email);

    if (emailExists && email !== user.email) {
      return { status: false, err: "Email already registered!" };
    }

    try {
      await knex.update({ name, email, role }).table("users").where("id", id);
      return { status: true, msg: "User updated!" };
    } catch (err) {
      console.log("Error while updating user: " + err);
    }
  }

  static async delete(id) {
    const user = await this.findById(id);

    if (!user) {
      return { status: false, err: "User not found!" };
    }

    try {
      await knex.delete().from("users").where("id", id);
      return { status: true, msg: "User deleted!" };
    } catch (err) {
      console.log("Error while deleting user: " + err);
      return { status: false, err: "Error while deleting user!" };
    }
  }

  static async changePassword(id, newPassword, token) {
    const user = await this.findById(id);

    if (!user) {
      return { status: false, err: "User not found!" };
    }

    try {
      const hash = await bcrypt.hash(newPassword, 10);
      await knex.update({ password: hash }).table("users").where("id", id);
      await PasswordToken.setUsed(token.token);
      return { status: true, msg: "Password changed!" };
    } catch (err) {
      console.log("Error while changing password: " + err);
      return { status: false, err: "Error while changing password!" };
    }
  }
}

module.exports = User;
