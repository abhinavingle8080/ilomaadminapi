const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var { User } = require("../../models");

const getProfileDetails = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: ["id","email"],
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ profile: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({
        message: "Please check your email and try again.",
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        message: "Incorrect password. Please try again.",
      });
    }

    const token = jwt.sign(
      { user_id: user.id, email: user.email },
      "iloma@portal",
      { expiresIn: "365d" }
    );

    res.status(200).json({
      message: "Login successful",
      data: { user: { id: user.id, email: user.email } },
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

module.exports = {
  login,
  getProfileDetails,
};