import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserSchema.js';

const { sign } = jwt;

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);
    const newuser = await UserModel.create({
      name: name,
      email: email,
      password: hashpassword
    });
    res.status(200).json({
      message: "User added successfully",
      user: newuser
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        message: "User with this email already exists"
      });
    } else {
      res.status(500).json({
        message: "Server error",
        error: error.message
      });
    }
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter both email and password"
      });
    }
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password"
      });
    }
    const token = sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
    res.status(200).json({
      message: "User logged in successfully",
      token: token,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
