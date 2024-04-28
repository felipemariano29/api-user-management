const knex = require("../database/connection");
const User = require("../models/User");

class PasswordToken {
  static async create(email) {
    const user = await User.findByEmail(email);

    if (!user) {
      return { status: false, err: "User not found!" };
    }

    try {
      const token = Date.now();

      await knex
        .insert({
          userId: user.id,
          used: 0,
          token: token,
        })
        .table("passwordtokens");

      return { status: true, msg: "Token created!", token: token };
    } catch (err) {
      console.log("Error while creating token: " + err);
      return { status: false, err: "Error while creating token!" };
    }
  }

  static async validate(token) {
    try {
      const passwordtoken = await knex
        .select("*")
        .where("token", token)
        .table("passwordtokens")
        .first();

      if (!passwordtoken) {
        return { status: false, err: "Token not found!" };
      }

      if (passwordtoken.used === 1) {
        return { status: false, err: "Token already used!" };
      }

      return {
        status: true,
        msg: "Token validated!",
        token: passwordtoken,
        userId: passwordtoken.userId,
      };
    } catch (err) {
      console.log("Error while validating token: " + err);
      return { status: false, err: "Error while validating token!" };
    }
  }

  static async setUsed(token) {
    try {
      await knex
        .update({ used: 1 })
        .where("token", token)
        .table("passwordtokens");
      return { status: true, msg: "User set!" };
    } catch (err) {
      console.log("Error while setting user: " + err);
      return { status: false, err: "Error while setting user!" };
    }
  }
}

module.exports = PasswordToken;
