import express from "express";
import User from "../Models/user";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if ((!username, !email, !password)) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    const user = await User.create({ username, email, password });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if ((!email, !password)) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

export default router;
