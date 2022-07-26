const userSchema = require("../models/userModel");
const bcrypt = require("bcrypt");
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const checkUsername = await userSchema.findOne({ username });
    if (checkUsername) {
      return res.json({ msg: "Username Already Exist", status: false });
    }
    const checkEmail = await userSchema.findOne({ email });
    if (checkEmail) {
      return res.json({ msg: "Email Already Exist", status: false });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const insertUser = await userSchema.create({
      email,
      username,
      password: hashPass,
    });
    delete userSchema.password;
    return res.json({ status: true, insertUser });
  } catch (error) {
    console.error(error);
  }
};
