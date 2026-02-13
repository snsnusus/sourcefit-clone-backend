import mongoose from "mongoose";
import UserModel from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return json.status(400).json({
        code: "error",
        message: "Invalid credentials",
      });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return json.status(400).json({
        code: "error",
        message: "Invalid credentials",
      });
    }
    const token = generateToken(user._id);
    res.status(200).json({
      code: "success",
      message: "Login Success",
      user: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      },
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      code: "error",
      message: "Login Failed",
    });
  }
};

export const getAll = async (req, res, next) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const create = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        code: "error",
        message: "User already exist",
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({
      code: "success",
      message: "User saved",
    });
  } catch (err) {
    res.status(500).json({
      code: "error",
      message: "Something went wrong. User not saved",
    });
  }
};

export const get = async (req, res, next) => {
  const id = req.params.id;

  try {
    const valid = mongoose.Types.ObjectId.isValid(id);

    if (!valid) {
      return res.status(400).json({
        error: "Invalid user ID",
      });
    }

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User cannot be found",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message, err });
  }
};
