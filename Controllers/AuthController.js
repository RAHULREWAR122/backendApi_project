import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../Schema/user.js";

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  console.log(req.body);

  if (!email || !username || !role || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }
  if (password.length < 5) {
    return res.status(400).json({ message: "password must be 6 char long" });
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return res
      .status(400)
      .json({ message: "user already exist, please login" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error registering user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const searchUser = async (req, res) => {
  const { query } = req.params;

  try {
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
