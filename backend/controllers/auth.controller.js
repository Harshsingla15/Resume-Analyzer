import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../config/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(errorHandler(400, "All fields are mandatory"));
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return next(errorHandler(400, "User already exists"));
    }
    const hashedPw = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPw });
    const { password: pass, ...rest } = newUser._doc;
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(400, "All fields are mandatory"));
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(400, "User does not exist"));
    }
    const checkPw = await bcrypt.compare(password, user.password);
    if (!checkPw) {
      return next(errorHandler(400, "Credentials are invalid!"));
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    return res.status(200).json({
      success: true,
      message: "User sign in successfully",
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
